import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import ReservationCandidate from '../../../components/Home/ReservationCadidate'
import MobileReservation from '../../../components/Home/MobileReservation'

function SeventhScreen(props) {
  const [calendarResult, setCalendarResult] = useState([])
  const [date, getDate] = useState()
  // 設定座位區狀態
  const [rockSeatState, setRockSeatState] = useState([])
  const [middleSeatState, setMiddleSeatState] = useState([])
  const [backSeatState, setBackSeatState] = useState([])
  // 傳給蕙伃的設定
  const [select, setSelect] = useState({ singer: '', date: '' })
  // 手機板切換按鈕
  const [btnWeek, setBtnWeek] = useState(0)
  useEffect(() => {
    $('.switch-btn').on('click', function () {
      $(this).addClass('switched')
      $(this).siblings().removeClass('switched')
    })
    $('.switch-btn-left').on('click', function () {
      setBtnWeek(0)
    })
    $('.switch-btn-right').on('click', function () {
      setBtnWeek(1)
    })
  }, [])
  useEffect(() => {
    //   抓取表演者行事曆
    $.ajax({
      url: 'http://localhost:3001/home/calendar',
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      // // console.log(result)
      setCalendarResult(result)
    })
    // 抓取剩餘座位
    $.ajax({
      url: `http://localhost:3001/home/seat/rock/${date}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      // // console.log('搖滾區:', result[0])
      setRockSeatState(result[0])
    })
    $.ajax({
      url: `http://localhost:3001/home/seat/middle/${date}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      // // console.log('中區:', result[0])
      setMiddleSeatState(result[0])
    })
    $.ajax({
      url: `http://localhost:3001/home/seat/back/${date}`,
      method: 'GET',
      dataType: 'JSON',
    }).then(function (result) {
      // // console.log('後區', result[0])
      setBackSeatState(result[0])
    })
  }, [date])

  // 處理座位資料
  function handleRockArea() {
    let result = 0
    if (rockSeatState.name !== null) {
      result = 10 - rockSeatState.total
      return result
    } else {
      result = 10
      return result
    }
  }
  function handleMiddleArea() {
    let result = 0
    if (middleSeatState.name !== null) {
      result = 20 - middleSeatState.total
      return result
    } else {
      result = 20
      return result
    }
  }
  function handleBackArea() {
    let result = 0
    if (backSeatState.name !== null) {
      result = 20 - backSeatState.total
      return result
    } else {
      result = 20
      return result
    }
  }

  // 將Ref指定至長條圖參照
  let rock = useRef()
  let middle = useRef()
  let back = useRef()

  // 計算長條圖長度
  // 搖滾區
  let rockWidth = (handleRockArea() / 50) * 100 + '%'
  $(rock.current).css('width', rockWidth)
  // 中區
  let middleWidth = (handleMiddleArea() / 50) * 100 + '%'
  $(middle.current).css('width', middleWidth)
  // 後區
  let backWidth = (handleBackArea() / 50) * 100 + '%'
  $(back.current).css('width', backWidth)
  // 主要內容
  let content = (
    <div id="seventhScreen">
      <div id="reservation">
        <div className="reservation-guide">
          <ul>
            <li>
              <div className="reservation-inner-active">
                <h3>選擇日期</h3>
              </div>
            </li>
            <li>
              <img
                src="http://localhost:3000/images/home/reservation-ul-arrow.svg"
                alt=""
              />
            </li>
            <li>
              <div className="reservation-inner-unselected">
                <h3>選擇座位</h3>
              </div>
            </li>
            <li>
              <img
                src="http://localhost:3000/images/home/reservation-ul-arrow.svg"
                alt=""
              />
            </li>
            <li>
              <div className="reservation-inner-unselected">
                <h3>選擇餐點</h3>
              </div>
            </li>
          </ul>
        </div>
        <div className="left-seat">
          <div className="bar-background">
            <div className="bar-length">
              <div className="rock-bar" ref={rock}></div>
              <div className="rock-bar-end"></div>
              <div className="middle-bar" ref={middle}></div>
              <div className="middle-bar-end"></div>
              <div className="back-bar" ref={back}></div>
              <div className="back-bar-end"></div>
            </div>
          </div>
          <div className="bar-info">
            <span className="title">剩餘座位</span>
            <div className="rock">
              <div className="circle"></div>
              &ensp;
              <p>
                搖滾區 <span>{handleRockArea()}</span> 席
              </p>
            </div>
            <div className="middle">
              <div className="circle"></div>
              &ensp;
              <p>
                中區 <span>{handleMiddleArea()}</span> 席
              </p>
            </div>
            <div className="back">
              <div className="circle"></div>
              &ensp;
              <p>
                後區 <span>{handleBackArea()}</span> 席
              </p>
            </div>
          </div>
        </div>
        <div className="reservation">
          <ul>
            {calendarResult.length > 0 &&
              calendarResult.map(function (value, index) {
                if (index < 5) {
                  return (
                    <ReservationCandidate
                      key={index}
                      name={value.name}
                      date={value.date}
                      setSelect={setSelect}
                      getDate={getDate}
                    />
                  )
                }
              })}
          </ul>
          <div className="reservation-hr"></div>
          <ul>
            {calendarResult.map(function (value, index) {
              if (index >= 5) {
                return (
                  <ReservationCandidate
                    key={index}
                    name={value.name}
                    date={value.date}
                    setSelect={setSelect}
                    getDate={getDate}
                  />
                )
              }
            })}
          </ul>
          <Link
            to={{
              pathname: '/reservation',
              state: { select, prevPath: '/home' },
            }}
          >
            <button className="button-red">
              <h4 className="btn-innerText">下一步</h4>
              <i className="fas fa-arrow-circle-right"></i>
            </button>
          </Link>
        </div>
      </div>
      <div className="mobile-reservation">
        <div className="mobile-reservation-title">
          <ul className="mobile-reservation-ul">
            <li
              className="
                        mobile-reservation-li mobile-reservation-active
                    "
            >
              <h4>選擇日期</h4>
            </li>
            <li className="mobile-reservation-arrow">
              <i className="fas fa-chevron-right"></i>
            </li>
            <li className="mobile-reservation-li">
              <h4>選擇座位</h4>
            </li>
            <li className="mobile-reservation-arrow">
              <i className="fas fa-chevron-right"></i>
            </li>
            <li className="mobile-reservation-li">
              <h4>選擇餐點</h4>
            </li>
          </ul>
          <div className="mobile-reservation-switch-btn">
            <button className="switch-btn switch-btn-left switched">
              本週
            </button>
            <button className="switch-btn switch-btn-right">下週</button>
          </div>
        </div>
        <div className="mobile-reservation-candidates">
          <ul>
            {calendarResult.length > 0 &&
              calendarResult.map(function (value, index) {
                if (btnWeek === 0) {
                  if (index < 5) {
                    return (
                      <MobileReservation
                        key={index}
                        name={value.name}
                        date={value.date}
                        setSelect={setSelect}
                        getDate={getDate}
                      />
                    )
                  }
                } else {
                  if (index >= 5) {
                    return (
                      <MobileReservation
                        key={index}
                        name={value.name}
                        date={value.date}
                        setSelect={setSelect}
                        getDate={getDate}
                      />
                    )
                  }
                }
              })}
          </ul>
        </div>
        <button className="button-red">
          <h4 className="btn-innerText">下一步</h4>
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  )
  return <>{content}</>
}

export default SeventhScreen
