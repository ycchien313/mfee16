import React from 'react'

function AsideMobile(props) {
  const { show, dishes, dishList, addFee } = props

  const total = () => {
    let sum = 0
    dishList.forEach((v, i) => {
      const count = v[1]
      const price = dishes[i].price
      sum += count * price
    })
    return sum
  }

  return (
    <>
      {show && (
        <div className="menuMobile">
          <div className="menu">
            <div className="content">
              <div className="Mobile-div">
                <div className="title">
                  <h4>目前品項</h4>
                </div>
                <ul>
                  {dishList.map((v, i) => {
                    if (v[1] > 0) {
                      return (
                        <li key={i}>
                          <span>{v[0]}</span>
                          <span className="aside-sp">{v[1]}</span>
                        </li>
                      )
                    }
                  })}
                  <hr />
                  <li>
                    <span>免運門檻${addFee}</span>
                  </li>
                  <li>{total() > 0 && <span>總金額${total()}</span>}</li>
                </ul>
              </div>
            </div>
            <img
              src={
                'http://localhost:3000/images/delivery/FoodDelivery/menu.png'
              }
              alt=""
            />
          </div>
        </div>
      )}
    </>
  )
}

export default AsideMobile
