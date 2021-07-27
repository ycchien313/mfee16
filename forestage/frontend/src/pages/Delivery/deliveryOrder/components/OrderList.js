import React from 'react'

function OrderList(props) {
  const { selectedOption, setSelectOption } = props
  return (
    <>
      <div className="dish-content">
        <h3>外送訂單內容</h3>
        <hr className="top" />
        <div className="order-time">
          <h4>送餐時間 :</h4>
          <span className="Time">2021/06/20 18:00</span>
        </div>
        <div className="content">
          <div className="name">
            <span className="h4 dish-name">餐點名稱</span>
            <span className="h4">單價</span>
            <span className="h4">數量</span>
            <span className="h4">小計</span>
          </div>
          {/*  */}
          {/* {t.map(() => {
            if () {
              return(
                <div className="detail">
            <div className="dish">
              <figure className="dish-pic">
                <img
                  src={
                    'http://localhost:3000/images/delivery/deliveryOrder/菜單-瑪格莉特大pizza.jpg'
                  }
                  alt=""
                />
              </figure>
              <span className="dish-name h4">碳烤豬肋排</span>
            </div>
            <span className="h4">500</span>
            <span className="h4">2</span>
            <span className="h4">1000</span>
          </div>
              )
            }
          })} */}
          {/*  */}
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
                <span className="h4">1700</span>
                <span className="h4">元</span>
              </div>
              <select
                name=""
                id=""
                className="h4"
                value={selectedOption}
                onChange={(e) => {
                  setSelectOption(e.target.value)
                }}
              >
                <option value="端午節優惠 滿千折百">端午節優惠 滿千折百</option>
                <option value="參與音樂測驗遊戲獎勵">
                  參與音樂測驗遊戲獎勵
                </option>
                <option value="發文評論獎勵">發文評論獎勵</option>
                <option value="參與歌手投票獎勵">參與歌手投票獎勵</option>
              </select>
              <div className="discount">
                <span className="h4">100</span>
                <span className="h4">元</span>
              </div>
              <div className="total-after">
                <span className="h4">1600</span>
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
