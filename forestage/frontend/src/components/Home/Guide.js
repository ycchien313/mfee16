import React, { useState } from 'react'
import { YoutubeDataAPI } from 'youtube-v3-api'
function Guide(props) {
  let { guideButton, leftVision, guideIndex, guideTitle, guideContent } = props
  const [liveID, setLiveID] = useState('')
  // 取得直播網址
  const API_KEY = 'AIzaSyAz3DUfZIGUbtjyewe4PtALEyyAIZ19DTE'

  const api = new YoutubeDataAPI(API_KEY)

  api.searchAll(`Elfin 詹宜諺`, 1).then(function (result) {
    setLiveID(result.items[0].id.videoId)
  })
  //
  let leftContent = [
    <iframe
      width="424"
      height="240"
      src={`https://www.youtube.com/embed/${liveID}`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      autoPlay="1"
    ></iframe>,

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
