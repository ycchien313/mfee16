import React from 'react'

function Guide(props) {
  console.log(props)
  let content = (
    <div className="liveSide">
      <div className="live">
        <div className="videoBorder">
          <video
            src="./video/pexels-ron-lach-7088391.mp4"
            autoplay
            loop
            muted
          ></video>
        </div>
      </div>
      <div className="liveInfo">
        <button className="live-button">
          <h2>{props.guideTitle}</h2>
        </button>
        <h3>在線上即時看精彩的音樂表演</h3>
        <h4>表演者：　Maroon 5</h4>
        <h4>演出時間：　2021.05.28 18:00</h4>
      </div>
      <div className="pointer">
        <img src="./image/pointer.svg" alt="" />
      </div>
    </div>
  )
  return <>{content}</>
}

export default Guide
