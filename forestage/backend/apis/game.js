const express = require('express');
const router = express.Router();
const db = require('../utils/db')
router.post('/getCoupon',async function(req,res,next){
    let queryrResult = await db.connection.queryAsync(`INSERT INTO member_coupon_mapping(member_id, coupon_id,  valid) VALUES (?,'4','1') `,[req.body.memberId])
    // res.json(queryrResult)
    console.log('abc')
})
module.exports = router;