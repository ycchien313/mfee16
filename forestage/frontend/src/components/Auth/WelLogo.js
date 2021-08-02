import React from 'react'

function WelLogo() {
  return (
    <>
      <img
        src={process.env.PUBLIC_URL + '/images/auth/elfin-green.png'}
        className="wel-img"
        alt=""
      />
      <div className="wel-title">
        <h1 className="title-top">Welcome to</h1>
        <img
          src={process.env.PUBLIC_URL + '/images/auth/logo-brown.png'}
          className="title-down"
          alt=""
        />
      </div>
    </>
  )
}

export default WelLogo
