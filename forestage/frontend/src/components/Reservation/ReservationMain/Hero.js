import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function Hero() {
  const flyElfin = useRef(null)
  useEffect(() => {
    gsap.fromTo(
      flyElfin.current,
      { y: -300, duration: 4, ease: 'bounce.out' },
      { y: 0, duration: 2,  ease: 'bounce.out'}
    )
  }, [])
  return (
    <>
      <div className="hero-section reservation">
        <div className="top-wave">
          <h1 className="h1 title">線上訂位</h1>
          <img
            className="wave-1"
            src="http://localhost:3000/images/reservation/top-wave.svg"
            alt=""
          />
          <img
            ref={flyElfin}
            className="elfin"
            src="http://localhost:3000/images/reservation/elfin-green.png"
            alt=""
          />
        </div>
        <div className="slogan">
          <div className="bottom-wave"></div>
          <div className="h2 title">預約一個音樂ｘ美食ｘ森林的美好夜晚。</div>
        </div>
      </div>
    </>
  )
}

export default Hero
