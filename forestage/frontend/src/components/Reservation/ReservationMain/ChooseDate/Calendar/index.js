import React, { useEffect, useState } from 'react'
import '../../../../../styles/reservation/res/reservation-date.scss'
import Day from './day'

function CalendarBig(props) {
  const { remainingSeat, setRemainingSeat, setCheckList, checkList, singerCalendar } = props

  return (
    <>
      <div className="week">
        {singerCalendar.map((v, i) => {
          if (i < 5) {
            return (
              <Day
                key={v.date}
                date={v.date}
                name={v.name}
                picture={v.picture}
                setRemainingSeat={setRemainingSeat}
                setCheckList={setCheckList}
                checkList={checkList}
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
              />
            )
          }
        })}
      </div>
    </>
  )
}

export default CalendarBig
