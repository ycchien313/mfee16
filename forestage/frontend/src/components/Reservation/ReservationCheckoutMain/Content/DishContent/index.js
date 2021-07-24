import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import DishRow from './DishRow'
function DishContent(props) {
  const { dishList, checkList, insertResData, setInsertResData } = props
  const [coupon, setCoupon] = useState([])
  const selectRef = useRef(null)
  // const [selectedCoupon, setSelectedCoupon] = useState()
  function getMemberCoupons() {
    axios
      .get('http://localhost:3001/reservation/checkout/coupon', {
        params: {
          memberId: 1,
        },
      })
      .then((result) => {
        console.log(result.data)
        setCoupon(result.data)
      })
  }
  function setMcmId(e) {
    let newInsertResData = { ...insertResData }
    newInsertResData.mcm_id = parseInt(e.target.value)
    setInsertResData(newInsertResData)
  }

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

  useEffect(() => {
    getMemberCoupons()
  }, [])

  useEffect(() => {
    // setTotal()
  }, [insertResData])

  // let discount = 0
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
                <span className="h4">{insertResData.total}</span>
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
