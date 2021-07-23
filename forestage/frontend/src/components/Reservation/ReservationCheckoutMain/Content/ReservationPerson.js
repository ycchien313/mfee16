import React from 'react'
function ReservationPerson() {
  return (
    <>
      <div className="res-person">
        <h3>訂位人資料</h3>
        <hr />
        <div className="content">
          <div className="title">
            <span className="h4 date">姓名</span>
            <span className="h4">電話</span>
            <span className="h4">備註</span>
          </div>
          <div className="detail">
            <input type="text" placeholder="王大明" />
            <input type="text" placeholder="0912345678" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="請輸入備註"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReservationPerson
