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
    // 請求資料庫資料()
    // let queryresult = await db.connection.queryAsync("select * from dish")
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '附餐'")
    res.send(queryresult)
} )

router.get("/dish/dessert",async function(req,res,next){
    // 請求資料庫資料()
    // let queryresult = await db.connection.queryAsync("select * from dish")
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '甜點'")
    res.send(queryresult)
} )


module.exports = router;
