const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/data',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`select * from dish`)
    res.json(queryrResult)
})
router.get('/likes/:dishs',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`SELECT  count(recommendation_index) as reviewer,  (SUM(recommendation_index)/count(recommendation_index))*20 as stars   from article  where tag_id = ?`,req.params.dishs)
    res.json(queryrResult)
})
module.exports = router;
 