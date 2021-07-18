const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../utils/db");

// 取得的網址名稱("自行命名",callback函式)
router.get("/dish",async function(req,res,next){
    // 請求資料庫資料()
    let queryresult = await db.connection.queryAsync("select * from dish")
    res.send(queryresult)
} )


module.exports = router;
