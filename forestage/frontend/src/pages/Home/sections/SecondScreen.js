import React, { useState } from 'react'
import Guide from './Components/Guide'
function SecondScreen() {
  // Guide內的state設定
  const [guideTitle, setGuideTitle] = useState('點擊參加live直播')
  const [leftVision, setLeftVision] = useState()
  //
  let SecondScreen = (
    <div id="secondScreen">
      <h2 className="title">網站導覽</h2>
      <nav className="guideNav">
        <ul>
          <li>
            <div className="guide-li">
              <button
                onClick={() => {
                  setGuideTitle('點擊參加live直播')
                }}
              >
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/live.svg"
                    alt=""
                  />
                  <h3 className="h3">live直播</h3>
                </div>
              </button>
            </div>
          </li>
          <li>
            <div className="guide-li">
              <button
                onClick={() => {
                  setGuideTitle('本日嘉賓')
                }}
              >
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/star.svg"
                    alt=""
                  />
                  <h3 className="h3">請誰來表演</h3>
                </div>
              </button>
            </div>
          </li>
          <li>
            <div className="guide-li">
              <button>
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/game.svg"
                    alt=""
                  />
                  <h3 className="h3">音樂遊戲</h3>
                </div>
              </button>
            </div>
          </li>
          <li>
            <div className="guide-li">
              <button>
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/booking.svg"
                    alt=""
                  />
                  <h3 className="h3">線上訂位</h3>
                </div>
              </button>
            </div>
          </li>
          <li>
            <div className="guide-li">
              <button>
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/forum.svg"
                    alt=""
                  />
                  <h3 className="h3">撰寫評論</h3>
                </div>
              </button>
            </div>
          </li>
          <li>
            <div className="guide-li">
              <button>
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/delivery.svg"
                    alt=""
                  />
                  <h3 className="h3">外送訂餐</h3>
                </div>
              </button>
            </div>
          </li>
        </ul>
      </nav>
      <Guide guideTitle={guideTitle} />
    </div>
  )
  return <>{SecondScreen}</>
}

export default SecondScreen
