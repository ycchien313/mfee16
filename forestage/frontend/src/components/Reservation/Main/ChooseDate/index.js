import React, { useState } from 'react'
import CalendarBig from './Calendar'
import CalendarSmall from './CalendarSmall'
import SeatsBar from './SeatsBar'
import { useMediaQuery } from 'react-responsive'
function ChooseDate(props) {
  const { remainingSeat, setRemainingSeat, seatInfo, seatCount, setSeatCount } = props
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return (
    <>
      <section className="choose-date">
        <div className="steps">
          <div className="active">
            <h3 className="step">選擇日期</h3>
            <img
              src="http://localhost:3000/images/reservation/active-title.png"
              alt=""
            />
          </div>
          <div className="arrow"></div>
          <h3 className="step">選擇座位</h3>
          <div className="arrow"></div>
          <h3 className="step">選擇餐點</h3>
        </div>
        <div className="weeks">
          {isTabletOrMobile ? (
            <CalendarSmall
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
            />
          ) : (
            <CalendarBig
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
            />
          )}
          <SeatsBar
            // remainingSeat={remainingSeat}
            // setRemainingSeat={setRemainingSeat}
            seatInfo={seatInfo}
            seatCount={seatCount}
            setSeatCount={setSeatCount}
          />
        </div>
      </section>
      {/* 滑鼠滾輪 */}
      <div className="center-con">
        <div className="cta">
          <div className="down-arrow primera next "></div>
          <div className="down-arrow segunda next "></div>
        </div>
      </div>
    </>
  )
}

export default ChooseDate
