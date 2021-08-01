import React, { useState, useEffect } from 'react'
import axios from 'axios'

function RecentDelivery(props) {
  const { memberId, setContentIsLoaded } = props
  const [didMount, setDidMount] = useState(true)
  const [orders, setOrders] = useState([
    {
      deliveryId: '',
      deliveryTime: '',
      dishes: [{ dishName: '', dishCount: '' }],
      total: '',
      name: '',
      address: '',
      mobile: '',
      note: '',
    },
  ])

  // 從後端取得訂單資料
  const fetchRecentDelivery = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/delivery/recent/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json, charset=utf-8',
        },
      }
    )

    const data = JSON.parse(JSON.stringify(response.data.data))
    const cloneData = JSON.parse(JSON.stringify(response.data.data))

    let ordersFromServer = []

    // 抓相同訂單的資料(除了 dish)，在抓相同訂單上的 dish 並合併
    // 一樣的訂單，把 delivery_id 設為 null
    for (let i = 0; i < cloneData.length; i++) {
      for (let j = i + 1; j < cloneData.length; j++) {
        if (cloneData[i].delivery_id === cloneData[j].delivery_id) {
          cloneData[j].delivery_id = null
        }
      }
    }
    // 將 delivery_id 非 null 的資料抓出來
    for (let i = 0; i < cloneData.length; i++) {
      let order = null

      if (cloneData[i].delivery_id !== null) {
        order = {
          deliveryId: cloneData[i].delivery_id,
          deliveryTime: cloneData[i].delivery_time,
          dishes: [],
          total: cloneData[i].total,
          name: cloneData[i].name,
          address: cloneData[i].address,
          mobile: cloneData[i].mobile,
          note: cloneData[i].note,
        }

        ordersFromServer.push(order)
      }
    }
    // 把 db 相同訂單的 dish 寫成物件陣列，推到上面寫好的基本資料 dishes 欄位
    for (let i = 0; i < ordersFromServer.length; i++) {
      let dishesFromServer = []

      for (let j = 0; j < data.length; j++) {
        if (ordersFromServer[i].deliveryId === data[j].delivery_id) {
          const dish = {
            dishName: data[j].dish_name,
            dishCount: data[j].dish_count,
          }

          dishesFromServer.push(dish)
        }
      }

      ordersFromServer[i].dishes = dishesFromServer
    }

    return ordersFromServer
  }

  // 計算每筆訂單的 dishes 數量
  const calcDishCountTotal = (dish) => {
    let sum = 0

    for (let i = 0; i < dish.length; i++) {
      sum += dish[i].dishCount
    }

    return sum
  }

  useEffect(() => {
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      // 取得後端資料
      const fetchData = async () => {
        // 取得訂單資料
        const recentDelivery = await fetchRecentDelivery()
        console.log('didUpdate recent delivery:', recentDelivery)

        setOrders(recentDelivery)
        setContentIsLoaded(true)
      }

      fetchData()
    }
  }, [memberId, didMount])

  return (
    <>
      <div className="recent-content">
        {orders.map((v, i) => {
          return (
            <div className="content-container" key={i}>
              <div className="content-head">
                <h4 className="content-head-title">訂單編號 #{v.deliveryId}</h4>
                <div className="detail-container">
                  <i className="fas fa-eye"></i>
                </div>
              </div>
              <div className="content-body">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>送餐時間</th>
                      <th>餐點</th>
                      <th>總金額</th>
                      <th>訂購人</th>
                      <th>取餐地址</th>
                      <th>聯絡電話</th>
                      <th>備註</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{v.deliveryTime}</td>
                      <td>
                        {v.dishes.map((dish, i) => {
                          return (
                            <p>
                              {dish.dishName}*{dish.dishCount}
                            </p>
                          )
                        })}
                      </td>
                      <td>{v.total}</td>
                      <td>{v.name}</td>
                      <td>{v.address}</td>
                      <td>{v.mobile}</td>
                      <td>{v.note}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 按鈕列 */}
              <div className="content-foot">
                <div className="btns-container">
                  <button className="cancel-resv-btn guide-button">
                    取消訂單
                  </button>
                </div>
              </div>

              {/* 手機版按鈕列 */}
              <div className="content-foot-md">
                <div className="msgbox-container">
                  <p>共{calcDishCountTotal(v.dishes)}件餐點</p>
                  <p>合計金額: {v.total}元</p>
                </div>
                <div className="btns-container">
                  <button className="cancel-resv-btn guide-button">
                    取消訂單
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentDelivery