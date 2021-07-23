import React from 'react'
import Nav from './Nav'
import Social from './Social'
import Dm from './Dm'
import Contact from './Contact'

function WaveInside() {
  return (
    <>
      <div className="footer-wave-inside">
        <div className="col">
          <Nav />
        </div>
        <div className="col">
          <Social />
          <div className="dm-lg">
            <Dm />
          </div>
        </div>
        <div className="col">
          <Contact />
        </div>
      </div>
    </>
  )
}

export default WaveInside
