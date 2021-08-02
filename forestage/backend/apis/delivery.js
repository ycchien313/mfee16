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
// router.get("/coupon",async function(req,res,next){
//     let queryresult = 'SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0'
//     let memberCoupon = await db.connection.queryAsync(queryresult,[req.query.memberId])
//     console.log(req.query.memberId)
//     res.send(memberCoupon)
// } )

router.get("/coupon/:id",async function(req,res,next){
    let queryresult = await db.connection.queryAsync('SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0',req.params.id)
    res.send(queryresult)
} )
// member
// router.get("/member",async function(req,res,next){
//     let queryresult = "SELECT m.member_id ,m.name,m.mobile FROM member m WHERE m.member_id = ?"
//     let memberInfo = await db.connection.queryAsync(queryresult, [req.query.memberId])
//     console.log('req.query.memberId:', req.query.memberId)
//     res.send(memberInfo)
// } )

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
    // console.log(updateDeliery.insertId,"Id")

    let McmSql =(`UPDATE member_coupon_mapping SET delivery_id = ${updateDeliery.insertId}, valid = 0 WHERE mcm_id=?`)
    let updateMcm= await db.connection.queryAsync(McmSql,[req.body.data.mcm_id])


    // >0
    let list = req.body.data.dishList
    list = list.filter((v)=>{
        return v[1]>0
    })
    // console.log(list)

    for( let i =0; i<list.length;i++){
        console.log(list[i][0])
        switch( list[i][0]){
        case "總匯潛艇堡":
        list[i].push(1)
        break
        case "瑪格莉特大披薩":
        list[i].push(2)
        break
        case "碳烤豬肋排":
        list[i].push(3)
        break
        case "凱薩沙拉":
        list[i].push(4)
        break
        case "甜椒封肉":
        list[i].push(5)
        break
        case "墨西哥雞肉捲":
        list[i].push(6)
        break
        case "爆米花":
        list[i].push(7)
        break
        case "巧克力聖代":
        list[i].push(8)
        break
        case "草莓蛋糕":
        list[i].push(9)
        break
        }
    }

    let newDishList = []
    for(let i =0; i<list.length; i++){
        for(let j =0; j<list[i][1]; j++){
            newDishList.push({delivery_id:updateDeliery.insertId,dish_id:list[i][2]})
        }
    }
    
    for(let i=0;i<newDishList.length;i++){
        let insertDish = await db.connection.queryAsync(`INSERT INTO delivery_dish_mapping (delivery_id, dish_id) VALUES (?,?)`,[[newDishList[i].delivery_id],[newDishList[i].dish_id]])
    }

  })

module.exports = router;
