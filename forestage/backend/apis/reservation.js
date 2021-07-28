const express = require('express');
const router = express.Router();
const db = require('../utils/db')


require('dotenv').config();
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox4b719c10339c4ce2a86053aafec64a26.mailgun.org";

const mg = mailgun({apiKey:process.env.MG_KEY, domain: DOMAIN});


router.get('/seat', async (req, res)=>{
    let getSeatSql = 'SELECT seat_id, name, minimum_order, seat_number AS totalSeats FROM seat'
    let seat = await db.connection.queryAsync(getSeatSql)
    res.send(seat)
})

router.get('/singer-calendar', async(req, res)=>{
    let getCalendarSql = 'SELECT sc.date, s.name, s.picture FROM singer_calendar AS sc, singer AS s WHERE DATEDIFF(sc.date, CURDATE())>=0 AND s.singer_id=sc.singer_id ORDER BY sc.date LIMIT 10'
    let Calendar = await db.connection.queryAsync(getCalendarSql)
    res.json(Calendar)
})

router.get('/dish', async(req, res)=> {
    let getDishSql = 'SELECT dish_id, name, type, price, image_realistic, image_illustration FROM dish'
    let dish = await db.connection.queryAsync(getDishSql)
    res.json(dish)
})

router.get('/checkout/coupon', async(req, res)=>{
    let getMemberCouponSql = 'SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0'
    let memberCoupon = await db.connection.queryAsync(getMemberCouponSql,[req.query.memberId])
    console.log(req.query.memberId)
    res.send(memberCoupon)
})

// 尚未決定如何取得memberid?
router.get('/checkout/memberInfo', async(req, res)=>{
    let getMemberInfoSql = 'SELECT name, mobile FROM member WHERE member_id=?'
    let memberInfo = await db.connection.queryAsync(getMemberInfoSql, [1])
    res.send(memberInfo)
})

router.post('/checkout/send', async(req, res)=>{
    let insertResData = req.body.insertResData
    insertResData = Object.values(insertResData)
    let insertReservationSql = 'INSERT INTO reservation (date, seat_id, attendance, name, mobile, total, note, member_id, mcm_id, status,create_time) VALUES (?,NOW())'
    let reservation = await db.connection.queryAsync(insertReservationSql,[insertResData])

    // 處理餐點陣列
    let dishList = req.body.dishList
    // 找出數量>0的餐點
    dishList = dishList.filter((v)=>{
        return v[1]>0
    })

    // 組成新陣列[數量, id]
    dishList = dishList.map((v,i)=>{
        return [v[1],v[5]]
    })

    // 建立insert陣列 [reservation_id,dish_id]
    let newDishList = []
    dishList.forEach((v)=>{
        for(let i =0; i<v[0]; i++){
            newDishList.push([reservation.insertId,v[1]])
        }
    })
    console.log(newDishList)
    
    let insertDishSql = `INSERT INTO reservation_dish_mapping (reservation_id, dish_id) VALUES ?`
    let insertDish = await db.connection.queryAsync(insertDishSql,[newDishList])
    console.log(insertDish)

    // 更新mcm表格中，哪一筆訂單使用此折價券
    let updateMCMSql = `UPDATE member_coupon_mapping SET reservation_id = ${reservation.insertId}, valid = 0 WHERE mcm_id = ?`
    let updateMCM = await db.connection.queryAsync(updateMCMSql, [req.body.insertResData.mcm_id])
    console.log(updateMCM)
        // mailgun確認信
        const data = {
            from: "Mailgun Sandbox <postmaster@sandbox4b719c10339c4ce2a86053aafec64a26.mailgun.org>",
            to: "huiyu.lee580@gmail.com",
            subject: "謝謝您的訂位",
            text: "Testing some Mailgun awesomness!"
        };
        mg.messages().send(data, function (error, body) {
        console.log(body);
    });

})

router.get('/:date', async(req, res)=>{
    let getRemainingSeatsSql = 'SELECT s.name, s.seat_number-SUM(r.attendance) AS remainingSeats, s.seat_id FROM reservation r, seat s WHERE date=? AND s.seat_id = r.seat_id GROUP BY seat_id'

    let remainingSeats = await db.connection.queryAsync(getRemainingSeatsSql,[req.params.date])
    
    res.json(remainingSeats)
    console.log(req.params.date)
})


module.exports = router;
