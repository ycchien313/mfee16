import React, { useEffect, useState } from 'react'
import '../../../../../styles/reservation/res/reservation-date.scss'
import Day from './day'
// import { gsap } from 'gsap'
import { Tween } from 'react-gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

function CalendarBig(props) {
  const {
    remainingSeat,
    setRemainingSeat,
    setCheckList,
    checkList,
    singerCalendar,
    seatInfo,
    setSeatInfo,
    setSeatCount,
    seatCount,
    dateFromHome,
    reservationHistory,
    dataFromMember,
  } = props

  return (
    <>
      <Tween
        from={{
          x: '-300px',
        }}
        to={{
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
        <div className="week">
          {singerCalendar.map((v, i) => {
            if (i < 5) {
              return (
                <Day
                  key={v.date}
                  date={v.date}
                  name={v.name}
                  picture={v.picture}
                  remainingSeat={remainingSeat}
                  setRemainingSeat={setRemainingSeat}
                  setCheckList={setCheckList}
                  checkList={checkList}
                  seatInfo={seatInfo}
                  setSeatCount={setSeatCount}
                  setSeatInfo={setSeatInfo}
                  seatCount={seatCount}
                  dateFromHome={dateFromHome}
                  reservationHistory={reservationHistory}
                  dataFromMember={dataFromMember}
                />
              )
            }
          })}
        </div>
        <div className="week">
          {singerCalendar.map((v, i) => {
            if (i >= 5) {
              return (
                <Day
                  key={v.date}
                  date={v.date}
                  name={v.name}
                  picture={v.picture}
                  remainingSeat={remainingSeat}
                  setRemainingSeat={setRemainingSeat}
                  setCheckList={setCheckList}
                  checkList={checkList}
                  seatInfo={seatInfo}
                  setSeatInfo={setSeatInfo}
                  setSeatCount={setSeatCount}
                  seatCount={seatCount}
                  dateFromHome={dateFromHome}
                  reservationHistory={reservationHistory}
                  dataFromMember={dataFromMember}
                />
              )
            }
          })}
        </div>
      </Tween>
    </>
  )
}

export default CalendarBig
