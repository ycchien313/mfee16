const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const db = require('../utils/db');

const conn = db.connection;

// 更新個資規則
// const updateProfileRules = [
//     body('name').notEmpty().withMessage('姓名格式錯誤'),
//     body('email').isEmail().withMessage('Email 格式錯誤'),
//     body('password').isLength({ min: 3 }).withMessage('密碼格式錯誤'),
//     body('confirmPassword')
//         .custom((value, { req }) => {
//             return value === req.body.password;
//         })
//         .withMessage('密碼不同，請重新輸入'),
// ];

/********** 查詢近期外送訂單 **********/
router.get('/delivery/recent/:memberId', async (req, res, next) => {
    console.log('URL :', req.url);
    console.log('METHOD: ', req.method);

    const memberId = req.params.memberId;

    try {
        // 執行 SQL，查詢該會員近期的外送訂單
        const sql =
            'SELECT `member_id`, delivery.`delivery_id`, `delivey_time`, dish_name, COUNT(dish_id) AS dish_count, `total`, delivery.`name`, `address`, `mobile`, `note` ' +
            'FROM `delivery` ' +
            'JOIN (SELECT `delivery_id`, dish.name AS dish_name, delivery_dish_mapping.`dish_id`' +
            'FROM `delivery_dish_mapping` ' +
            'JOIN dish ' +
            'ON delivery_dish_mapping.dish_id = dish.dish_id) AS dishToDDM ' +
            'ON delivery.delivery_id = dishToDDM.delivery_id ' +
            'WHERE member_id = ? AND delivey_time > NOW() ' +
            'GROUP BY dish_id';
        const dbDelivery = await conn.queryAsync(sql, [memberId]);
        const resData = { status: '成功', data: dbDelivery };

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        const resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };

        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }
});

/********** 更新(取消)訂位資料 **********/
router.put('/reservation/cancel/:memberId/:reservationId', async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    let resData = null;
    const { memberId, reservationId } = req.params;

    try {
        // 執行 SQL，更新(取消)訂位資料
        const sql =
            'UPDATE `reservation` SET `status`= ? WHERE member_id = ? AND reservation_id = ?';
        const dbResult = await conn.queryAsync(sql, [
            '已取消',
            memberId,
            reservationId,
        ]);
        resData = { status: '成功', msg: '取消訂位成功' };

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };

        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }
});

/********** 查詢取消訂位需要資料 **********/
router.get('/reservation/cancel/:memberId/:reservationId', async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    let resData = null;
    let dbReservationCancel;
    const { memberId, reservationId } = req.params;

    try {
        // 執行 SQL，查詢取消訂位需要資料
        const sql =
            'SELECT `member_id`, `reservation_id`, `date`, seat.name AS seat_name, attendance ' +
            'FROM `reservation` AS RES, seat ' +
            'WHERE member_id = ? AND reservation_id = ? AND RES.seat_id = seat.seat_id';
        const dbReservationCancel = await conn.queryAsync(sql, [
            memberId,
            reservationId,
        ]);

        resData = { status: '成功', data: dbReservationCancel };
        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }
});

/********** 查詢詳細歷史訂位資料 **********/
router.get(
    '/reservation/history/detail/:memberId/:reservationId',
    async (req, res) => {
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);

        let dbReservationDetail = null;
        const memberId = req.params.memberId;
        const reservationId = req.params.reservationId;

        // 執行 SQL，查詢會員的「詳細」訂位資料
        const sql =
            'SELECT `member_id`, RES.`reservation_id`, `status`, RES.`date`, singer.name AS singer_name, seat.name AS seat_name, `attendance`, RES.name, `mobile`, `note`, dish.dish_id, dish.name AS dish_name, COUNT(RDM.dish_id) AS dish_count, SUM(dish.price) AS dish_price, `total` ' +
            'FROM `reservation` AS RES, singer_calendar, singer, seat, reservation_dish_mapping AS RDM, dish ' +
            'WHERE member_id = ? AND RES.reservation_id = ? AND RES.reservation_id = RDM.reservation_id AND RES.date = singer_calendar.date AND singer_calendar.singer_id = singer.singer_id AND RES.seat_id = seat.seat_id AND RDM.dish_id = dish.dish_id AND RES.date < NOW() GROUP BY RDM.dish_id';
        await conn
            .queryAsync(sql, [memberId, reservationId])
            .then((result) => {
                dbReservationDetail = result;
                resData = { status: '成功', data: dbReservationDetail };
                res.statusCode = 200;
            })
            .catch((error) => {
                resData = { status: '失敗', msg: error };
                res.statusCode = 500;
            });

        console.log(resData);
        res.status(res.statusCode).json(resData);
    }
);

/********** 查詢歷史訂位資料 **********/
router.get('/reservation/history/:memberId?', async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    let dbReservation = null;
    let resData = null;
    const memberId = req.params.memberId;

    // 執行 SQL，查詢歷史(今天以前)訂位資料
    const sql =
        'SELECT `member_id`, `reservation_id`, `date`, `status` FROM `reservation` WHERE member_id = ? AND date < NOW() ORDER BY date';
    await conn
        .queryAsync(sql, memberId)
        .then((result) => {
            dbReservation = result;
            resData = { status: '成功', data: dbReservation };
            res.statusCode = 200;
        })
        .catch((error) => {
            resData = { status: '失敗', msg: '請確認輸入格式' };
            console.log('錯誤訊息: ', error);
            res.statusCode = 500;
        });

    console.log(resData);
    res.status(res.statusCode).json(resData);
});

/********** 查詢詳細近期訂位資料 **********/
router.get(
    '/reservation/recent/detail/:memberId/:reservationId',
    async (req, res) => {
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);

        let dbReservationDetail = null;
        const memberId = req.params.memberId;
        const reservationId = req.params.reservationId;

        // 執行 SQL，查詢會員的「詳細」訂位資料
        const sql =
            'SELECT `member_id`, RES.`reservation_id`, `status`, RES.`date`, singer.name AS singer_name, seat.name AS seat_name, `attendance`, RES.name, `mobile`, `note`, dish.dish_id, dish.name AS dish_name, COUNT(RDM.dish_id) AS dish_count, SUM(dish.price) AS dish_price, `total` ' +
            'FROM `reservation` AS RES, singer_calendar, singer, seat, reservation_dish_mapping AS RDM, dish ' +
            'WHERE member_id = ? AND RES.reservation_id = ? AND RES.reservation_id = RDM.reservation_id AND RES.date = singer_calendar.date AND singer_calendar.singer_id = singer.singer_id AND RES.seat_id = seat.seat_id AND RDM.dish_id = dish.dish_id AND RES.date > NOW() GROUP BY RDM.dish_id';
        await conn
            .queryAsync(sql, [memberId, reservationId])
            .then((result) => {
                dbReservationDetail = result;
                resData = { status: 'success', data: dbReservationDetail };
                res.statusCode = 200;
            })
            .catch((error) => {
                resData = { status: 'fail', msg: error };
                res.statusCode = 500;
            });

        console.log(resData);
        res.status(res.statusCode).json(resData);
    }
);

/********** 查詢詳細近期訂位資料(未帶有 member_id、reservation_id 參數狀況) **********/
router.get('/reservation/recent/detail', (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    resData = { status: '失敗', msg: '未輸入會員及訂位代號' };

    console.log(resData);
    res.status(400).json(resData);
});

/********** 查詢近期訂位資料 **********/
router.get('/reservation/recent/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    let resData = null;
    let dbReservation = null;
    const memberId = req.params.memberId;

    // 執行 SQL，查詢近期(今天以後)會員的所有訂位資料
    const sql =
        'SELECT res.member_id, reservation_id, DATE_FORMAT(RES.date, "%Y/%m/%d") AS date, singer.name AS singer_name, seat.name AS seat_name, attendance, total ' +
        'FROM reservation AS RES, seat, singer_calendar, singer ' +
        'WHERE res.member_id = ? AND RES.seat_id = seat.seat_id AND RES.date = singer_calendar.date AND singer_calendar.singer_id = singer.singer_id AND RES.date > NOW()';
    await conn
        .queryAsync(sql, memberId)
        .then((result) => {
            dbReservation = result;
            resData = { status: '成功', data: dbReservation };
            res.statusCode = 200;
        })
        .catch((error) => {
            res.statusCode = 500;
            resData = { status: '失敗', msg: error };
        });

    console.log(resData);
    res.status(res.statusCode).json(resData);
});

/********** 查詢近期訂位資料(未帶有 member_id 參數狀況) **********/
router.get('/reservation/recent', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    const resData = { status: '失敗', msg: '未輸入訂位代號' };

    console.log(resData);
    res.status(400).json(resData);
});

/********** 更新密碼 **********/
router.put('/password/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    const memberId = req.params.memberId;
    const reqData = {
        password: '456',
        newPassword: '123',
        confirmPassword: '123',
    };
    const { password, newPassword, confirmPassword } = reqData;

    // 新密碼與確認密碼不同
    if (newPassword !== confirmPassword) {
        resData = "{status: '失敗', msg: '新密碼與確認密碼不一致' }";
        console.log(resData);
        res.status(400).send(resData);
    } else {
        // 執行 SQL，查詢該會員密碼
        sql = 'SELECT * FROM member WHERE member_id = ?';
        const dbMember = await conn.queryAsync(sql, [memberId]);
        const dbMemberPassword = dbMember[0].password;

        // 對密碼進行加密比對
        await bcrypt.compareAsync(
            password,
            dbMemberPassword,
            async (err, result) => {
                // 輸入密碼與資料庫密碼一樣
                if (result) {
                    // 對新密碼進行加密
                    const hash = await bcrypt.hashAsync(newPassword, 10);

                    // 執行SQL，更新密碼
                    sql =
                        'UPDATE `member` SET `password`=? WHERE member_id = ?';
                    await conn
                        .queryAsync(sql, [hash, memberId])
                        .then(() => {
                            resData = {
                                status: '成功',
                                msg: '更新成功',
                            };
                            res.status(200).send(resData);
                        })
                        .catch((error) => {
                            resData = { status: 'fail', msg: error };
                            res.status(500).send(resData);
                        });
                }
                // 輸入密碼與資料庫密碼不一樣
                else {
                    resData = "{status: '失敗', msg: '密碼輸入錯誤' }";
                    res.status(400).send();
                }
                console.log(resData);
            }
        );
    }
});

/********** 更新會員資料 **********/
router.put('/profile/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    // 在此 req 查找驗證錯誤
    // const validationErrors = validationResult(req);

    let resData = null;
    let sql = null;
    const memberId = req.params.memberId;
    const reqData = {
        name: '鄒安琪',
        birthday: '2000.06.12',
        mobile: '0937605949',
        address: '桃園市楊梅區楊新路92號',
        gender: '女',
        avatar: null,
    };
    const { name, birthday, mobile, address, gender, avatar } = reqData;

    // 執行 SQL，更新個資
    sql =
        'UPDATE `member` SET `name`=?,`birthday`=?,`mobile`=?,`address`=?,`gender`=?,`avatar`= ? WHERE member_id = ?';
    await conn
        .queryAsync(sql, [
            name,
            birthday,
            mobile,
            address,
            gender,
            avatar,
            memberId,
        ])
        .then(() => {
            resData = { status: '成功', msg: '更新成功' };
            res.status(200).send(resData);
        })
        .catch((error) => {
            resData = { status: '失敗', msg: error };
            res.status(500).send(resData);
        });

    console.log(resData);
});

/**********  查詢會員資料 **********/
router.get('/profile/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    let resData = null;
    const memberId = req.params.memberId;

    const sql =
        'SELECT `member_id`, `name`, DATE_FORMAT(birthday, "%Y.%m.%d") AS birthday, `email`, `password`, `mobile`, `address`, `gender`, `vote_valid`, `like_valid`, `avatar`, `valid` FROM `member` WHERE member_id = ?';

    try {
        // 執行 SQL，查詢會員資料
        const dbMember = await conn.queryAsync(sql, [memberId]);
        resData = { status: '成功', data: dbMember };
        console.log(dbMember);

        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }
});

module.exports = router;
