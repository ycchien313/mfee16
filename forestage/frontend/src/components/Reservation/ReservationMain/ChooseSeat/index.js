import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Tween } from 'react-gsap'

function ChooseSeat(props) {
  const {
    seatInfo,
    seatCount,
    setSeatCount,
    checkList,
    setCheckList,
    remainingSeat,
    reservationHistory,
    dataFromMember,
  } = props

  const [didMount, setDidMount] = useState(false)
  const [attendance, setAttendance] = useState({})
  const [fromHistory, setFromHistory] = useState(true)

  const barInfo = useRef(null)
  // 判斷sessionStorage中是否有此資料
  const checkAttendance = Boolean(sessionStorage.getItem('attendance'))

  useEffect(() => {
    if (didMount) {
      window.sessionStorage.setItem('attendance', JSON.stringify(attendance))
    }
  }, [attendance])

  useEffect(() => {
    // 若sessionStorage內沒有訂位人數資料，則指定各區人數為0
    if (checkAttendance === false) {
      let newAttendance = { ...attendance }
      newAttendance[1] = 0
      newAttendance[2] = 0
      newAttendance[3] = 0
      setAttendance(newAttendance)
    } else {
      // 若sessionStorage中有訂位人數資料，則帶入state中
      let newAttendance = JSON.parse(sessionStorage.getItem('attendance'))
      let keyArr = Object.keys(newAttendance)
      let newObj = {}
      keyArr.forEach((v) => {
        newObj[+v] = newAttendance[v]
      })
      // console.log(newObj)
      setAttendance(newObj)
    }
  }, [])

  // active 樣式切換
  useEffect(() => {
    barInfo.current.style.display = 'none'
    setDidMount(true)

    $('.row').on('click', function () {
      $(this).closest('.row').addClass('active')
      $(this).closest('.row').siblings().removeClass('active')
    })
  }, [])

  // 顯示剩餘座位長條圖
  useEffect(() => {
    if (didMount) {
      barInfo.current.style.display = 'flex'
    }
  }, [seatCount])

  // 更新checkList座位區 & 人數
  useEffect(() => {
    if (didMount) {
      const seatIdArr = Object.keys(attendance)
      // console.log(seatIdArr)
      seatIdArr.forEach((seatId) => {
        updateCheckList(parseInt(seatId))
        // console.log(seatId, 'seatId')
      })
    }
  }, [attendance])

  useEffect(() => {
    // 待加上location條件
    // 將歷史訂單訂位人數帶入
    if (
      didMount &&
      fromHistory &&
      dataFromMember.prevPath === '/member/reservation'
    ) {
      let newAttendance = { ...attendance }
      newAttendance[reservationHistory.reservationInfo.seat_id] =
        reservationHistory.reservationInfo.attendance
      setAttendance(newAttendance)
      setFromHistory(false)
    }
  }, [reservationHistory])

  // 減號按鈕
  function minusAttendance(seatId) {
    const newAttendance = { ...attendance }
    newAttendance[seatId] > 0
      ? (newAttendance[seatId] -= 1)
      : (newAttendance[seatId] = 0)
    setAttendance(newAttendance)
    const newSeatCount = { ...seatCount }
    if (attendance[seatId] > 0) {
      newSeatCount[seatId] += 1
      setSeatCount(newSeatCount)
    }
  }

  // 加號按鈕
  function addAttendance(seatId) {
    const newAttendance = { ...attendance }
    // console.log(newAttendance)
    // console.log('ifseatcount', seatCount[seatId])
    // 已選擇日期後才可以加人數
    if (seatCount[seatId] > 0 && checkList.chosenDate !== '') {
      for (let id = 1; id <= 3; id++) {
        if (id === seatId) {
          newAttendance[seatId] += 1
        } else {
          newAttendance[id] = 0
          setSeatCount((seatCount[id] += attendance[id]))
        }
      }
      setAttendance(newAttendance)
    }
    const newSeatCount = { ...seatCount }
    if (seatCount[seatId] > 0) {
      newSeatCount[seatId] -= 1
      setSeatCount(newSeatCount)
      // console.log(newSeatCount)
    }
  }

  // 更新checkList座位區 & 人數 & 低銷金額
  async function updateCheckList(seatId) {
    let newObj = { ...checkList }
    let seat = {}
    if (attendance[seatId] > 0 && seatInfo.length > 0) {
      // console.log(seatInfo,"sinfo")
      seat = await seatInfo.find((item) => {
        // console.log(item.name, 'item') //有印出
        return item.seat_id === seatId
      })
      newObj.seatArea = seat.name
      newObj.attendance = attendance[seatId]
      newObj.minOrder = attendance[seatId] * seat.minimum_order
      newObj.seatId = seatId
    } else if (attendance[seatId] === 0) {
      newObj.seatArea = ''
      newObj.attendance = 0
      newObj.minOrder = 0
    }
    setCheckList(newObj)
  }

  // 驗證是否已經選擇日期(sweetalert)
  const checkDateSwal = withReactContent(Swal)
  function checkDate() {
    if (checkList.chosenDate === '') {
      checkDateSwal.fire({
        title: <h3>請先選擇日期</h3>,
        icon: 'warning',
        confirmButtonColor: '#97bc78',
        buttonsStyling: false,
      })
    }
  }

  return (
    <>
      <section class="choose-seat">
        <div class="steps">
          <h3 class="step one">選擇日期</h3>
          <div class="arrow"></div>
          <div class="active">
            <h3 class="step two">選擇座位</h3>
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
                  start: '1300px center',
                  end: '1800px center',
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
          <div class="arrow"></div>
          <h3 class="step three">選擇餐點</h3>
        </div>
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
              start: '1300px center',
              end: '1800px center',
              scrub: 1,
              markers: false,
            },
          }}
        >
          <div class="seats-background">
            <div class="stage h4">舞台區</div>
            <div class="rock row">
              {/* <div class="rock row active"> */}
              <div class="seat-row">
                <div class="tables">
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="seat-info">
                <h3>搖滾區</h3>
                <span>低銷金額 $ 1000</span>
                <div class="button-group">
                  <div
                    class="minus-button"
                    onClick={() => {
                      checkDate()
                      minusAttendance(1)
                    }}
                  ></div>
                  <input
                    type="number"
                    value={attendance[1] ? attendance[1] : 0}
                  />
                  <div
                    class="plus-button"
                    onClick={() => {
                      checkDate()
                      addAttendance(1)
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="middle row">
              <div class="seat-row">
                <div class="tables">
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="seat-info">
                <h3>中區&nbsp;</h3>
                <span>低銷金額 &nbsp;$ 600</span>
                <div class="button-group">
                  <div
                    class="minus-button"
                    onClick={() => {
                      checkDate()
                      minusAttendance(2)
                    }}
                  ></div>
                  <input
                    type="number"
                    value={attendance[2] ? attendance[2] : 0}
                  />
                  <div
                    class="plus-button"
                    onClick={() => {
                      checkDate()
                      addAttendance(2)
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="back row">
              <div class="seat-row">
                <div class="tables">
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                  <img
                    src="http://localhost:3000/images/reservation/table.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="seat-info">
                <h3>後區&nbsp;</h3>
                <span>低銷金額 &nbsp;$ 400</span>
                <div class="button-group">
                  <div
                    class="minus-button"
                    onClick={() => {
                      checkDate()
                      minusAttendance(3)
                    }}
                  ></div>
                  <input
                    type="number"
                    value={attendance[3] ? attendance[3] : 0}
                  />
                  <div
                    class="plus-button"
                    onClick={() => {
                      checkDate()
                      addAttendance(3)
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div class="bar-info under" ref={barInfo}>
              <span class="title">剩餘座位</span>
              <div class="rock">
                <div class="circle"></div>
                <p>
                  搖滾區 <span>{seatCount[1]}</span> 席
                </p>
              </div>
              <div class="middle">
                <div class="circle"></div>
                <p>
                  中區 <span>{seatCount[2]}</span> 席
                </p>
              </div>
              <div class="back">
                <div class="circle"></div>
                <p>
                  後區 <span>{seatCount[3]}</span> 席
                </p>
              </div>
            </div>
          </div>
        </Tween>
      </section>
      {/* 滑鼠滾輪 */}
      <div class="center-con">
        <div class="cta">
          <div class="down-arrow primera next "></div>
          <div class="down-arrow segunda next "></div>
        </div>
      </div>
    </>
  )
}

export default ChooseSeat
