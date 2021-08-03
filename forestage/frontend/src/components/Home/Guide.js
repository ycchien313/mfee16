import React from 'react'

function Guide(props) {
  let { guideButton, leftVision, guideIndex, guideTitle, guideContent } = props

  let leftContent = [
    <video
      src={'http://localhost:3000' + leftVision}
      autoPlay
      loop
      muted
    ></video>,
    <figure>
      <img src={'http://localhost:3000' + leftVision} alt="" />,
    </figure>,
    <figure>
      <img src={'http://localhost:3000' + leftVision} alt="" />,
    </figure>,
    <video
      src={'http://localhost:3000' + leftVision}
      autoPlay
      loop
      muted
    ></video>,
  ]
  let content = (
    <div className="liveSide">
      <div className="live">
        <div className="videoBorder">{leftContent[guideIndex]}</div>
      </div>
      <div className="liveInfo">
        <button className="live-button">
          <h2>{guideButton}</h2>
        </button>
        <h3>{guideTitle}</h3>
        <h4>{guideContent[0]}</h4>
        <h4>{guideContent[1]}</h4>
      </div>
      <div className="pointer">
        <img src="http://localhost:3000/images/home/pointer.svg" alt="" />
      </div>
    </div>
  )
  return <>{content}</>
}

export default Guide
