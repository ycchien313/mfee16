import React, { useEffect, useState } from 'react'
import $ from 'jquery'

function Guide(props) {
  let {
    guideButton,
    leftVision,
    guideIndex,
    guideTitle,
    guideContent,
    guideURL,
    liveID,
  } = props

  //
  let leftContent = [
    <iframe
      width="100%"
      height="100%"
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
        <button
          className="live-button"
          onClick={function () {
            {
              guideIndex === 0
                ? (document.location.href = `${guideURL + liveID}`)
                : (document.location.href = `${guideURL}`)
            }
          }}
        >
          <h2>{guideButton}</h2>
        </button>

        <h3>{guideTitle}</h3>
        <h4>{guideContent[0]}</h4>
        <h4>{guideContent[1]}</h4>
      </div>
      <div className="pointer">
        <img src="http://localhost:3000/images/home/pointer.svg" alt="" />
      </div>
      <div className="desktop-live">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${liveID}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          autoPlay="1"
        ></iframe>
      </div>
    </div>
  )
  return <>{content}</>
}

export default Guide
