import React from 'react'

function Aside(props) {
  const { counts, dishes, setDishes } = props
  return (
    <>
      <aside className="aside-list">
        <div className="menu">
          <div className="content">
            <div className="">
              <div className="title">
                <h4>目前品項</h4>
              </div>
              <ul>
                {/* {dishes.map((item, i) => {
                  return <li key={i}>{item}</li>
                })} */}
                {/* <li>總匯潛艇堡$200</li> */}
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
