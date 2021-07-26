const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const db = require('../utils/db');
const jwt = require('../utils/jwt');
const multer = require('multer');
require('dotenv').config();

const conn = db.connection;
const upload = multer();

/********** 解 token(得到登入者的資訊) **********/
router.get('/me', (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    const token = headers.authorization.replace('Bearer ', '');
    const decoded = jwt.getToken(token);

    console.log('token 內容: ', decoded);

    try {
        res.status(200).json(decoded);
    } catch (error) {
        res.status(500).json(error);
    }
});

/********** 登入 **********/
router.post('/signin', async (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);
    console.log('signin headers', req.headers);
    let sql = null;
    let resData = null;
    const { account, password } = req.body;

    try {
        // 執行 SQL，查詢該會員的所有資料及 account
        sql =
            'SELECT *, account_table.account FROM member ' +
            'JOIN (SELECT email, SUBSTRING(email, 1, INSTR(email, "@")- 1) AS account FROM member) AS account_table ' +
            'ON member.email = account_table.email ' +
            'WHERE member.email=? OR account = ?';
        const dbMember = await conn.queryAsync(sql, [account, account]);

        // 查無該會員的 email 或 account
        if (dbMember.length == 0) {
            resData = { status: '成功', result: '失敗', msg: '無此帳號' };
        }
        // 有則比對密碼
        else {
            const dbPassword = dbMember[0].password;
            const passwordComRes = await bcrypt.compareAsync(
                password,
                dbPassword
            );

            // 密碼比對失敗
            if (!passwordComRes) {
                resData = {
                    status: '成功',
                    result: '失敗',
                    msg: '密碼錯誤',
                };
            }
            // 密碼比對成功，建立 token 並送回前端
            else {
                const memberId = dbMember[0].member_id;
                const token = jwt.setToken({ memberId }); //設定 token

                resData = {
                    status: '成功',
                    result: '成功',
                    msg: '登入成功',
                    data: { memberId: memberId },
                    token: token,
                };
            }
        }

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }
});

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
            resData = {
                status: '成功',
                result: '失敗',
                msg: '此 email 已有人註冊',
            };
        } else {
            const hash = await bcrypt.hashAsync(password, 10);
            const name = email.split('@')[0];
            const signupData = [name, email, hash, mobile, address];

            // 執行 SQL，新增至資料庫
            sql =
                'INSERT INTO member(name, email, password, mobile, address) VALUES(?)';
            const dbResult = await conn.queryAsync(sql, [signupData]);

            if (!dbResult) {
                resData = {
                    status: '成功',
                    result: '失敗',
                    msg: '註冊失敗',
                };
            } else {
                // 執行 SQL，查詢剛註冊的會員 id
                sql =
                    'SELECT * FROM member ORDER BY member_id DESC LIMIT 0 , 1';
                const dbNewMember = await conn.queryAsync(sql, [signupData]);
                const memberId = dbNewMember[0].member_id;
                const token = jwt.setToken({ memberId }); //設定 token

                resData = {
                    status: '成功',
                    result: '成功',
                    msg: '註冊成功',
                    token: token,
                };
            }
        }

        console.log(resData);
        res.status(200).json(resData);
    } catch (error) {
        resData = { status: '失敗', msg: '內部錯誤，請聯絡伺服器管理員' };
        console.log('錯誤訊息: ', error);

        res.status(500).json(resData);
    }
});

/********** 登出 **********/
// sign out

module.exports = router;
