import React from 'react'
function SeatsBar(props) {
  const { seatInfo, remainingSeat, setRemainingSeat } = props
  // console.log(seatInfo)
  // console.log(seatInfo[0])
  // console.log(seatInfo[0].name)
  console.log(remainingSeat)

  return (
    <>
      <div className="left-seat">
        <div className="bar-background">
          <div className="rock-bar"></div>
          <div className="rock-bar-end"></div>
          <div className="middle-bar"></div>
          <div className="middle-bar-end"></div>
          <div className="back-bar"></div>
          <div className="back-bar-end"></div>
        </div>
        <div className="bar-info">
          <span className="title">剩餘座位</span>
          <div className="area-1">
            <div className="circle"></div>
            <p>
              搖滾區 <span>5</span> 席
            </p>
          </div>
          <div className="area-2">
            <div className="circle"></div>
            <p>
              中區 <span>5</span> 席
            </p>
          </div>
          <div className="area-3">
            <div className="circle"></div>
            <p>
              後區 <span>5</span> 席
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default SeatsBar
