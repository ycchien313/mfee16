const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../utils/db");

// 取得的網址名稱("自行命名",callback函式)
router.get("/dish/main",async function(req,res,next){
    // 請求資料庫資料()
    // let queryresult = await db.connection.queryAsync("select * from dish")
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '主餐'")
    res.send(queryresult)
} )

router.get("/dish/side",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '附餐'")
    res.send(queryresult)
} )

router.get("/dish/dessert",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '甜點'")
    res.send(queryresult)
} )

router.get("/dish/",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish`")
    res.send(queryresult)
} )

router.get("/coupon/",async function(req,res,next){
    // 先設定 = 1
    let queryresult = await db.connection.queryAsync('SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = 1 AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0')
    res.send(queryresult)
} )

router.get("/member/",async function(req,res,next){
    // 先設定 = 1
    let queryresult = await db.connection.queryAsync("SELECT m.member_id ,m.name,m.mobile FROM member m WHERE m.member_id = 1")
    res.send(queryresult)
} )

module.exports = router;
