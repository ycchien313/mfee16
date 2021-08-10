import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function Aside(props) {
  const {
    dishCount,
    dishes,
    dishList,
    setDishList,
    addFee,
    img,
    setImg,
    address,
    fulltime,
    subTotal,
    setSubTotal,
    name,
    setName,
    date,
    time,
    counts,
    setCounts,
  } = props

  // const [counts, setCounts] = useState([])
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
    console.log(newDishArr, 'newDishArr')
  }, [dishCount])

  useEffect(() => {
    ;(function () {
      let price = []
      let product = []
      let count = []
      let imgArr = []
      for (let i = 0; i < dishList.length; i++) {
        if (dishList[i][1] !== 0) {
          imgArr.push(dishes[i].image_realistic)
          product.push(dishList[i][0])
          price.push(dishes[i].price * dishList[i][1])
          count.push(dishList[i][1])
        }
      }
      setImg(imgArr)
      setSubTotal(price)
      setName(product)
      setCounts(count)
      console.log(count, 'count')
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
                        <span className="aside-sp">{v[1]}份</span>
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
          {(counts.length === 0) |
          (date === '') |
          (time === '') |
          (fulltime === '') |
          (address.dist === '') |
          (address.road === '') ? (
            <input
              type="button"
              defaultValue="確認訂單"
              className="OrderGet"
              // className="pink-guide-button"
              field=""
              onClick={function () {
                Swal.fire({
                  icon: 'warning',
                  title: '確認有無遺漏訂單選項',
                  text: '包含: 地址、日期、時間以及定一份餐點~',
                  confirmButtonColor: '#fc5c75',
                })
              }}
            />
          ) : localStorage.getItem('authToken') === null ? (
            <input
              type="button"
              defaultValue="確認登入"
              className="OrderGet"
              // className="pink-guide-button"
              field=""
              onClick={function () {
                Swal.fire({
                  icon: 'warning',
                  title: '確認有無登入',
                  text: '請至上方登入~',
                  confirmButtonColor: '#fc5c75',
                })
              }}
            />
          ) : (
            <Link
              className="Link-back"
              to={{
                pathname: '/delivery/deliveryOrder',
                state: {
                  img: img,
                  name: name,
                  subTotal: subTotal,
                  counts: counts,
                  address: address,
                  fulltime: fulltime,
                  dishList: dishList,
                },
              }}
            >
              <input
                type="button"
                defaultValue="送出訂單"
                // className="OrderGet "
                className="pink-guide-button"
                field=""
              />
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}

export default Aside
