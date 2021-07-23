import React from 'react'
import DishRow from './DishRow'
function DishContent(props) {
  const { dishList } = props
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
                <span className="h4">1700</span>
                <span className="h4">元</span>
              </div>
              <select name="" id="" className="h4">
                <option value="端午節優惠 滿千折百">端午節優惠 滿千折百</option>
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
export default DishContent
