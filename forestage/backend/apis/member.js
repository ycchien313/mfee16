const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const db = require('../utils/db');
const path = require('path');
const multer = require('multer');

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

/********** 檔案上傳路徑 **********/
// 設定上傳檔案的完整儲存目錄(含目錄路徑、檔案名稱)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../', 'public', 'members'));
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

/********** multer 中間件；處理上傳檔案 **********/
const upload = multer({
    // 指定存取位置
    storage: storage,
    // 副檔名篩選
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
            return cb(new Error('不合格的附檔名'));
        }
        cb(null, true);
    },
    // 設定檔案大小上限，1MB
    limit: {
        fileSize: 1024 * 1024,
    },
});

/********** 查詢已使用(歷史)折價券 **********/
router.get('/coupon/history/:memberId', async (req, res, next) => {
    console.log('URL :', req.url);
    console.log('METHOD: ', req.method);

    const memberId = req.params.memberId;

    try {
        // 執行 SQL，查詢該會員近期的外送訂單
        const sql =
            'SELECT c.name, DATE_FORMAT(c.deadline, "%Y.%m.%d") AS deadline, c.minimum_order_value, c.discount,c.coupon_id, c.font_awesome ' +
            'FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id ' +
            'WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())<0';
        const dbCoupon = await conn.queryAsync(sql, [memberId]);
        const resData = { status: '成功', data: dbCoupon };

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        const resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };

        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }
});

/********** 查詢可使用(近期)折價券 **********/
router.get('/coupon/recent/:memberId', async (req, res, next) => {
    console.log('URL :', req.url);
    console.log('METHOD: ', req.method);

    const memberId = req.params.memberId;

    try {
        // 執行 SQL，查詢該會員近期的外送訂單
        const sql =
            'SELECT c.name, DATE_FORMAT(c.deadline, "%Y.%m.%d") AS deadline, c.minimum_order_value, c.discount,c.coupon_id, c.font_awesome ' +
            'FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id ' +
            'WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0';
        const dbCoupon = await conn.queryAsync(sql, [memberId]);
        const resData = { status: '成功', data: dbCoupon };

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        const resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };

        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }
});

/********** 查詢詳細歷史訂單 **********/
router.get(
    '/delivery/history/detail/:memberId/:deliveryId',
    async (req, res) => {
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);

        let dbDeliveryDetail = null;
        const memberId = req.params.memberId;
        const deliveryId = req.params.deliveryId;
        console.log(memberId);
        console.log(deliveryId);

        // 執行 SQL，查詢會員的「詳細」訂位資料
        const sql =
            'SELECT `member_id`, DLV.`delivery_id`, `status`, DATE_FORMAT(DLV.delivery_time, "%Y/%m/%d %H:%i:%s") AS delivery_time, DLV.name, `mobile`, address, `note`, dish.dish_id, dish.name AS dish_name, COUNT(DDM.dish_id) AS dish_count, SUM(dish.price) AS dish_price, `total` ' +
            'FROM `delivery` AS DLV, delivery_dish_mapping AS DDM, dish ' +
            'WHERE member_id = ? AND DLV.delivery_id = ? AND DLV.delivery_id = DDM.delivery_id AND DDM.dish_id = dish.dish_id GROUP BY DDM.dish_id';
        await conn
            .queryAsync(sql, [memberId, deliveryId])
            .then((result) => {
                dbDeliveryDetail = result;
                resData = { status: '成功', data: dbDeliveryDetail };
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

/********** 查詢歷史外送訂單 **********/
router.get('/delivery/history/:memberId', async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    let dbDelivery = null;
    let resData = null;
    const memberId = req.params.memberId;

    // 執行 SQL，查詢歷史(今天以前)外送訂單資料
    const sql =
        'SELECT `member_id`, `delivery_id`, `delivery_time`, `status` ' +
        'FROM `delivery` ' +
        'WHERE member_id = ? AND (delivery_time < CURDATE() OR status = "已取消") ' +
        'ORDER BY delivery_time';
    await conn
        .queryAsync(sql, memberId)
        .then((result) => {
            dbDelivery = result;
            resData = { status: '成功', data: dbDelivery };
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

/********** 更新(取消)訂單資料 **********/
router.put('/delivery/cancel/:memberId/:deliveryId', async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    let resData = null;
    const { memberId, deliveryId } = req.params;

    try {
        // 執行 SQL，更新(取消)訂位資料
        const sql =
            'UPDATE `delivery` SET `status`= ? WHERE member_id = ? AND delivery_id = ?';
        await conn.queryAsync(sql, ['已取消', memberId, deliveryId]);

        resData = { status: '成功', msg: '取消訂位成功' };

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };

        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }
});

/********** 查詢近期外送訂單 **********/
router.get('/delivery/recent/:memberId', async (req, res, next) => {
    console.log('URL :', req.url);
    console.log('METHOD: ', req.method);

    const memberId = req.params.memberId;

    try {
        // 執行 SQL，查詢該會員近期的外送訂單
        const sql =
            'SELECT `member_id`, delivery.`delivery_id`, `delivery_time`, dish_name, COUNT(dish_id) AS dish_count, `total`, delivery.`name`, `address`, `mobile`, `note` ' +
            'FROM `delivery` ' +
            'JOIN (SELECT `delivery_id`, dish.name AS dish_name, delivery_dish_mapping.`dish_id`' +
            'FROM `delivery_dish_mapping` ' +
            'JOIN dish ' +
            'ON delivery_dish_mapping.dish_id = dish.dish_id) AS dishToDDM ' +
            'ON delivery.delivery_id = dishToDDM.delivery_id ' +
            'WHERE member_id = ? AND delivery_time < CURDATE() AND status <> "已取消" ' +
            'GROUP BY dish_id, delivery_id ' +
            'ORDER BY delivery_time';
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
            'SELECT `member_id`, RES.`reservation_id`, `status`, DATE_FORMAT(RES.date, "%Y/%m/%d") AS date, singer.name AS singer_name, seat.name AS seat_name, `attendance`, RES.name, `mobile`, `note`, dish.dish_id, dish.name AS dish_name, COUNT(RDM.dish_id) AS dish_count, SUM(dish.price) AS dish_price, `total` ' +
            'FROM `reservation` AS RES, singer_calendar, singer, seat, reservation_dish_mapping AS RDM, dish ' +
            'WHERE member_id = ? AND RES.reservation_id = ? AND RES.reservation_id = RDM.reservation_id AND RES.date = singer_calendar.date AND singer_calendar.singer_id = singer.singer_id AND RES.seat_id = seat.seat_id AND RDM.dish_id = dish.dish_id GROUP BY RDM.dish_id';
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
        'SELECT `member_id`, `reservation_id`, `date`, `status` ' +
        'FROM `reservation` ' +
        'WHERE member_id = ? AND (date < CURDATE() OR status = "已取消") ' +
        'ORDER BY date';
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
            'SELECT `member_id`, RES.`reservation_id`, `status`, DATE_FORMAT(RES.date, "%Y/%m/%d") AS date, singer.name AS singer_name, seat.name AS seat_name, `attendance`, RES.name, `mobile`, `note`, dish.dish_id, dish.name AS dish_name, COUNT(RDM.dish_id) AS dish_count, SUM(dish.price) AS dish_price, `total` ' +
            'FROM `reservation` AS RES, singer_calendar, singer, seat, reservation_dish_mapping AS RDM, dish ' +
            'WHERE member_id = ? AND RES.reservation_id = ? AND RES.reservation_id = RDM.reservation_id AND RES.date = singer_calendar.date AND singer_calendar.singer_id = singer.singer_id AND RES.seat_id = seat.seat_id AND RDM.dish_id = dish.dish_id AND RES.date >= CURDATE() GROUP BY RDM.dish_id';
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
    let dbReservationDish = null;
    let sql = null;
    const memberId = req.params.memberId;

    try {
        // 執行 SQL，查詢近期(今天以後)會員的所有訂位資料
        sql =
            'SELECT res.member_id, reservation_id, DATE_FORMAT(RES.date, "%Y/%m/%d") AS date, singer.name AS singer_name, seat.name AS seat_name, attendance, total ' +
            'FROM reservation AS RES, seat, singer_calendar, singer ' +
            'WHERE res.member_id = ? AND RES.seat_id = seat.seat_id AND RES.date = singer_calendar.date AND singer_calendar.singer_id = singer.singer_id AND (RES.date >= CURDATE() OR status <> "已取消") ORDER BY date';
        dbReservation = await conn.queryAsync(sql, memberId);

        // 執行 SQL，查詢近期(今天以後)會員訂位的餐點數量資料
        sql =
            'SELECT RES.reservation_id, COUNT(dish_id) AS dish_count ' +
            'FROM reservation AS RES, `reservation_dish_mapping` AS RDM ' +
            'WHERE RDM.reservation_id = RES.reservation_id AND RES.member_id = ? AND RES.date >= CURDATE() AND status <> "已取消" GROUP BY RES.reservation_id';
        dbReservationDish = await conn.queryAsync(sql, memberId);

        // 將得到數量跟要傳 dbReservation 合併
        for (let i = 0; i < dbReservation.length; i++) {
            for (let j = i; j < dbReservation.length; j++) {
                if (
                    dbReservation[i].reservation_id ===
                    dbReservationDish[i].reservation_id
                ) {
                    dbReservation[i] = {
                        ...dbReservation[i],
                        dish_count: dbReservationDish[i].dish_count,
                    };
                    j = dbReservation.length;
                }
            }
        }

        resData = { status: '成功', data: dbReservation };
        res.statusCode = 200;
    } catch (err) {
        res.statusCode = 500;
        resData = { status: '失敗', msg: error };
    }

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
    const reqData = req.body.data;
    const newPassword = reqData.newPassword;

    // 對新密碼進行加密
    const hash = await bcrypt.hashAsync(newPassword, 10);

    // 執行SQL，更新密碼
    const sql = 'UPDATE `member` SET `password`=? WHERE member_id = ?';

    try {
        const dbResult = await conn.queryAsync(sql, [hash, memberId]);

        if (dbResult) {
            resData = { status: '成功', data: '更新成功' };
        } else {
            resData = { status: '成功', data: '更新失敗' };
        }

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);
        res.status(500).json(resData);
    }

    // 新密碼與確認密碼不同
    // if (newPassword !== confirmPassword) {
    //     resData = "{status: '失敗', msg: '新密碼與確認密碼不一致' }";
    //     console.log(resData);
    //     res.status(400).send(resData);
    // } else {
    //     // 執行 SQL，查詢該會員密碼
    //     sql = 'SELECT * FROM member WHERE member_id = ?';
    //     const dbMember = await conn.queryAsync(sql, [memberId]);
    //     const dbMemberPassword = dbMember[0].password;

    //     // 對密碼進行加密比對
    //     await bcrypt.compareAsync(
    //         password,
    //         dbMemberPassword,
    //         async (err, result) => {
    //             // 輸入密碼與資料庫密碼一樣
    //             if (result) {
    //                 // 對新密碼進行加密
    //                 const hash = await bcrypt.hashAsync(newPassword, 10);

    //                 // 執行SQL，更新密碼
    //                 sql =
    //                     'UPDATE `member` SET `password`=? WHERE member_id = ?';
    //                 await conn
    //                     .queryAsync(sql, [hash, memberId])
    //                     .then(() => {
    //                         resData = {
    //                             status: '成功',
    //                             msg: '更新成功',
    //                         };
    //                         res.status(200).send(resData);
    //                     })
    //                     .catch((error) => {
    //                         resData = { status: 'fail', msg: error };
    //                         res.status(500).send(resData);
    //                     });
    //             }
    //             // 輸入密碼與資料庫密碼不一樣
    //             else {
    //                 resData = "{status: '失敗', msg: '密碼輸入錯誤' }";
    //                 res.status(400).send();
    //             }
    //             console.log(resData);
    //         }
    //     );
    // }
});

/********** 比對密碼 **********/
router.post('/password/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    let resData = null;
    const memberId = req.params.memberId;
    const reqData = req.body.data;
    const oldPassword = reqData.oldPassword;

    const sql = 'SELECT password FROM member WHERE member_id = ?';

    try {
        // 執行 SQL，查詢 email、密碼
        const dbMember = await conn.queryAsync(sql, [memberId]);
        const dbPassword = dbMember[0].password;
        await bcrypt.compareAsync(oldPassword, dbPassword, (err, result) => {
            if (result) {
                resData = { status: '成功', data: '密碼相符' };
                res.status(200).json(resData);
            } else {
                resData = { status: '成功', data: '密碼不符' };
                res.status(200).json(resData);
            }

            console.log(resData);
        });
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }
});

/********** 查詢 email 資料 **********/
router.get('/email/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    let resData = null;
    const memberId = req.params.memberId;

    const sql = 'SELECT email FROM `member` WHERE member_id = ?';

    try {
        // 執行 SQL，查詢 email
        const dbEmail = await conn.queryAsync(sql, [memberId]);
        resData = { status: '成功', data: dbEmail };
        console.log(dbEmail);

        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }
});

/********** 更新會員資料 **********/
router.put('/profile/:memberId', upload.single('avatar'), async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    // 在此 req 查找驗證錯誤
    // const validationErrors = validationResult(req);

    let resData = null;
    let avatar = null;
    let sql = null;
    let queryValue = null;
    const memberId = req.params.memberId;
    const reqData = req.body;
    const { name, birthday, mobile, address, gender } = reqData;

    req.file !== undefined
        ? (avatar = `/members/${req.file.filename}`)
        : (avatar = null);

    console.log(avatar);

    // 帶有大頭貼檔案
    if (avatar !== null) {
        sql =
            'UPDATE `member` SET `name`=?,`birthday`=?,`mobile`=?,`address`=?,`gender`=?,`avatar`= ? WHERE member_id = ?';
        queryValue = [
            name,
            birthday,
            mobile,
            address,
            gender,
            avatar,
            memberId,
        ];
    } else {
        // 無大頭貼
        sql =
            'UPDATE `member` SET `name`=?,`birthday`=?,`mobile`=?,`address`=?,`gender`=? WHERE member_id = ?';
        queryValue = [name, birthday, mobile, address, gender, memberId];
    }

    try {
        // 執行 SQL，更新個資
        const dbMember = await conn.queryAsync(sql, queryValue);

        resData = { status: '成功', data: dbMember };

        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }

    console.log(resData);
});

/********** 查詢會員資料 **********/
router.get('/profile/:memberId', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    let resData = null;
    const memberId = req.params.memberId;

    const sql =
        'SELECT `member_id`, `name`, DATE_FORMAT(birthday, "%Y.%m.%d") AS birthday, `email`, `mobile`, `address`, `gender`, `vote_valid`, `like_valid`, `avatar`, `valid` FROM `member` WHERE member_id = ?';

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
