import React, { useEffect, useRef, useState } from 'react'
function SeatsBar(props) {
  const [didMount, setDidMount] = useState(false)
  const { seatInfo, remainingSeat, setRemainingSeat, seatCount, setSeatCount } =
    props
  // console.log(typeof seatInfo)
  // console.log(seatInfo, 'seatinfo')
  // console.log(seatInfo[0])
  // console.log(remainingSeat)

  const rockBar = useRef(null)
  const middleBar = useRef(null)
  const backBar = useRef(null)
  const barLength = useRef(null)
  const leftSeat = useRef(null)

  useEffect(() => {
    setDidMount(true)
    leftSeat.current.style.display = 'none'
  }, [])

  useEffect(() => {
    if (didMount) {
      leftSeat.current.style.display = 'block'
      let seatPercent = ''
      let totalRemainingSeat = 0
      let totalSeat = 0

      // 計算總座位數
      seatInfo.forEach((item) => {
        totalSeat += item.totalSeats
      })

      // 計算各區長條圖長度
      seatInfo.forEach((item) => {
        totalRemainingSeat += seatCount[item.seat_id]
        switch (item.seat_id) {
          case 1:
            seatPercent = (seatCount[1] / totalSeat) * 100 + '%'
            rockBar.current.style.width = seatPercent
            break
          case 2:
            seatPercent = (seatCount[2] / totalSeat) * 100 + '%'
            middleBar.current.style.width = seatPercent
            break
          case 3:
            seatPercent = (seatCount[3] / totalSeat) * 100 + '%'
            backBar.current.style.width = seatPercent
            break
          default:
            break
        }
      })
      // 長條圖總長度
      let totalBarLength = (totalRemainingSeat / totalSeat) * 100 + '%'
      barLength.current.style.width = totalBarLength
    }
  }, [seatCount])

  return (
    <>
      <div className="left-seat" ref={leftSeat}>
        <div className="bar-background">
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
