const express = require('express');
const router = express.Router();
const db = require('../utils/db')



//顯示所有文章
router.get("/16", async (req, res) => {
    let commentAll = await db.connection.queryAsync('SELECT * FROM article ORDER BY article_id DESC');
    // res.json(result)
    res.send(commentAll)
});
// 最新消息
router.get("/news", async (req, res) => {
    let commentNews = await db.connection.queryAsync('SELECT * FROM news WHERE valid=1 ORDER BY news_id DESC');
    // res.json(result)
    res.send(commentNews)
});
//所有留言
router.get("/message", async (req, res) => {
    let commentAllMessage = await db.connection.queryAsync('SELECT article_id,message_id FROM message');
    // res.json(result)
    res.send(commentAllMessage)
});
//標籤
router.get("/tag", async (req, res) => {
    let commentTag = await db.connection.queryAsync('SELECT * FROM tag ORDER BY tag_id DESC');
    // res.json(result)
    res.send(commentTag)
});
//按讚
router.put("/articleGood", async (req, res) => {
    let commentGood = await db.connection.queryAsync('UPDATE article SET likes=likes+1 WHERE article_id=?',[req.body.article_id]);
    // res.json(result)
    console.log(commentGood)
    // res.send(commentGood)
});
//取得按讚數
router.get("/articleLikes", async (req, res) => {
    let commentLikes = await db.connection.queryAsync('SELECT article_id,likes FROM article WHERE article_id=?',[req.query.article_id]);
    // res.json(result)
    console.log(req.query)
    res.send(commentLikes)
});
//取消按讚
router.put("/articleNotGood", async (req, res) => {
    let commentNotGood = await db.connection.queryAsync('UPDATE article SET likes=likes-1 WHERE article_id=?',[req.body.article_id]);
    // res.json(result)
    // res.send(commentNotGood)
});
//新增文章
router.post("/createarticle", async (req, res) => {
    // let createArticle = await db.connection.queryAsync('INSERT INTO article(create_time,title,author,content,image,recommendation_index,likes,member_id,tag_id) VALUES (NOW(),?,?,?,?,?,?,?,?)');
    // res.json(result)
    console.log(req.body.insertArticle)
    // res.send(createArticle)
});
//新增留言
router.post("/createmessage", async (req, res) => {
    // console.log(req.body)
    let message=req.body.insertMessage.message
    let member_id=req.body.insertMessage.member_id
    let article_id=req.body.insertMessage.article_id

    let createMessage = await db.connection.queryAsync('INSERT INTO message(create_time,message,member_id,article_id) VALUES (NOW(),?,?,?)',[ message,member_id,article_id]);
    // res.json(result)
    res.send(createMessage)
});
// 點擊文章顯示文章的相關內容(彈出視窗)
// router.get("/:article", async (req, res) => {
//     let boomArticle = await db.connection.queryAsync('SELECT * FROM article WHERE article_id=? ',[req.params.article]);
//     // res.json(result)
//     res.send(boomArticle)
// });
//點擊文章的相關留言
router.get("/article/:message", async (req, res) => {
    let commentMessage = await db.connection.queryAsync('SELECT message.message_id, message.message, message.create_time, member.name, member.avatar FROM message,member WHERE article_id=? AND message.member_id=member.member_id ORDER BY message_id DESC',[req.params.message]);
    // res.json(result)
    res.send(commentMessage)
});
// 點擊標籤的相關文章
router.get("/:tag", async (req, res) => {
    let commentArticle = await db.connection.queryAsync('SELECT * FROM article,tag WHERE article.tag_id=? AND article.tag_id=tag.tag_id ORDER BY article_id DESC',[req.params.tag]);
    // res.json(result)
    res.send(commentArticle)
});


module.exports = router;
