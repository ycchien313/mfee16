import React from 'react'
import '../../styles/comment/hero.scss'

function Hero() {
  return (
    <>
      <div class="hero-section">
        <div class="top-wave">
          <h1 class="h1 title">評論區</h1>
          <img
            class="wave-1"
            src="http://localhost:3000/images/comment/top-wave.svg"
            alt=""
          />
          <img
            class="elfin"
            src="http://localhost:3000/images/comment/elfin.svg"
            alt=""
          />
        </div>
        <div class="slogan">
          <div class="bottom-wave"></div>
        </div>
      </div>
    </>
  )
}

export default Hero
