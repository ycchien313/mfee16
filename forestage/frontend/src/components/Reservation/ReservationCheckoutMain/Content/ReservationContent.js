import React from 'react'
function ReservationContent() {
  return (
    <>
      <div className="res-content">
        <h3>訂位內容</h3>
        <hr />
        <div className="content">
          <figure className="singer-pic">
            <img
              src="http://localhost:3000/images/reservation/res_checkout/李榮浩.jpg"
              alt=""
            />
          </figure>
          <div className="text">
            <div className="name">
              <span className="h4 date">訂位日期：</span>
              <span className="h4">表演歌手：</span>
              <span className="h4">座位區　：</span>
              <span className="h4">訂位人數：</span>
            </div>
            <div className="detail">
              <span className="h4 date">2021 / 08 / 20 18:00</span>
              <span className="h4">蕭敬騰</span>
              <span className="h4">搖滾區</span>
              <span className="h4">3</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReservationContent
