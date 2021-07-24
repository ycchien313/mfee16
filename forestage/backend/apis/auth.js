const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const db = require('../utils/db');
const multer = require('multer');

const conn = db.connection;
const upload = multer();

/********** 註冊 **********/
router.post('/signup', upload.none(), async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    console.log(req.body);

    let sql = null;
    let resData = null;
    const { email, password, mobile, address } = req.body;

    try {
        // 執行 SQL，檢查 email 是否重複註冊
        sql = 'SELECT * FROM member WHERE email = ?';
        const dbMember = await conn.queryAsync(sql, email);

        if (dbMember.length > 0) {
            resData = { status: '失敗', msg: '此 email 已有人註冊' };
        } else {
            const hash = await bcrypt.hashAsync(password, 10);
            const name = email.split('@')[0];
            const signupData = [name, email, hash, mobile, address];

            // 執行 SQL，新增至資料庫
            sql =
                'INSERT INTO member(name, email, password, mobile, address) VALUES(?)';
            const dbResult = await conn.queryAsync(sql, [signupData]);

            dbResult
                ? (resData = { status: '成功', msg: '註冊成功' })
                : (resData = { status: '成功', msg: '註冊失敗' });
        }

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }
});

module.exports = router;
