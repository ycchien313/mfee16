import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import HistoryReservationDetailModal from './HistoryReservationDetailModal'

function HistoryReservation(props) {
  const { memberId, setContentIsLoaded } = props
  const [show, setShow] = useState(false)
  const [bootstrapCdnLoad, setBootstrapCdnLoad] = useState(false)
  const [orders, setOrders] = useState([
    { reservationId: '', date: '', status: '' },
  ])
  const [reservationId, setReservationId] = useState('')

  // bootstrap modal 開啟關閉用
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

  // 取得歷史訂位資料
  const fetchHistoryReservation = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/reservation/history/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json, charset=utf-8',
        },
      }
    )

    // 把 response 轉成這邊定義的格式
    let reservation = []
    response.data.data.forEach((v, i) => {
      reservation.push({
        reservationId: v.reservation_id,
        date: v.date,
        status: v.status,
      })
    })

    return reservation
  }

  useEffect(() => {
    const fetchData = async () => {
      const historyReservation = await fetchHistoryReservation()
      // console.log('didMount history reservation: ', historyReservation)

      setOrders(historyReservation)
      setContentIsLoaded(true)
    }

    fetchData()
  }, [])

  // 沒有資料時的 DOM
  const noDataDom = (
    <>
      <div className="no-data-container">
        <h1>您近期沒有任何紀錄</h1>
        <Link to="/reservation" className="no-data-link orange-guide-button">
          訂位
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

      <HistoryReservationDetailModal
        show={show}
        handleClose={handleClose}
        memberId={memberId}
        reservationId={reservationId}
      />

      {orders.length > 0 ? (
        <div class="history-content active">
          <div class="content-container">
            <div class="content-body">
              <table class="content-table">
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
                      <>
                        <tr key={i}>
                          <td>{order.reservationId}</td>
                          <td>{order.date}</td>
                          <td>{order.status}</td>
                          <td>
                            <i
                              class="fas fa-eye"
                              onClick={() => {
                                setReservationId(order.reservationId)
                                handleShow()
                              }}
                            ></i>
                          </td>
                        </tr>
                      </>
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

export default HistoryReservation