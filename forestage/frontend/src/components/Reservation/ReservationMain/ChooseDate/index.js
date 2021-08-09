import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CalendarBig from './Calendar'
import CalendarSmall from './CalendarSmall'
import SeatsBar from './SeatsBar'
import { useMediaQuery } from 'react-responsive'
import { Tween } from 'react-gsap'
import { HashLink as Link } from 'react-router-hash-link'

function ChooseDate(props) {
  const {
    remainingSeat,
    setRemainingSeat,
    setSeatInfo,
    seatInfo,
    seatCount,
    setSeatCount,
    setCheckList,
    checkList,
    dateFromHome,
    reservationHistory,
    dataFromMember,
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
      <section className="choose-date" id="chooseDate">
        <div className="steps">
          <div className="active">
            <h3 className="step">選擇日期</h3>
            <Tween
              from={{
                opacity: '0',
                x: '-10vw',
              }}
              to={{
                opacity: '1',
                x: '0px',
                scrollTrigger: {
                  trigger: '.square',
                  start: '600px center',
                  end: '900px center',
                  scrub: 1,
                  markers: false,
                },
              }}
            >
              <img
                src="http://localhost:3000/images/reservation/active-title.png"
                alt=""
              />
            </Tween>
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
              setSeatCount={setSeatCount}
              setSeatInfo={setSeatInfo}
              seatInfo={seatInfo}
              seatCount={seatCount}
              dateFromHome={dateFromHome}
              reservationHistory={reservationHistory}
              dataFromMember={dataFromMember}
            />
          ) : (
            <CalendarBig
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
              setCheckList={setCheckList}
              checkList={checkList}
              singerCalendar={singerCalendar}
              setSeatCount={setSeatCount}
              setSeatInfo={setSeatInfo}
              seatInfo={seatInfo}
              seatCount={seatCount}
              dateFromHome={dateFromHome}
              reservationHistory={reservationHistory}
              dataFromMember={dataFromMember}
            />
          )}
          <SeatsBar
            seatInfo={seatInfo}
            seatCount={seatCount}
            setSeatCount={setSeatCount}
            remainingSeat={remainingSeat}
          />
        </div>
      </section>
      {/* 滑鼠滾輪 */}
      <Link smooth to="#chooseSeat">
        <div className="center-con" id="toSeat">
          <div className="cta">
            <div className="down-arrow primera next "></div>
            <div className="down-arrow segunda next "></div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ChooseDate
