import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecentReservationDetailModal from './RecentReservationDetailModal'
import { useMediaQuery } from 'react-responsive'

function RecentReservation(props) {
  const { memberId } = props
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [didMount, setDidMount] = useState(true)
  const [show, setShow] = useState(false)
  const [orders, setOrders] = useState([])
  const [reservationId, setReservationId] = useState('')

  // bootstrap modal 開啟關閉用
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // 取得訂位資料
  const fetchRecentReservation = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/reservation/recent/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )

    return response.data.data
  }

  useEffect(() => {
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      // 取得後端資料
      const fetchData = async () => {
        // 取得會員的訂位資料
        const recentReservation = await fetchRecentReservation()
        console.log('didMount recent reservstion:', recentReservation)

        setOrders(recentReservation)
      }

      fetchData()
    }
  }, [memberId, didMount])

  // 電腦版按鈕列
  const btnRowDom = (
    <>
      <div className="content-foot">
        <div className="btns-container">
          <button className="cancel-resv-btn guide-button">取消訂位</button>
          <button className="update-resv-btn orange-guide-button">
            修改訂位內容
          </button>
        </div>
      </div>
    </>
  )

  // 手機版按鈕列
  const btnRowMdDom = (
    <>
      <div className="content-foot-md">
        <div className="msgbox-container">
          <p>共6件餐點</p>
          <p>合計金額: 2000元</p>
        </div>
        <div className="btns-container">
          <button className="cancel-resv-btn guide-button">取消訂位</button>
          <button className="update-resv-btn orange-guide-button">
            修改訂位內容
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <RecentReservationDetailModal
        show={show}
        handleClose={handleClose}
        memberId={memberId}
        reservationId={reservationId}
      />

      {orders.map((v, i) => {
        return (
          <>
            <div className="recent-content" key={i}>
              <div className="content-container">
                <div className="content-head">
                  <h4 className="content-head-title">
                    訂位編號 #{v.reservation_id}
                  </h4>
                  <div className="detail-container">
                    <i
                      className="fas fa-eye"
                      onClick={() => {
                        setReservationId(v.reservation_id)
                        handleShow()
                      }}
                    ></i>
                  </div>
                </div>
                <div className="content-body">
                  <table className="content-table">
                    <thead>
                      <tr>
                        <th>訂位日期</th>
                        <th>表演歌手</th>
                        <th>座位區</th>
                        <th>人數</th>
                        <th>總金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{v.date}</td>
                        <td>{v.singer_name}</td>
                        <td>{v.seat_name}</td>
                        <td>{v.attendance}</td>
                        <td>{v.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 手機版按鈕列 ←→ 電腦版按鈕列 */}
                {isDesktopOrMobile ? btnRowMdDom : btnRowDom}
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default RecentReservation
