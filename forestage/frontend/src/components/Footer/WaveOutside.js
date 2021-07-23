import React from 'react'

function WaveOutside() {
  return (
    <>
      <div className="footer-wave-outside">
        <div className="col">
          <figure className="figure-elfin">
            <img
              className="elfin"
              src={process.env.PUBLIC_URL + '/images/footer/elfin-green.png'}
              alt=""
            />
          </figure>
          <figure className="figure-logo">
            <img
              className="logo"
              src={process.env.PUBLIC_URL + '/images/footer/logo-brown.png'}
              alt=""
            />
          </figure>
        </div>
      </div>
    </>
  )
}

export default WaveOutside
