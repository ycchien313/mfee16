const express = require('express');
const router = express.Router();
const db = require('../utils/db')

router.get('/', async (req, res)=>{

    let getSeatSql = 'SELECT * FROM seat'
    let result = await db.connection.queryAsync(getSeatSql)
    res.send(result)
})

module.exports = router;
