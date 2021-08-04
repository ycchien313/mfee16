const { Router } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../utils/db");


// const mailgun = require("mailgun-js");
// const DOMAIN = "sandboxd434801e3d8446a8946d9b7075271e58.mailgun.org";
// const mg = mailgun({apiKey:process.env.MG_KEY, domain: DOMAIN});


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
router.get("/coupon/:memberId",async function(req,res,next){
    let queryresult = 'SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0'
    let memberCoupon = await db.connection.queryAsync(queryresult,[req.params.memberId])
    console.log(req.params.memberId)
    res.send(memberCoupon)
} )

// router.get("/coupon/:id",async function(req,res,next){
//     let queryresult = await db.connection.queryAsync('SELECT c.name, c.deadline, c.minimum_order_value, c.discount,c.coupon_id, mcm.mcm_id FROM member m JOIN member_coupon_mapping mcm ON m.member_id = ? AND m.member_id = mcm.member_id JOIN coupon c ON mcm.coupon_id = c.coupon_id WHERE mcm.valid=1 AND DATEDIFF(c.deadline, CURDATE())>=0',req.params.id)
//     res.send(queryresult)
// } )
// member
router.get("/member/:memberId",async function(req,res,next){
    let queryresult = "SELECT m.member_id ,m.name,m.mobile FROM member m WHERE m.member_id = ?"
    let memberInfo = await db.connection.queryAsync(queryresult, [req.params.memberId])
    console.log('req.query.memberId:', req.params.memberId)
    res.send(memberInfo)
} )

// router.get("/member/:id",async function(req,res,next){
//     let queryresult = await db.connection.queryAsync("SELECT m.member_id ,m.name,m.mobile FROM member m WHERE m.member_id = ?",req.params.id)
//     res.send(queryresult)
// } )

 


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



  let getMemberInfo = `SELECT email, mobile FROM member WHERE member_id = ?`
  [req.body.data.member_id]
  let memberInfo = await db.connection.queryAsync(getMemberInfo,1)
  // console.log(memberInfo[0].name)
  let memberEmail = memberInfo[0].email


//     //   mailgun
  const mailBody = {
    from: 'Elfin Restaurant <restaurant.elfin@gmail.com>',
    // member的email
    to: `${memberEmail}`,
    subject: '您的外送訂單已完成',
    html:`
    <!DOCTYPE html>
            <html  style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
            <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <style type="text/css">
            body {
            margin: 0;
            padding: 0;
            }
            img {
            border: 0 !important;
            outline: none !important;
            }
            p {
            Margin: 0px !important;
            Padding: 0px !important;
            }
            table {
            border-collapse: collapse;
            mso-table-lspace: 0px;
            mso-table-rspace: 0px;
            }
            td, a, span {
            border-collapse: collapse;
            mso-line-height-rule: exactly;
            }
            </style>
            </head>
            <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center"  bgcolor="#efefef">
                <tr>
                <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                    <tr>
                        <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top"><a href="#" target="_blank" style="text-decoration:none; font-size:24px; color:#a1957d; font-weight:700;">Elfin 音樂餐廳</td>
                        </tr>
                        <tr>
                            <td height="28" style="height:28px;" class="em_h20">&nbsp;</td>
                        </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
                <tr>
                <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                    <tr>
                        <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td height="25" style="height:25px;" class="em_h10">&nbsp;</td>
                        </tr>
                                    <tr>
                            <td height="22" style="height:22px;" class="em_h20">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#5e7c60; font-weight:bold;">您在${delivery_tim}訂購了餐點</td>
                        </tr>
                        <tr>
                            <td height="15" style="height:15px; font-size:0px; line-height:0px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color:#434343;">線上訂購成功，總金額為${total}，誠摯感謝您的支持</td>
                        </tr>
                        <tr>
                            <td height="15" style="height:15px; font-size:1px; line-height:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 22px; color:#434343;"><span>桃園市中壢區中央路100號</span> <span class="em_hide2">&nbsp;|&nbsp;</span><span class="em_mob_block"></span>Email:restaurant.elfin@gmail.com</td>
                        </tr>
                        <tr>
                            <td height="20" style="height:20px; font-size:1px; line-height:1px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top"><table width="145" style="width:145px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#6bafb2">
                            <tr>
                                <td class="em_white" height="42" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 16px; color:#ffffff; font-weight:bold; height:42px;"><a href="https://www.mailgun.com" target="_blank" style="text-decoration:none; color:#ffffff; line-height:42px; display:block;">查看訂單</a></td>
                            </tr>
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="40" style="height:40px;" class="em_h10">&nbsp;</td>
                        </tr>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
                <tr>
                <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                    <tr>
                        <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                        <tr>
                            <td height="40" style="height:40px;" class="em_h20">&nbsp;</td>
                        </tr>
                    <tr>
                        <td class="em_hide" style="line-height:1px;min-width:650px;background-color:#efefef;"><img alt="" src="/assets/pilot/images/templates/spacer.gif" height="1" width="650" style="max-height:1px; min-height:1px; display:block; width:650px; min-width:650px;" border="0" /></td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
            `
  };
mg.messages().send(mailBody, function (error, body) {
	// console.log(body);
});

})


module.exports = router;
