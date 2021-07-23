import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
import ChooseDate from '..'
function Day(props) {
  const {
    date,
    picture,
    name,
    remainingSeat,
    setRemainingSeat,
    setCheckList,
    checkList,
  } = props

  // 取月份+日期
  let newDate = [...date]
  newDate = newDate.slice(5).join('').replace(/-/g, '/')

  let url = `http://localhost:3001/reservation/${date}`

  function getRemainingSeat() {
    axios.get(url).then((result) => {
      setRemainingSeat(result.data)
    })
  }

  function updateCheckList(date, name) {
    let newObj = { ...checkList }
    newObj.chosenDate = date
    newObj.singer = name
    setCheckList(newObj)
  }

  const day = useRef(null)
  useEffect(() => {
    $(day.current).on('click', () => {
      $(day.current).addClass('active')
      $(day.current).siblings().removeClass('active')
      $(day.current).parent().siblings().find('.day').removeClass('active')
    })
  }, [])

  return (
    <>
      <div className="day" ref={day}>
        <span className="h4 date">{newDate}</span>
        <div
          className="singer-pic"
          style={{
            background: `url(http://localhost:3000/images/common/${picture}), no-repeat center`,
            backgroundSize: 'cover',
          }}
          onClick={() => {
            getRemainingSeat()
            updateCheckList(date, name)
          }}
        ></div>
        <span className="h4 name">{name}</span>
      </div>
    </>
  )
}
export default Day
