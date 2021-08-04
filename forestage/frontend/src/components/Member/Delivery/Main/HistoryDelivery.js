import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import HistoryDeliveryDetailModal from './HistoryDeliveryDetailModal'

function HistoryDelivery(props) {
  const { memberId, setContentIsLoaded } = props
  const [deliveryId, setDeliveryId] = useState('')
  const [orders, setOrders] = useState([
    {
      deliveryId: '',
      deliveryTime: '',
      status: '',
    },
  ])

  // bootstrap modal 開啟關閉用
  const [show, setShow] = useState(false)
  const [bootstrapCdnLoad, setBootstrapCdnLoad] = useState(false)
  const handleClose = () => {
    setBootstrapCdnLoad(false)
    setShow(false)
  }
  const handleShow = () => {
    setBootstrapCdnLoad(true)
    setTimeout(() => {
      setShow(true)
    }, 20)
  }

  const fetchHistoryDelivery = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/delivery/history/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json, charset=utf-8',
        },
      }
    )

    const data = response.data.data
    let delivery = []

    data.forEach((v, i) => {
      delivery.push({
        deliveryId: v.delivery_id,
        deliveryTime: v.delivery_time,
        status: v.status,
      })
    })

    return delivery
  }

  useEffect(() => {
    // 取得後端資料
    const fetchData = async () => {
      // 取得歷史訂單資料
      const historyDelivery = await fetchHistoryDelivery()
      // console.log('didMount history delivery: ', historyDelivery)

      setOrders(historyDelivery)
    }

    fetchData()
    setContentIsLoaded(true)
  }, [])

  // 沒有資料時的 DOM
  const noDataDom = (
    <>
      <div className="no-data-container">
        <h1>您近期沒有任何訂餐</h1>
        <Link to="/delivery" className="no-data-link orange-guide-button">
          訂餐
        </Link>
      </div>
    </>
  )

  const bootstrapModalCdn = (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
  )

  return (
    <>
      {/* bootstrap CDN */}
      {bootstrapCdnLoad && bootstrapModalCdn}

      <HistoryDeliveryDetailModal
        show={show}
        handleClose={handleClose}
        memberId={memberId}
        deliveryId={deliveryId}
      />

      {orders.length > 0 ? (
        <div className="history-content active">
          <div className="content-container">
            <div className="content-body">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>訂單編號</th>
                    <th>日期</th>
                    <th>狀態</th>
                    <th>更多</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => {
                    return (
                      <tr key={i}>
                        <td>{order.deliveryId}</td>
                        <td>{order.deliveryTime}</td>
                        <td>{order.status}</td>
                        <td>
                          <i
                            className="fas fa-eye"
                            onClick={() => {
                              setDeliveryId(order.deliveryId)
                              handleShow()
                            }}
                          ></i>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        noDataDom
      )}
    </>
  )
}

export default HistoryDelivery
