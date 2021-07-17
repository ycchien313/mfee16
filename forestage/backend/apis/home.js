const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const moment = require("moment");
let current = moment().format("YYYY-MM-DD");

// 取得本日表演者資訊
router.get("/singer_today", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT * from singer inner join singer_calendar where singer_calendar.date LIKE '${current}%'`
    );
    // let queryResult = current + "T16:00:00.000Z";
    res.send(queryResult[0]);
});

// 取得網址資料
router.get("/comment/:id", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT m.name as name, a.author as nickname, t.name as singer, a.title as title, a.content as content, m.avatar as img FROM article as a INNER JOIN tag as t ON a.tag_id = t.tag_id INNER JOIN member as m ON a.member_id = m.member_id where t.tag_id = ?`,
        req.params.id
    );
    res.send(queryResult);
});

router.get("/singer/:id", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT * FROM singer where singer_id = ?`,
        req.params.id
    );
    res.send(queryResult[0]);
});

module.exports = router;
