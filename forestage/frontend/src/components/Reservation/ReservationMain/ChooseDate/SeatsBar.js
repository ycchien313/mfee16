import React, { useEffect, useRef, useState } from 'react'
function SeatsBar(props) {
  const [didMount, setDidMount] = useState(false)
  const { seatInfo, remainingSeat, setRemainingSeat, seatCount, setSeatCount } =
    props

  const rockBar = useRef(null)
  const middleBar = useRef(null)
  const backBar = useRef(null)
  const barLength = useRef(null)
  const leftSeat = useRef(null)
  const barBackground = useRef(null)

  useEffect(() => {
    setDidMount(true)
    leftSeat.current.style.display = 'none'
  }, [])

  useEffect(() => {
    if (didMount) {
      // 點擊後顯示長條圖
      leftSeat.current.style.display = 'block'
      let seatWidthInPx = ''
      let totalRemainingSeat = 0
      let totalSeat = 0
      // 找出瀏覽器寬度
      let vw = document.documentElement.clientWidth / 100

      // 計算總座位數
      seatInfo.forEach((item) => {
        totalSeat += item.totalSeats
      })

      // 計算各區長條圖長度
      seatInfo.forEach((item) => {
        totalRemainingSeat += seatCount[item.seat_id]
        switch (item.seat_id) {
          case 1:
            seatWidthInPx =
              seatCount[1] / totalSeat > 0
                ? (seatCount[1] / totalSeat) *
                    barBackground.current.offsetWidth -
                  1.5 * vw +
                  'px'
                : 0 + 'px' //避免產生負數
            rockBar.current.style.width = seatWidthInPx
            break
          case 2:
            seatWidthInPx =
              seatCount[2] / totalSeat > 0
                ? (seatCount[2] / totalSeat) *
                    barBackground.current.offsetWidth -
                  1.5 * vw +
                  'px'
                : 0 + 'px'
            middleBar.current.style.width = seatWidthInPx
            break
          case 3:
            seatWidthInPx =
              seatCount[3] / totalSeat > 0
                ? (seatCount[3] / totalSeat) *
                    barBackground.current.offsetWidth -
                  1.5 * vw +
                  'px'
                : 0 + 'px'
            backBar.current.style.width = seatWidthInPx
            break
          default:
            break
        }
      })

      // 長條圖總長度
      let totalBarLength =
        parseInt(rockBar.current.style.width) +
        parseInt(middleBar.current.style.width) +
        parseInt(backBar.current.style.width) +
        'px'

      // 扣除尾端波浪長度
      barLength.current.style.width = `calc(${totalBarLength} - 2.6vw)`

    }
  }, [seatCount])

  return (
    <>
      <div className="left-seat" ref={leftSeat}>
        <div className="bar-background" ref={barBackground}>
          <div className="bar-length" ref={barLength}>
            <div className="rock-bar" ref={rockBar}></div>
            <div className="rock-bar-end"></div>
            <div className="middle-bar" ref={middleBar}></div>
            <div className="middle-bar-end"></div>
            <div className="back-bar" ref={backBar}></div>
            <div className="back-bar-end"></div>
          </div>
        </div>
        <div className="bar-info">
          <span className="title">剩餘座位</span>
          <div className="rock">
            <div className="circle"></div>
            <p>
              搖滾區 <span>{seatCount[1]}</span> 席
            </p>
          </div>
          <div className="middle">
            <div className="circle"></div>
            <p>
              中區 <span>{seatCount[2]}</span> 席
            </p>
          </div>
          <div className="back">
            <div className="circle"></div>
            <p>
              後區 <span>{seatCount[3]}</span> 席
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default SeatsBar
