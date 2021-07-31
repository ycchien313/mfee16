import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CalendarBig from './Calendar'
import CalendarSmall from './CalendarSmall'
import SeatsBar from './SeatsBar'
import { useMediaQuery } from 'react-responsive'
function ChooseDate(props) {
  const {
    remainingSeat,
    setRemainingSeat,
    seatInfo,
    seatCount,
    setSeatCount,
    setCheckList,
    checkList
  } = props

  const [singerCalendar, setSingerCalendar] = useState([])

  function getSingerCalendar() {
    axios
      .get('http://127.0.0.1:3001/reservation/singer-calendar')
      .then((result) => {
        setSingerCalendar(result.data)
      })
  }

  const checkSingerCalendar = Boolean(sessionStorage.getItem('singerCalendar'))

  useEffect(() => {
    getSingerCalendar()
    checkSingerCalendar &&
      setSingerCalendar(JSON.parse(sessionStorage.getItem('singerCalendar')))
  }, [])

  useEffect(() => {
    window.sessionStorage.setItem(
      'singerCalendar',
      JSON.stringify(singerCalendar)
    )
  }, [singerCalendar])

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
              setCheckList={setCheckList}
              checkList={checkList}
              singerCalendar={singerCalendar}
            />
          ) : (
            <CalendarBig
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
              setCheckList={setCheckList}
              checkList={checkList}
              singerCalendar={singerCalendar}
            />
          )}
          <SeatsBar
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
