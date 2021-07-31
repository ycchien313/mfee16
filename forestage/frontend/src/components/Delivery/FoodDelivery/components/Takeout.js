import React from 'react'
import moment from 'moment'

function Takeout(props) {
  const { date, setDate, time, setTime } = props

  return (
    <>
      <div className="slogan">
        <div className="bottom-wave">
          <div className="order-time">
            <h3>請選擇送餐時間</h3>
            <div className="date">
              <p className="p">日期</p>
              <input
                type="date"
                defaultValue={date}
                className="input"
                min={moment().format('YYYY-MM-DD')}
                // min="2021-07-19"
                onChange={(event) => {
                  setDate(event.target.value)
                }}
              />
            </div>
            <div className="time">
              <p className="p">時間</p>
              <input
                type="time"
                defaultValue={time}
                className="input"
                min={moment().format('hh:MM')}
                // min="10:00:00"
                onChange={(event) => {
                  setTime(event.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Takeout
