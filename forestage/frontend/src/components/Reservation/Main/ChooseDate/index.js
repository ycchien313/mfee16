import React from 'react'
import CalendarBig from './Calendar'
import CalendarSmall from './CalendarSmall'
import { useMediaQuery } from 'react-responsive'
function ChooseDate() {
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
          {isTabletOrMobile ? <CalendarSmall /> : <CalendarBig />}
          <div className="left-seat">
            <div className="bar-background">
              <div className="rock-bar"></div>
              <div className="rock-bar-end"></div>
              <div className="middle-bar"></div>
              <div className="middle-bar-end"></div>
              <div className="back-bar"></div>
              <div className="back-bar-end"></div>
            </div>
            <div className="bar-info">
              <span className="title">剩餘座位</span>
              <div className="rock">
                <div className="circle"></div>
                <p>
                  搖滾區 <span>5</span> 席
                </p>
              </div>
              <div className="middle">
                <div className="circle"></div>
                <p>
                  中區 <span>5</span> 席
                </p>
              </div>
              <div className="back">
                <div className="circle"></div>
                <p>
                  後區 <span>5</span> 席
                </p>
              </div>
            </div>
          </div>
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
