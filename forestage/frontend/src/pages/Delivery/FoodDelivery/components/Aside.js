import React from 'react'

function Aside(props) {
  const { name, price } = props

  return (
    <>
      <aside className="aside-list">
        <div className="menu">
          <div className="content">
            <div classNme="">
              <div className="title">
                <h4>目前品項</h4>
              </div>
              <ul>
                <li>
                  {name}${price}
                </li>
                <li>碳烤豬肋排$500</li>
                <li>總匯潛艇堡$200</li>
                <hr />
              </ul>
            </div>
          </div>
          <img
            src={'http://localhost:3000/images/delivery/FoodDelivery/menu.png'}
            alt=""
          />
          <input
            type="button"
            defaultValue="送出訂單"
            className="OrderGet"
            field=""
          />
        </div>
      </aside>
    </>
  )
}

export default Aside
