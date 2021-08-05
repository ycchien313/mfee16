const express = require('express');
const router = express.Router();
const db = require('../utils/db');

require('dotenv').config();
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxd434801e3d8446a8946d9b7075271e58.mailgun.org';
const mg = mailgun({ apiKey: process.env.MG_KEY, domain: DOMAIN });

router.get('/seat', async (req, res) => {
    let getSeatSql =
        'SELECT seat_id, name, minimum_order, seat_number AS totalSeats FROM seat';
    let seat = await db.connection.queryAsync(getSeatSql);
    res.send(seat);
});

router.get('/singer-calendar', async (req, res) => {
    let getCalendarSql =
        'SELECT sc.date, s.name, s.picture FROM singer_calendar AS sc, singer AS s WHERE DATEDIFF(sc.date, CURDATE())>=0 AND s.singer_id=sc.singer_id ORDER BY sc.date LIMIT 10';
    let Calendar = await db.connection.queryAsync(getCalendarSql);
    res.json(Calendar);
});

router.get('/dish', async (req, res) => {
    let getDishSql =
        'SELECT dish_id, name, type, price, image_realistic, image_illustration FROM dish';
    let dish = await db.connection.queryAsync(getDishSql);
    res.json(dish);
});

router.get('/checkout/coupon', async (req, res) => {
    let getMemberCouponSql =
        'SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0';
    let memberCoupon = await db.connection.queryAsync(getMemberCouponSql, [
        req.query.memberId,
    ]);
    // console.log(req.query.memberId)
    res.send(memberCoupon);
});

// 尚未決定如何取得memberid?
router.get('/checkout/memberInfo', async (req, res) => {
    let getMemberInfoSql = 'SELECT name, mobile FROM member WHERE member_id=?';
    let memberInfo = await db.connection.queryAsync(getMemberInfoSql, [
        req.query.memberId,
    ]);
    // console.log('req.query.memberId:', req.query.memberId)
    // console.log("memberInfo:",memberInfo)
    res.send(memberInfo);
});

router.post('/checkout/send', async(req, res)=>{
    let insertResData = req.body.insertResData
    console.log("insertResData:",insertResData)
    let resDate = insertResData.date
    console.log("resDate:",resDate)

    let resTotal = insertResData.total
    console.log("resTotal:",resTotal)

    let resAttendance = insertResData.attendance
    console.log("resAttendance:",resAttendance)

    insertResData = Object.values(insertResData)
    let insertReservationSql = 'INSERT INTO reservation (date, seat_id, attendance, name, mobile, total, note, member_id, mcm_id, status,create_time) VALUES (?,NOW())'
    let reservation = await db.connection.queryAsync(insertReservationSql,[insertResData])

    // 處理餐點陣列
    let dishList = req.body.dishList;
    // 找出數量>0的餐點
    dishList = dishList.filter((v) => {
        return v[1] > 0;
    });

    // 組成新陣列[數量, id]
    dishList = dishList.map((v, i) => {
        return [v[1], v[5]];
    });

    // 建立insert陣列 [reservation_id,dish_id]
    let newDishList = [];
    dishList.forEach((v) => {
        for (let i = 0; i < v[0]; i++) {
            newDishList.push([reservation.insertId, v[1]]);
        }
    });
    // console.log(newDishList)

    let insertDishSql = `INSERT INTO reservation_dish_mapping (reservation_id, dish_id) VALUES ?`;
    let insertDish = await db.connection.queryAsync(insertDishSql, [
        newDishList,
    ]);
    // console.log(insertDish)

    // 更新mcm表格中，哪一筆訂單使用此折價券
    let updateMCMSql = `UPDATE member_coupon_mapping SET reservation_id = ${reservation.insertId}, valid = 0 WHERE mcm_id = ?`;
    let updateMCM = await db.connection.queryAsync(updateMCMSql, [
        req.body.insertResData.mcm_id,
    ]);
    // console.log(updateMCM)


    let getMemberInfo = `SELECT email, mobile FROM member WHERE member_id = ?`
    console.log(req.body.insertResData.member_id)
    let memberInfo = await db.connection.queryAsync(getMemberInfo,[req.body.insertResData.member_id])
    console.log(memberInfo[0].name)
    let memberEmail = memberInfo[0].email
    
    // console.log(memberInfo,"memberinfo")

    // mailgun確認信
    const mailBody = {
        from: 'Elfin Restaurant <restaurant.elfin@gmail.com>',
        to: `${memberEmail}`,
        subject: '謝謝您的訂位',
        html: `
        <!DOCTYPE html>
            <html  style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
            <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <style type="text/css">
            body {
            margin: 0;
            padding: 0;
            }
            img {
            border: 0 !important;
            outline: none !important;
            }
            p {
            Margin: 0px !important;
            Padding: 0px !important;
            }
            table {
            border-collapse: collapse;
            mso-table-lspace: 0px;
            mso-table-rspace: 0px;
            }
            td, a, span {
            border-collapse: collapse;
            mso-line-height-rule: exactly;
            }
            </style>

            </head>
            <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center"  bgcolor="#efefef">
                <tr>
                <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                    <tr>
                        <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top"><a href="#" target="_blank" style="text-decoration:none; font-size:24px; color:#a1957d; font-weight:700;">Elfin 音樂餐廳</td>
                        </tr>
                        <tr>
                            <td height="28" style="height:28px;" class="em_h20">&nbsp;</td>
                        </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
                <tr>
                <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                    <tr>
                        <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td height="25" style="height:25px;" class="em_h10">&nbsp;</td>
                        </tr>
                                    <tr>
                            <td height="22" style="height:22px;" class="em_h20">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#5e7c60; font-weight:bold;">您預訂了${resDate} 的音樂表演</td>
                        </tr>
                        <tr>
                            <td height="15" style="height:15px; font-size:0px; line-height:0px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color:#434343;">線上訂位成功，預約人數：一共 ${resAttendance} 人，總金額為${resTotal}，誠摯歡迎您的光臨</td>
                        </tr>
                        <tr>
                            <td height="15" style="height:15px; font-size:1px; line-height:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color:#434343;"><span>桃園市中壢區中央路100號</span> <span class="em_hide2">&nbsp;|&nbsp;</span><span class="em_mob_block"></span>Email:restaurant.elfin@gmail.com</td>
                        </tr>
                        <tr>
                            <td height="20" style="height:20px; font-size:1px; line-height:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top"><table width="145" style="width:145px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#6bafb2">
                            <tr>
                                <td class="em_white" height="42" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 16px; color:#ffffff; font-weight:bold; height:42px;"><a href="https://www.mailgun.com" target="_blank" style="text-decoration:none; color:#ffffff; line-height:42px; display:block;">查看訂單</a></td>
                            </tr>
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="40" style="height:40px;" class="em_h10">&nbsp;</td>
                        </tr>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
                <tr>
                <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                    <tr>
                        <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td height="40" style="height:40px;" class="em_h20">&nbsp;</td>
                        </tr>
                    <tr>
                        <td class="em_hide" style="line-height:1px;min-width:650px;background-color:#efefef;"><img alt="" src="/assets/pilot/images/templates/spacer.gif" height="1" width="650" style="max-height:1px; min-height:1px; display:block; width:650px; min-width:650px;" border="0" /></td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
        `,
    };

    mg.messages().send(mailBody, function (error, body) {

	console.log(body);

    });

});

router.get('/:date', async (req, res) => {
    let getRemainingSeatsSql =
        'SELECT s.name, s.seat_number-SUM(r.attendance) AS remainingSeats, s.seat_id FROM reservation r, seat s WHERE date=? AND s.seat_id = r.seat_id GROUP BY seat_id';

    let remainingSeats = await db.connection.queryAsync(getRemainingSeatsSql, [
        req.params.date,
    ]);

    res.json(remainingSeats);
    // console.log(req.params.date)
});

module.exports = router;
