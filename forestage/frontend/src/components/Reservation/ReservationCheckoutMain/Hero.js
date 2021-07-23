import React from 'react'
function Hero() {
  return (
    <>
      <div className="reservation-checkout hero-section">
        <div className="top-wave">
          <h1 className="h1 title">線上訂位</h1>
          <h3 className="h3 title">確認訂位</h3>
          <img
            className="wave-1"
            src="http://localhost:3000/images/reservation/res_checkout/top-wave.svg"
            alt=""
          />
          <img
            className="elfin"
            src="http://localhost:3000/images/reservation/res_checkout/elfin-green.png"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default Hero
