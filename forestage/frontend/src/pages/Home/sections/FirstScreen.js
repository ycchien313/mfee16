import React, { useState, useEffect, useRef } from 'react'
import Aos from 'aos'
function FirstScreen(props) {
  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])
  let { singerName, singerImg, singerDate } = props
  let domain = 'http://localhost:3000/images/common/'
  const [test, setTest] = useState('test')

  // console.log(GsapTarget)
  let FirstScreen = (
    <div id="firstScreen">
      <div className="mask"></div>
      {/* <!-- for mobile device   --> */}
      <div className="mobile-card">
        <div className="mobile-card-title">
          <h1 className="h1">
            在
            <img
              className="sloganLogo"
              src="http://localhost:3000/images/common/BrownLogo.png"
              alt="Brown"
            />
            來一場
            <span className="spanRed h1">音樂</span>與
            <span className="spanRed h1">美食</span>的饗宴
          </h1>
        </div>
        <div className="mobile-card-singer">
          <figure>
            <img src={domain + singerImg} alt="" />
          </figure>
          <div className="today-info">
            <h3>{singerName}</h3>
            <hr />
            <h4>
              表演時間
              <br />
              {singerDate}&ensp;18:00
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- for mobile device end --> */}

      <div className="card">
        <div className="cardTitle h2">近期歌手</div>
        <div className="cardBody" data-aos="flip-down">
          <figure className="singer">
            <img src={domain + singerImg} alt="" />
          </figure>
          <div className="cardInfo">
            <h3 className="cardInfoTitle">{singerName}</h3>
            <hr />
            <h4 className="cardInfoContent">
              表演時間
              <br />
              {singerDate} &ensp;18:00
            </h4>
          </div>
        </div>
      </div>

      <div className="SloganBG">
        <div className="slogan">
          <figure className="sloganElfin">
            <img
              src="http://localhost:3000/images/home/elfin-green.png"
              alt=""
            />
          </figure>
          <div className="sloganContent">
            <h1 className="h1">
              在&ensp;
              <img
                className="sloganLogo"
                src="http://localhost:3000/images/common/BrownLogo.png"
                alt=""
              />
              &ensp;來一場 <span className="spanRed h1">音樂</span>與
              <span className="spanRed h1">美食</span>的饗宴
            </h1>
          </div>
        </div>
        <img
          className="wave"
          src="http://localhost:3000/images/home/SloganBG.png"
          alt=""
        />
      </div>
    </div>
  )
  return <>{FirstScreen}</>
}

export default FirstScreen
