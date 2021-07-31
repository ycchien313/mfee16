const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../utils/db");

// 取得的網址名稱("自行命名",callback函式)
router.get("/dish/main",async function(req,res,next){
    // 請求資料庫資料()
    // let queryresult = await db.connection.queryAsync("select * from dish")
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '主餐'")
    res.send(queryresult)
} )

router.get("/dish/side",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '附餐'")
    res.send(queryresult)
} )

router.get("/dish/dessert",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish` WHERE type = '甜點'")
    res.send(queryresult)
} )

router.get("/dish/",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT * FROM `dish`")
    res.send(queryresult)
} )

// coupon 
router.get("/coupon/:id",async function(req,res,next){
    let queryresult = await db.connection.queryAsync('SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0',req.params.id)
    res.send(queryresult)
} )

router.get("/member/:id",async function(req,res,next){
    let queryresult = await db.connection.queryAsync("SELECT m.member_id ,m.name,m.mobile FROM member m WHERE m.member_id = ?",req.params.id)
    res.send(queryresult)
} )


router.post('/order', async function (req, res, next) {
    // 處理INSERT資料
    const { name, mobile, address, delivery_time, total, note, member_id,mcm_id,coupon_id,dishList } =req.body.data
    let arr = [name, mobile, address, delivery_time, total, note, member_id,mcm_id]
    console.log(arr)

    let sql = null
    sql = 'INSERT INTO delivery (name,mobile,address,delivery_time,total,note,member_id,mcm_id) VALUES (?)'
    let updateDeliery = await db.connection.queryAsync(sql, [arr])
    
    // 
    sql = 'SELECT delivery_id FROM `delivery` ORDER BY delivery_id DESC LIMIT 0,1'
    let updateId = await db.connection.queryAsync(sql)
    console.log(updateId,"Id")
    // console.log(updateId.delivery_id,"Id")
    // console.log(updateId.RowDataPacket.delivery_id,"Id")
    // console.log([0].constructor.delivery_id,"Id")

    // console.log(req.body.data.mcm_id)
    console.log(req.body.data.dishList)
    let McmSql =(`UPDATE member_coupon_mapping SET delivery_id = ${updateId}, valid = 0 WHERE mcm_id=?`)
    let updateMcm= await db.connection.queryAsync(McmSql,[req.body.data.mcm_id])

//  req.body.data.dishList =[
//   [ '總匯潛艇堡', 0 ],
//   [ '瑪格莉特大披薩', 2 ],
//   [ '碳烤豬肋排', 0 ],
//   [ '凱薩沙拉', 0 ],
//   [ '甜椒封肉', 0 ],
//   [ '墨西哥雞肉捲', 0 ],
//   [ '爆米花', 0 ],
//   [ '巧克力聖代', 0 ],
//   [ '草莓蛋糕', 0 ]
// ]
    // 取出>0的
    let list = req.body.data.dishList
    list = list.filter((v)=>{
        return v[1]>0
    })
     // insert陣列 [delivery_id,dish_id]
    let newDishList = []
    list.forEach((v)=>{
        for(let i =0; i<v[0]; i++){
            newDishList.push([ ,v[0]])
        }
    })
    let insertDdm = `INSERT INTO delivery_dish_mapping (delivery_id, dish_id) VALUES ?`
    let insertDish = await db.connection.queryAsync(insertDdm,[newDishList])

  })

module.exports = router;
