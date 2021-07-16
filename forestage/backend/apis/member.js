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

/********** 更新密碼 **********/
router.put('/password/:id', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    const memberId = req.params.id;
    const reqData = {
        password: '456',
        newPassword: '123',
        confirmPassword: '123',
    };
    const { password, newPassword, confirmPassword } = reqData;

    // 新密碼與確認密碼不同
    if (newPassword !== confirmPassword) {
        resData = "{status: 'fail', msg: '新密碼與確認密碼不一致' }";
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
                                status: 'success',
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
                    resData = "{status: 'fail', msg: '密碼輸入錯誤' }";
                    res.status(400).send();
                }
                console.log(resData);
            }
        );
    }
});

/********** 更新會員資料 **********/
router.put('/profile/:id', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    // 在此 req 查找驗證錯誤
    // const validationErrors = validationResult(req);

    let resData = null;
    let sql = null;
    const memberId = req.params.id;
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
            resData = { status: 'success', msg: '更新成功' };
            res.status(200).send(resData);
        })
        .catch((error) => {
            resData = { status: 'fail', msg: error };
            res.status(500).send(resData);
        });

    console.log(resData);
});

/**********  查詢會員資料 **********/
router.get('/profile/:id', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    const memberId = req.params.id;
    const sql =
        'SELECT `member_id`, `name`, DATE_FORMAT(birthday, "%Y.%m.%d") AS birthday, `email`, `password`, `mobile`, `address`, `gender`, `vote_valid`, `like_valid`, `avatar`, `valid` FROM `member` WHERE member_id = ?';
    const dbMember = await conn
        .queryAsync(sql, memberId)
        .then(() => {
            resData = { status: 'success', msg: '更新成功' };
            res.status(200).send(resData);
        })
        .catch((error) => {
            resData = { status: 'fail', msg: error };
            res.status(500).send(resData);
        });
    const resData = dbMember[0];

    res.status(200).json(resData);
    console.log(resData);
});

/********** 查詢會員資料(未帶有 member_id 參數狀況) **********/
router.get('/profile', (req, res) => {
    console.log('目前位置:', req.url);

    const resJson = { error: '未輸入會員代號' };

    res.status(200).json(resJson);
    console.log(resData);
});

module.exports = router;
