import React, { useEffect } from 'react'
import axios from 'axios'

function RecentReservation(props) {
  const { memberId } = props

  // 取得訂位資料
  const fetchMemberReservation = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/reservation/recent/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
    const data = response.data.data

    let resData = []
    data.forEach((v, i) => {
      console.log(v)
      resData = [...resData, v.reservation_id, v.date]
    })
  }

  useEffect(() => {
    // 取得後端資料
    const fetchData = async () => {
      await fetchMemberReservation()
    }
    fetchData()
  })

  return (
    <>
      <div className="recent-content">
        <div className="content-container">
          <div className="content-head">
            <h4 className="content-head-title">訂位編號 #202106071111</h4>
            <div className="detail-container">
              <i className="fas fa-eye"></i>
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
                  <td>2021/07/15</td>
                  <td>李龍號</td>
                  <td>搖滾區</td>
                  <td>2</td>
                  <td>1500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- 按鈕列 --> */}
          <div className="content-foot">
            <div className="btns-container">
              <button className="cancel-resv-btn guide-button">取消訂位</button>
              <button className="update-resv-btn orange-guide-button">
                修改訂位內容
              </button>
            </div>
          </div>

          {/* <!-- 手機版按鈕列 --> */}
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
        </div>
      </div>
    </>
  )
}

export default RecentReservation
