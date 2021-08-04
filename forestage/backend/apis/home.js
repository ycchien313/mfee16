const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const moment = require("moment");
const { query } = require("express");
let current = moment().format("YYYY-MM-DD");
let beginWeek = moment().startOf("isoWeek").format("YYYY-MM-DD");
let endWeek = moment().endOf("isoWeek").format("YYYY-MM-DD");

// let getCalendarSql = 'SELECT sc.date, s.name, s.picture FROM singer_calendar AS sc, singer AS s WHERE DATEDIFF(sc.date, CURDATE())>=0 AND s.singer_id=sc.singer_id ORDER BY sc.date LIMIT 10' 蕙伃的

// 取得本日表演者資訊
router.get("/singer_today", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT * from singer as s inner join singer_calendar as s_c on s.singer_id = s_c.singer_id where s_c.date LIKE '${current}%'`
    );
    // let queryResult = current + "T16:00:00.000Z";
    res.send(queryResult[0]);
});
// 手機板歌手資訊
router.get("/singer_all", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync("SELECT * FROM singer");
    res.send(queryResult);
});

// 取得登入後會員詳情
router.get("/member_state/:memberId", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        "select * from member where member_id = ?",
        req.params.memberId
    );
    res.json(queryResult);
});

// 取得評論資料
router.get("/comment/:id", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT m.name as name, a.author as nickname, t.name as singer, a.title as title, a.content as content, m.avatar as img, a.recommendation_index as likes FROM article as a INNER JOIN tag as t ON a.tag_id = t.tag_id INNER JOIN member as m ON a.member_id = m.member_id where t.tag_id = ? order by likes desc`,
        req.params.id
    );
    res.send(queryResult);
});

// 取得歌手資訊
router.get("/singer/:id", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT * FROM singer where singer_id = ?`,
        req.params.id
    );
    res.send(queryResult[0]);
});

// 取得當週票數
router.get("/vote_count", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `SELECT
        singer.name as name, singer.singer_id as id,
        COUNT(CASE WHEN vote.vote_time BETWEEN '${beginWeek}' and '${endWeek}' THEN 6 ELSE NULL END) as count,
        singer.picture as picture
        FROM
        vote inner join singer on vote.singer_id = singer.singer_id
        GROUP BY
        singer.name order by count desc`
    );
    res.send(queryResult);
});

// 取得表演者行事曆
router.get("/calendar", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `select sc.date, s.name from singer_calendar as sc inner join singer as s on sc.singer_id = s.singer_id where DATEDIFF(sc.date,CURDATE()) >= 0 limit 10`
    );
    res.send(queryResult);
});

// 取得剩餘座位
router.get("/seat/rock/:date", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `select s.name as name,IFNULL(sum(r.attendance),0) as total from seat as s inner join reservation as r on s.seat_id = r.seat_id WHERE DATE = ? and s.name = '搖滾區'`,
        req.params.date
    );
    res.send(queryResult);
});
router.get("/seat/middle/:date", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `select s.name as name,IFNULL(sum(r.attendance),0) as total from seat as s inner join reservation as r on s.seat_id = r.seat_id WHERE DATE = ? and s.name = '中區'`,
        req.params.date
    );
    res.send(queryResult);
});
router.get("/seat/back/:date", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `select s.name as name,IFNULL(sum(r.attendance),0) as total from seat as s inner join reservation as r on s.seat_id = r.seat_id WHERE DATE = ? and s.name = '後區'`,
        req.params.date
    );
    res.send(queryResult);
});

// 取得餐點資訊
router.get("/dish", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync("select * from dish");
    res.send(queryResult);
});

// 接收前台投票
router.post("/update_candidate/:candidateId", async function (req, res, next) {
    let queryResult = await db.connection.queryAsync(
        `INSERT INTO vote (vote_id, vote_time, singer_id) VALUES (NULL, '${current}', ?)`,
        [req.params.candidateId]
    );
    let queryResult2 = await db.connection.queryAsync(
        "update member set vote_valid = 0 where member_id = ?",
        [req.body.memberId]
    );
    console.log(req.body.memberId);
});

module.exports = router;
