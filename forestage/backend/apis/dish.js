const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/data',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`select * from dish`)
    res.json(queryrResult)
})

module.exports = router;
 