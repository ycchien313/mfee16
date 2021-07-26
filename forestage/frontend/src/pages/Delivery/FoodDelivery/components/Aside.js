import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Aside(props) {
  const {
    dishCount,
    dishes,
    setDishes,
    dishList,
    setDishList,
    addFee,
    img,
    address,
    fulltime,
  } = props
  const [name, setName] = useState([])
  const [subTotal, setSubTotal] = useState([])
  const [counts, setCounts] = useState([])
  // 計算總金額
  const total = () => {
    let sum = 0
    dishList.forEach((v, i) => {
      const count = v[1]
      const price = dishes[i].price
      sum += count * price
    })
    return sum
  }

  useEffect(() => {
    let newDishArr = []
    let dishArr = Object.entries(dishCount)
    dishes.forEach((dish) => {
      newDishArr = dishArr.map((v, i) => {
        if (parseInt(v[0]) === dish.dish_id) {
          v[0] = dish.name
        }
        return v
      })
    })
    setDishList(newDishArr)
  }, [dishCount])

  // 宜諺加ㄉ
  useEffect(() => {
    ;(function () {
      let price = []
      let product = []
      let count = []
      for (let i = 0; i < dishList.length; i++) {
        price.push(dishes[i].price * dishList[i][1])
        product.push(dishList[i][0])
        count.push(dishList[i][1])
      }
      console.log(price)
      console.log(product)
      setSubTotal(price)
      setName(product)
      setCounts(count)
    })()
  }, [dishList])
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
            src={'http://localhost:3000/images/delivery/FoodDelivery/menu.png'}
            alt=""
          />
          <Link
            to={{
              pathname: '/',
              state: {
                name: name,
                subTotal: subTotal,
                counts: counts,
                address: address,
                fulltime: fulltime,
              },
            }}
          >
            <input
              type="button"
              defaultValue="送出訂單"
              className="OrderGet"
              field=""
            />
          </Link>
        </div>
      </aside>
    </>
  )
}

export default Aside
