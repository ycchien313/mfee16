import React from 'react'
import '../../styles/footer/footer.scss'
import WaveOutside from './WaveOutside'
import WaveInside from './WaveInside'
import Dm from './Dm'

function footer() {
  return (
    <>
      <footer className="footer">
        {/* <!-- 手機版電子報 --> */}
        <div className="dm-md">
          <Dm />
        </div>

        <div className="footer-container">
          <WaveOutside />
          <WaveInside />
        </div>
      </footer>
    </>
  )
}

export default footer
