const express = require('express');
const router = express.Router();
const db = require('../utils/db')
const multer = require('multer');
const path = require('path');
const download = require('image-downloader');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../', 'public', 'comment'));
    },
    filename: (req, file, cb) => {
        console.log(file,"topfile")
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({
    // 指定存取位置
    storage: storage,
    // 副檔名篩選
    fileFilter: (req, file, cb) => {
        console.log(file,"副檔名篩選")
        if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
            return cb(new Error('不合格的附檔名'));
        }
        cb(null, true);
    },
    // 設定檔案大小上限，1MB
    limit: {
        fileSize: 1024 * 1024,
    },
});

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
    // console.log(commentGood)
    // res.send(commentGood)
});
//取得按讚數
router.get("/articleLikes", async (req, res) => {
    let commentLikes = await db.connection.queryAsync('SELECT article_id,likes FROM article WHERE article_id=?',[req.query.article_id]);
    // res.json(result)
    // console.log(req.query)
    res.send(commentLikes)
});
//取消按讚
router.put("/articleNotGood", async (req, res) => {
    let commentNotGood = await db.connection.queryAsync('UPDATE article SET likes=likes-1 WHERE article_id=?',[req.body.article_id]);
    // res.json(result)
    // res.send(commentNotGood)
});
//新增文章
router.post("/createarticle",async (req, res) => {
    console.log(req.body,"cc")
    let insertData = Object.values(req.body.insertArticle)
    // insertData[3]=`/public/comment/${req.file.filename}`
    console.log(insertData)
    console.log(insertData[3])
    // let imgUrl= insertData[3].split("blob:")[1]
    let imgUrl= insertData[3]
    console.log(imgUrl)
    
    // const options = {
    //   url: imgUrl,
    //   dest: '/public/comment'
    // }
  
    // download.image(options)
    // console.log(req.file,"cccc")

    let createArticle = await db.connection.queryAsync('INSERT INTO article(create_time,title,author,content,image,recommendation_index,likes,member_id,tag_id) VALUES (NOW(),?)',[insertData]);

    // res.json(result)
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
    // res.send(createMessage)
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
