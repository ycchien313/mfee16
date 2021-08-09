import React, { useEffect } from 'react'
import Aos from 'aos'
function FivethScreen(props) {
  useEffect(() => {
    Aos.init({ duration: 200 })
  }, [])
  let content = (
    <div id="fivthScreen">
      <div class="points"></div>
      <h2>
        沒有想法?
        <br />
        來一場音樂遊戲吧!
      </h2>
      <div
        class="music-game"
        onClick={() => {
          document.location.href = 'http://localhost:3000/game'
        }}
        data-aos="zoom-in"
      >
        <figure>
          <img src="http://localhost:3000/images/home/piano.jpeg" alt="" />
        </figure>
      </div>
      <div class="points"></div>
    </div>
  )

  return <>{content}</>
}

export default FivethScreen
