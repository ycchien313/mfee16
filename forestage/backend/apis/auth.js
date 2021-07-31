const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const db = require('../utils/db');
const path = require('path');
const multer = require('multer');
const jwt = require('../utils/jwt');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
require('dotenv').config();

const conn = db.connection;
const upload = multer();

/********** FB Token 驗證 **********/
passport.use(
    new FacebookTokenStrategy(
        {
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        },
        async function (accessToken, refreshToken, profile, cb) {
            // TODO: 建立或是找到使用者
            // 1. 用 email 去資料庫確認有無此使用者
            // 2.1 有這個使用者 → 登入
            // 2.2 無，到資料庫建立使用者 → 註冊

            let sql = null;
            let dbMember = null;
            let resData = null;
            console.log(profile);
            const name = profile.displayName;
            const email = profile.emails[0].value;
            const avatar = profile.photos[0].value;

            try {
                // 執行 SQL，檢查有無該使用者
                sql = 'SELECT * FROM member WHERE email = ?';
                dbMember = await conn.queryAsync(sql, [email]);

                // 查無該會員的 email → 註冊
                if (dbMember.length == 0) {
                    // 執行 SQL，新增會員至資料庫
                    sql =
                        'INSERT INTO member(name, email, password, avatar) VALUES(?, ?, ?, ?)';
                    const dbResult = await conn.queryAsync(sql, [
                        name,
                        email,
                        email,
                        avatar,
                    ]);

                    // 註冊失敗 → 回傳失敗訊息
                    if (!dbResult) {
                        resData = {
                            status: '成功',
                            result: '失敗',
                            msg: '註冊失敗',
                        };
                        return cb(null, resData); //cb(error, data)
                    }
                }

                // 執行 SQL，撈出會員資料，確保剛註冊者也能拿到資料
                sql = 'SELECT * FROM member WHERE email = ?';
                dbMember = await conn.queryAsync(sql, [email]);

                resData = {
                    status: '成功',
                    result: '成功',
                    msg: '登入成功',
                    data: dbMember,
                };

                return cb(null, resData); //cb(error, data)
            } catch (error) {
                resData = {
                    status: '失敗',
                    msg: '內部錯誤，請聯絡伺服器管理員',
                };

                console.log('錯誤訊息: ', error);

                return cb(null, resData);
            }
        }
    )
);

/********** FB 登入 **********/
router.post(
    '/facebook',
    passport.authenticate('facebook-token', { session: false }),
    (req, res, next) => {
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);

        // 登入失敗
        if (req.user.status === '失敗') {
            return res.status(500).json(req.user);
        } else if (!req.user) {
            resData = {
                status: '成功',
                result: '失敗',
                msg: '登入失敗',
            };

            console.log(resData);
            return res.status(401).json(resData);
        } else if (req.user.result === '失敗') {
            return res.status(200).json(req.user);
        }

        //登入成功
        const memberId = req.user.data[0].member_id;
        const email = req.user.data[0].email;
        const password = req.user.data[0].password;
        //建立 token
        const token = jwt.setToken({ memberId });

        resData = {
            status: '成功',
            result: '成功',
            msg: '登入成功',
            memberId: memberId,
            email: email,
            password: password,
            token: token,
        };

        res.status(200).json(resData);
    }
);

/********** Google Token 驗證 **********/
passport.use(
    new GoogleTokenStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        },
        async function (accessToken, refreshToken, profile, cb) {
            // TODO: 建立或是找到使用者
            // 1. 用 email 去資料庫確認有無此使用者
            // 2.1 有這個使用者 → 登入
            // 2.2 無，到資料庫建立使用者 → 註冊

            let sql = null;
            let dbMember = null;
            let resData = null;
            console.log(profile);
            const name = profile.displayName;
            const email = profile.emails[0].value;
            const avatar = profile._json.picture;

            console.log(name);
            console.log(email);
            console.log(avatar);

            try {
                // 執行 SQL，檢查有無該使用者
                sql = 'SELECT * FROM member WHERE email = ?';
                dbMember = await conn.queryAsync(sql, [email]);

                // 查無該會員的 email → 註冊
                if (dbMember.length == 0) {
                    // 執行 SQL，新增會員至資料庫
                    sql =
                        'INSERT INTO member(name, email, password, avatar) VALUES(?, ?, ?, ?)';
                    const dbResult = await conn.queryAsync(sql, [
                        name,
                        email,
                        email,
                        avatar,
                    ]);

                    // 註冊失敗 → 回傳失敗訊息
                    if (!dbResult) {
                        resData = {
                            status: '成功',
                            result: '失敗',
                            msg: '註冊失敗',
                        };
                        return cb(null, resData); //cb(error, data)
                    }
                }

                // 執行 SQL，撈出會員資料，確保剛註冊者也能拿到資料
                sql = 'SELECT * FROM member WHERE email = ?';
                dbMember = await conn.queryAsync(sql, [email]);

                resData = {
                    status: '成功',
                    result: '成功',
                    msg: '登入成功',
                    data: dbMember,
                };

                return cb(null, resData); //cb(error, data)
            } catch (error) {
                resData = {
                    status: '失敗',
                    msg: '內部錯誤，請聯絡伺服器管理員',
                };

                console.log('錯誤訊息: ', error);

                return cb(null, resData);
            }
        }
    )
);

/********** Google 登入 **********/
router.post(
    '/google',
    passport.authenticate('google-token', { session: false }),
    (req, res, next) => {
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);

        // 登入失敗
        if (req.user.status === '失敗') {
            return res.status(500).json(req.user);
        } else if (!req.user) {
            resData = {
                status: '成功',
                result: '失敗',
                msg: '登入失敗',
            };

            console.log(resData);
            return res.status(401).json(resData);
        } else if (req.user.result === '失敗') {
            return res.status(200).json(req.user);
        }

        //登入成功
        const memberId = req.user.data[0].member_id;
        const email = req.user.data[0].email;
        const password = req.user.data[0].password;
        //建立 token
        const token = jwt.setToken({ memberId });

        resData = {
            status: '成功',
            result: '成功',
            msg: '登入成功',
            memberId: memberId,
            email: email,
            password: password,
            token: token,
        };

        res.status(200).json(resData);
    }
);

/********** 得到登入者的資訊(解 token) **********/
router.get('/me', (req, res) => {
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    const token = req.headers.authorization.replace('Bearer ', '');
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

router.get('/coupon', async(req, res)=>{
    let getMemberCouponSql = 'SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0'
    let memberCoupon = await db.connection.queryAsync(getMemberCouponSql,[req.query.memberId])
    console.log(req.query.memberId)
    res.send(memberCoupon)
})

router.get('/coupon/used', async(req, res)=>{
    let getMemberCouponSql = 'SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=0 OR DATEDIFF(c.deadline, CURDATE())<0'
    let memberCoupon = await db.connection.queryAsync(getMemberCouponSql,[req.query.memberId])
    console.log(req.query.memberId)
    res.send(memberCoupon)
})

/********** 登出 **********/
// sign out

module.exports = router;
