import React from 'react'

function Hero() {
  return (
    <>
      <div class="hero-section">
        <div class="top-wave">
          <h1 class="h1 title">線上訂位</h1>
          <img
            class="wave-1"
            src="http://localhost:3000/images/reservation/top-wave.svg"
            alt=""
          />
          <img
            class="elfin"
            src="http://localhost:3000/images/reservation/elfin-green.png"
            alt=""
          />
        </div>
        <div class="slogan">
          <div class="bottom-wave"></div>
          <div class="h2 title">預約一個音樂ｘ美食ｘ森林的美好夜晚。</div>
        </div>
      </div>
    </>
  )
}

export default Hero
