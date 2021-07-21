import axios from 'axios'
import React, { useState, useEffect } from 'react'
function Day(props) {
  const { date, picture, name, remainingSeat, setRemainingSeat } = props

  // 取月份+日期
  let newDate = [...date]
  newDate = newDate.slice(5).join('').replace(/-/g, '/')

  let url = `http://localhost:3001/reservation/${date}`

  function getRemainingSeat() {
    axios.get(url).then((result) => {
      setRemainingSeat(result.data)
    })
  }

  return (
    <>
      <div className="day">
        <span className="h4 date">{newDate}</span>
        <div
          className="singer-pic"
          style={{
            background: `url(http://localhost:3000/images/common/${picture}), no-repeat center`,
            backgroundSize: 'cover',
          }}
          onClick={() => {
            getRemainingSeat()
          }}
        ></div>
        <span className="h4 name">{name}</span>
      </div>
    </>
  )
}
export default Day
