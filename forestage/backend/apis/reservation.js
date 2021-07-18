const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/seat', async (req, res)=>{
    let getSeatSql = 'SELECT seat_id, name, minimum_order, seat_number AS totalSeats FROM seat'
    let Seat = await db.connection.queryAsync(getSeatSql)
    res.json(Seat)
})

router.get('/singer-calendar', async(req, res)=>{
    let getCalendarSql = 'SELECT sc.date, s.name, s.picture FROM singer_calendar AS sc, singer AS s WHERE DATEDIFF(sc.date, CURDATE())>=0 AND s.singer_id=sc.singer_id ORDER BY sc.date LIMIT 10'
    let Calendar = await db.connection.queryAsync(getCalendarSql)
    res.json(Calendar)
})

router.get('/dish', async(req, res)=> {
    let getDishSql = 'SELECT dish_id, name, type, price FROM dish'
    let dish = await db.connection.queryAsync(getDishSql)
    res.json(dish)
})

router.get('/checkout/coupon', async(req, res)=>{
    let getMemberCouponSql = 'SELECT c.name, c.deadline, c.minimum_order_value, c.discount, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = 1 AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1'
    let memberCoupon = await db.connection.queryAsync(getMemberCouponSql)
    res.send(memberCoupon)
})

// 尚未決定如何取得memberid?
router.get('/checkout/memberInfo', async(req, res)=>{
    let getMemberInfoSql = 'SELECT name, mobile FROM member WHERE member_id=?'
    let memberInfo = await db.connection.queryAsync(getMemberInfoSql, [1])
    res.send(memberInfo)
})

router.get('/checkout/send', async(req, res)=>{

    let insertReservationSql = 'INSERT INTO reservation (date, seat_id, attendance, name, mobile, total, note, member_id, mcm_id, status) VALUES ("2021-07-31",1,2,"王曉華","0912344455",2000,"我是測試用的備註",1,1,"未完成"); SET last_id_reservation = LAST_INSERT_ID(); INSERT INTO reservation_dish_mapping (reservation_id, dish_id) VALUES (last_id_reservation, 8),(last_id_reservation, 7);'
    let reservation = await db.connection.queryAsync(insertReservationSql)
    console.log(reservation)
})

router.get('/:date', async(req, res)=>{
    let getRemainingSeatsSql = 'SELECT s.name, s.seat_number-SUM(r.attendance) AS remainingSeats, s.seat_id FROM reservation r, seat s WHERE date=? AND s.seat_id = r.seat_id GROUP BY seat_id'

    let remainingSeats = await db.connection.queryAsync(getRemainingSeatsSql,[req.params.date])
    
    res.send(remainingSeats)
    // console.log(req.params.date)
})


module.exports = router;
