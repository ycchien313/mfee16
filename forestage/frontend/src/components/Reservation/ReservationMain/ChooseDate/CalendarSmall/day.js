import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery'

function Day(props) {
  const {
    date,
    picture,
    name,
    remainingSeat,
    setRemainingSeat,
    setCheckList,
    checkList,
    seatInfo,
    setSeatCount,
    setSeatInfo,
    dateFromHome,
  } = props

  const [didMount, setDidMount] = useState(false)

  // 取月份+日期
  let newDate = [...date]
  newDate = newDate.slice(5).join('').replace(/-/g, '/')

  // let url = `http://localhost:3001/reservation/${date}`

  function getSeatCount() {
    let newObj = {}
    // console.log("seatInfo", seatInfo)
    for (let i = 0; i < seatInfo.length; i++) {
      const foundRemainSeats = remainingSeat.find((item) => {
        return item.seat_id === seatInfo[i].seat_id
      })

      let totalSeats = foundRemainSeats
        ? foundRemainSeats.remainingSeats
        : seatInfo[i].totalSeats

      // let newId = seatInfo[i].seat_id
      newObj[seatInfo[i].seat_id] = totalSeats
      setSeatCount(newObj)
    }
    // 如果座位數是0，清空checklist(不能先判斷再執行,先加進checklist再判斷)
    if (newObj[1] === 0 && newObj[2] === 0 && newObj[3] === 0) {
      clearCheckList()
    }
  }

  useEffect(() => {
    if (didMount) {
      getSeatCount()
    }
   // 得到資訊後才執行
  }, [remainingSeat, seatInfo])

  function getRemainingSeat(date1) {
  let url = `http://localhost:3001/reservation/${date1}`

    axios.get(url).then((result) => {
      setRemainingSeat(result.data)
      if (
        result.data.length === 3 &&
        result.data[0].remainingSeats === 0 &&
        result.data[1].remainingSeats === 0 &&
        result.data[2].remainingSeats === 0
      ) {
        $(day.current).addClass('sold-out')
        console.log('soldout')
      }
    })
  }


  function updateCheckList(date, name) {
    let newObj = { ...checkList }
    newObj.chosenDate = date
    newObj.singer = name
    newObj.singerPic = picture
    setCheckList(newObj)
  }
  function clearCheckList() {
    let newObj = { ...checkList }
    newObj.chosenDate = ''
    newObj.singer = ''
    newObj.singerPic = ''
    setCheckList(newObj)
  }

  const day = useRef(null)

  // 切換active樣式
  const [activeDate, setActiveDate] = useState('')

  useEffect(() => {
    if (didMount) {
      window.sessionStorage.setItem('activeDate', activeDate)
    }
  }, [activeDate])

  useEffect(() => {
    // 從歌手頁傳來資料
    if (date === dateFromHome.date){
      $(day.current).addClass('active')
      $(day.current).siblings().removeClass('active')
      $(day.current).parent().siblings().find('.day').removeClass('active')
      //前一頁返回時維持選取
      setActiveDate(dateFromHome.date) 
      // 長條圖
      // let url = `http://localhost:3001/reservation/${dateFromHome.date}`
      // console.log('url:', url)
      getRemainingSeat(dateFromHome.date)
    
      // 帶入checkList
      updateCheckList(dateFromHome.date, dateFromHome.singer)
    }
    // 前頁返回時仍然選取該日期
    let dateInStorage = sessionStorage.getItem('activeDate')
    if (date === dateInStorage) {
      $(day.current).addClass('active')
      // console.log('same', date, dateInStorage)
    }

    setDidMount(true)
    $(day.current).on('click', () => {
      $(day.current).addClass('active')
      $(day.current).siblings().removeClass('active')
      $(day.current).parent().siblings().find('.day').removeClass('active')
    })
    axios.get('http://127.0.0.1:3001/reservation/seat').then((result) => {
      setSeatInfo(result.data)
      // console.log(result.data)
    })
  }, [])

  return (
    <>
      <div
        className="day "
        ref={day}
        onClick={() => {
          getRemainingSeat(date)
          updateCheckList(date, name)
          setActiveDate(date)
        }}
      >
        <div
          className="singer-pic"
          style={{
            background: `url(http://localhost:3000/images/common/${picture}), no-repeat center`,
            backgroundSize: 'cover',
          }}
        ></div>
        <span className="h4 name">{name}</span>
        <span className="h4 date">{newDate}</span>
      </div>
    </>
  )
}
export default Day
