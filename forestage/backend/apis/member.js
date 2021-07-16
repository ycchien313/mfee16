const express = require('express');
const router = express.Router();
const db = require('../utils/db');

const conn = db.connection;

// 修改會員資料
router.put('/profile/:id', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    let resData = null;
    const memberId = req.params.id;

    // const reqData = {
    //     password: 123,
    //     newPassword: 456,
    //     confirmPassword: 456,
    // };
    const reqData = {
        name: '鄒安琪',
        birthday: '2010.06.12',
        mobile: '0937605949',
        address: '桃園市楊梅區楊新路92號',
        gender: '女',
        avatar: null,
    };

    // 取得 client 端傳來資料的 key 長度
    reqDataKeyLen = Object.keys(reqData).length;

    // key 長度 > 3 → 編輯個資
    if (reqDataKeyLen > 3) {
        const sql =
            'UPDATE `member` SET `name`=?,`birthday`=?,`mobile`=?,`address`=?,`gender`=?,`avatar`= ? WHERE member_id = ?';

        // 執行 SQL，更新個資
        await conn
            .queryAsync(sql, [
                reqData.name,
                reqData.birthday,
                reqData.mobile,
                reqData.address,
                reqData.gender,
                reqData.avatar,
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
    }
    // key 長度 <= 3 → 重設密碼
    else {
        // 新密碼與確認密碼不同
        if (reqData.newPassword !== reqData.confirmPassword) {
            resData = "{status: 'fail', msg: '新密碼與確認密碼不一致' }";
            res.status(400).send(resData);
        } else {
            let sql =
                'SELECT * FROM member WHERE member_id = ? AND password = ?';

            // 執行 SQL，查詢個資
            const profile = await conn
                .queryAsync(sql, [memberId, reqData.password])
                .then(() => {
                    resData = { status: 'success', msg: '更新成功' };
                    res.status(200).send(resData);
                })
                .catch((error) => {
                    resData = { status: 'fail', msg: error };
                    res.status(500).send(resData);
                });

            // 會員資料長度 = 0 → 密碼錯誤，找不到該會員資料
            if (profile.length === 0) {
                resData = "{status: 'fail', msg: '密碼錯誤，請重新輸入' }";
                res.status(400).send(resData);
            }
            // 會員資料長度 > 0 → 密碼正確，更新密碼
            else {
                sql = 'UPDATE `member` SET `password`=? WHERE member_id = ?';

                // 執行 SQL，更新密碼
                conn.queryAsync(sql, [reqData.newPassword, memberId])
                    .then(() => {
                        resData = { status: 'success', msg: '更新成功' };
                        res.status(200).send(resData);
                    })
                    .catch((error) => {
                        resData = { status: 'fail', msg: error };
                        res.status(500).send(resData);
                    });

                resData = "{status: 'success', msg: '更新成功'}";
                res.status(200).send(resData);
            }
        }
    }

    console.log(resData);

    // TODO:前端利用 axios 傳 JSON 資料過來，判斷是不是有 password key
    // 有 → 代表是重設密碼，先比對資料，再 update
    // 無 → 直接 update
});

// 查詢會員資料
router.get('/profile/:id', async (req, res) => {
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);

    const memberId = req.params.id;
    const sql =
        'SELECT `member_id`, `name`, DATE_FORMAT(birthday, "%Y.%m.%d") AS birthday, `email`, `password`, `mobile`, `address`, `gender`, `vote_valid`, `like_valid`, `avatar`, `valid` FROM `member` WHERE member_id = ?';
    const profile = await conn.queryAsync(sql, memberId);
    const resData = profile[0];

    res.status(200).json(resData);
});

// 查詢會員資料(未帶有 member_id 參數)
router.get('/profile', (req, res) => {
    console.log('目前位置:', req.url);

    const resJson = { error: '未輸入會員代號' };

    res.status(200).json(resJson);
});

module.exports = router;
