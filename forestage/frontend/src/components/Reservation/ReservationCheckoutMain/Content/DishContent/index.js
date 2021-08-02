import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import DishRow from './DishRow'
function DishContent(props) {
  const { dishList, checkList, insertResData, setInsertResData } = props
  const [coupon, setCoupon] = useState([])
  const [didMount, setDidMount] = useState(false)

  function getMemberCoupons() {
    // 1. 取得登入id
    let authToken = window.localStorage.getItem('authToken')
    // console.log('auth', authToken)
    axios
      .get('http://localhost:3001/auth/me', {
        method: 'get',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        // 2. 取得會員姓名電話
        let memeberId = result.data.memberId
        // console.log('memberid:', memeberId)
        axios
          .get('http://localhost:3001/reservation/checkout/coupon', {
            params: {
              memberId: memeberId,
            },
          })
          .then((result) => {
            // console.log(result.data)
            setCoupon(result.data)
          })
      })
  }


  function setMcmId(e) {
    let newInsertResData = { ...insertResData }
    newInsertResData.mcm_id = parseInt(e.target.value)
    setInsertResData(newInsertResData)
  }

  // 取得折價券的折扣金額
  function getDiscount() {
    let foundCoupon = coupon.find((v) => {
      return v.mcm_id === insertResData.mcm_id
    })
    if (foundCoupon !== undefined) {
      return foundCoupon.discount
    } else {
      return 0
    }
  }

  let checkMcmId = Boolean(window.sessionStorage.getItem('insertResData'))

  let mcmIdInStorage = 0
  if (checkMcmId) {
    mcmIdInStorage = JSON.parse(
      window.sessionStorage.getItem('insertResData')
    ).mcm_id
  }

  useEffect(() => {
    setDidMount(true)
    getMemberCoupons()
  }, [])

  return (
    <>
      <div className="dish-content">
        <h3>餐點內容</h3>
        <hr className="top" />
        <div className="content">
          <div className="name">
            <span className="h4 dish-name">餐點名稱</span>
            <span className="h4">單價</span>
            <span className="h4">數量</span>
            <span className="h4">小計</span>
          </div>
          {dishList.map((v, i) => {
            return (
              v[1] > 0 && (
                <DishRow
                  name={v[0]}
                  count={v[1]}
                  subtotal={v[2]}
                  picture={v[3]}
                  price={v[4]}
                />
              )
            )
          })}
          <hr />
          <div className="price-count">
            <div className="price-count-name">
              <span className="h4">總計</span>
              <span className="h4">折價券</span>
              <span className="h4">折扣</span>
              <span className="h4 after-discount">折扣後金額</span>
            </div>
            <div className="price-count-detail">
              <div className="total">
                <span className="h4">{checkList.total}</span>
                <span className="h4">元</span>
              </div>
              <select
                name=""
                id=""
                className="h4"
                onChange={(e) => {
                  setMcmId(e)
                }}
              >
                <option value="">請選擇</option>
                {/* coupon下拉選單 */}
                {coupon.map((v) => {
                  return checkList.total >= v.minimum_order_value ? (
                    <option
                      value={v.mcm_id}
                      selected={mcmIdInStorage === v.mcm_id ? 'selected' : ''}
                      // checked={true}
                    >{`${v.name} - ${v.discount}元`}</option>
                  ) : (
                    <option value={v.mcm_id} disabled>
                      {`${v.name} - 低消:${v.minimum_order_value}`}
                    </option>
                  )
                })}
              </select>
              <div className="discount">
                <span className="h4">{getDiscount()}</span>
                <span className="h4">元</span>
              </div>
              <div className="total-after">
                <span className="h4">{checkList.total - getDiscount()}</span>
                <span className="h4">元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DishContent
