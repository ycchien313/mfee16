import React, { useEffect, useState } from 'react'
function ReservationContent(props) {
  const { checkList } = props
  let newDate = checkList.chosenDate

  // 更換日期格式
  if (newDate !== undefined) {
    newDate = newDate.replace(/-/g, ' / ')
    console.log(newDate, 'newdate')
  }

  return (
    <>
      <div className="res-content">
        <h3>訂位內容</h3>
        <hr />
        <div className="content">
          <figure className="singer-pic">
            <img
              src={`http://localhost:3000/images/common/${checkList.singerPic}`}
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
              <span className="h4 date">{newDate}</span>
              <span className="h4">{checkList.singer}</span>
              <span className="h4">{checkList.seatArea}</span>
              <span className="h4">{checkList.attendance}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReservationContent
