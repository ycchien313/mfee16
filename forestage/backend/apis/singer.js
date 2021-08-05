const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/data/:type',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`select * from singer where type = ? `,req.params.type)
    res.json(queryrResult)
})
router.get('/comment/:singerId',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`SELECT m.name as name, a.author as nickname, t.name as singer, a.title as title, a.content as content, m.avatar as img, a.recommendation_index as likes FROM article as a INNER JOIN tag as t ON a.tag_id = t.tag_id INNER JOIN member as m ON a.member_id = m.member_id where t.tag_id = ? order by likes desc`,req.params.singerId)
    res.json(queryrResult)
})
router.get('/likes/:singers',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`SELECT  count(recommendation_index) as reviewer,  (SUM(recommendation_index)/count(recommendation_index))*20 as stars  from article where tag_id = ?`,req.params.singers)
    res.json(queryrResult)
})
module.exports = router;