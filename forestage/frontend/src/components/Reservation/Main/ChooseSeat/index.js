import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
function ChooseSeat(props) {
  const { seatInfo, seatCount, setSeatCount } = props

  const [didMount, setDidMount] = useState(false)
  const [attendance, setAttendance] = useState({
    1: 0,
    2: 0,
    3: 0,
  })
  const [active, setActive] = useState(false)

  const barInfo = useRef(null)

  useEffect(() => {
    barInfo.current.style.display = 'none'
    setDidMount(true)

    // active 樣式切換
    $('.row').on('click', (e) => {
      $(e.target).closest('.row').addClass('active')
      $(e.target).closest('.row').siblings().removeClass('active')
    })

  }, [])

  useEffect(() => {
    if (didMount) {
      barInfo.current.style.display = 'flex'
    }
  }, [seatCount])

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

  function addAttendance(seatId) {
    const newAttendance = { ...attendance }
    if (seatCount[seatId] > 0) {
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
      console.log(newSeatCount)
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
            <img
              src="http://localhost:3000/images/reservation/active-title.png"
              alt=""
            />
          </div>
          <div class="arrow"></div>
          <h3 class="step three">選擇餐點</h3>
        </div>
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
                    minusAttendance(1)
                  }}
                ></div>
                <input type="number" value={attendance[1]} />
                <div
                  class="plus-button"
                  onClick={() => {
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
                    minusAttendance(2)
                  }}
                ></div>
                <input type="number" value={attendance[2]} />
                <div
                  class="plus-button"
                  onClick={() => {
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
                    minusAttendance(3)
                  }}
                ></div>
                <input type="number" value={attendance[3]} />
                <div
                  class="plus-button"
                  onClick={() => {
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
