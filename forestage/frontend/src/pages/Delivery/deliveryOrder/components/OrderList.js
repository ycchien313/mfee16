import React, { useState, useEffect } from 'react'

function OrderList(props) {
  const { selectedOption, setSelectOption, orderAll, coupon, inputCoupons } =
    props
  const { img, name, counts, subTotal, fulltime } = orderAll
  const [couponName, setCouponName] = useState('')
  const [couponPrice, setCouponPrice] = useState(0)

  useEffect(() => {
    if (coupon.length > 0) {
      let newItem = coupon.filter(function (v) {
        return v.name == couponName
      })
      setCouponPrice(newItem[0].discount)
    }
  }, [couponName])

  function getTotal() {
    let total = 0
    for (let i = 0; i < subTotal.length; i++) {
      total += subTotal[i]
    }
    return total
  }
  return (
    <>
      <div className="dish-content">
        <h3>餐點資料</h3>
        <hr className="top" />
        <div className="order-time">
          <h4>送餐時間 :</h4>
          <span className="Time">{fulltime}</span>
        </div>
        <div className="content">
          <div className="name">
            <span className="h4 dish-name">餐點名稱</span>
            <span className="h4">單價</span>
            <span className="h4">數量</span>
            <span className="h4">小計</span>
          </div>
          {img.map((v, i) => {
            return (
              <div className="detail">
                <div className="dish">
                  <figure className="dish-pic">
                    <img src={img[i]} alt="" />
                  </figure>
                  <span className="dish-name h4">{name[i]}</span>
                </div>
                <span className="h4">{subTotal[i] / counts[i]}</span>
                <span className="h4">{counts[i]}</span>
                <span className="h4">{subTotal[i]}</span>
              </div>
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
                <span className="h4">{getTotal()}</span>
                <span className="h4">元</span>
              </div>
              <select
                name=""
                id=""
                className="h4"
                value={selectedOption}
                onChange={(e) => {
                  setSelectOption(e.target.value)
                  setCouponName(e.target.value)
                }}
              >
                <option disabled>請選擇折價卷</option>
                {coupon.map((v, i) => {
                  return <option>{coupon[i].name}</option>
                })}
              </select>
              <div className="discount">
                <span className="h4" defaultValue="">
                  {couponPrice}
                </span>
                <span className="h4">元</span>
              </div>
              <div className="total-after">
                <span className="h4">{getTotal() - couponPrice}</span>
                <span className="h4">元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderList
