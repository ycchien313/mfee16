import React, { useEffect, useState } from 'react'
import '../../../../../styles/reservation/res/reservation-date-RWD.scss'
import Day from './day'
function CalendarSmall(props) {
  const { setRemainingSeat, setCheckList, checkList, singerCalendar } = props

  const [chosenWeek, setChosenWeek] = useState(0)
  const [thisWeekClass, thiWeekActClass, nextWeekClass, nextWeekActClass] = [
    'this-week h3',
    'this-week active h3',
    'next-week h3',
    'next-week active h3',
  ]


  return (
    <>
      <div className="week-tags">
        <div
          className={chosenWeek === 0 ? thiWeekActClass : thisWeekClass}
          onClick={() => {
            setChosenWeek(0)
          }}
        >
          本周
        </div>
        <div
          className={chosenWeek === 1 ? nextWeekActClass : nextWeekClass}
          // className="next-week active h3"
          onClick={(e) => {
            // console.log("className:",e.target.className)
            setChosenWeek(1)
          }}
        >
          下周
        </div>
      </div>
      <div className="week">
        {chosenWeek === 0
          ? singerCalendar.map((v, i) => {
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
            })
          : singerCalendar.map((v, i) => {
              if (i >= 5) {
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
    </>
  )
}

export default CalendarSmall
