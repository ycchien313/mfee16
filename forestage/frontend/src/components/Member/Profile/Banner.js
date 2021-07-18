import React from 'react'

function Banner() {
  return (
    <>
      <section className="hero-section">
        <div className="top-wave">
          <div className="title">
            <h1 className="main-title">會員專區</h1>
            <h3 className="sub-title">會員資料</h3>
          </div>
          <img
            className="elfin"
            src={process.env.PUBLIC_URL + '/images/member/elfin-green.png'}
            alt=""
          />
        </div>
      </section>

      {/* <!-- 手機版主視覺 --> */}
      <section className="hero-section-md">
        <div className="hero-container">
          <div className="hero-content">
            <img
              className="elfin"
              src={process.env.PUBLIC_URL + '/images/member/elfin-green.png'}
              alt=""
            />
            <h1 className="title">會員資料</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner
