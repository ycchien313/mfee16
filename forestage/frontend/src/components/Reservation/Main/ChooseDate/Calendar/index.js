import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../../../../styles/reservation/res/reservation-date.scss'
import Day from './day'

function CalendarBig(props) {
  const { remainingSeat, setRemainingSeat, setCheckList, checkList } = props

  const [singerCalendar, setSingerCalendar] = useState([])

  function getSingerCalendar() {
    axios
      .get('http://127.0.0.1:3001/reservation/singer-calendar')
      .then((result) => {
        // console.log(result.data)

        setSingerCalendar(result.data)
      })
  }

  useEffect(() => {
    getSingerCalendar()
  }, [])

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
                remainingSeat={remainingSeat}
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
