import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import moment from 'moment'
import Guide from '../../../components/Home/Guide'
function SecondScreen(props) {
  const { singerName } = props
  let current = moment().format('YYYY.MM.DD')
  // Guide內的state設定
  const [guideButton, setGuideButton] = useState('點擊參加live直播')
  const [leftVision, setLeftVision] = useState('/images/home/live-video.mp4')
  const [guideIndex, setGuideIndex] = useState(0)
  const [guideTitle, setGuideTitle] = useState('在線上即時看精彩的音樂表演')
  const [guideContent, setGuideContent] = useState([])

  // component Did mount
  useEffect(() => {
    // hover
    $('.guide-li button').on(
      'hover',
      function () {
        $(this).find('img').css({
          opacity: 1,
          width: '75px',
          height: '75px',
        })
      },
      function () {
        $(this).find('img').css({
          opacity: 0.4,
          width: '70px',
          height: '70px',
        })
      }
    )
    // active
    $('.guide-li button').on('click', function () {
      $(this).find('img').addClass('active')

      $(this).closest('li').siblings().find('img').removeClass('active')
    })
  }, [])
  //
  useEffect(() => {
    setGuideContent([`表演者：　${singerName}`, `演出時間：　${current} 18:00`])
  }, [singerName])

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
                  setGuideButton('點擊參加live直播')
                  setLeftVision('/images/home/live-video.mp4')
                  setGuideIndex(0)
                  setGuideContent([
                    `表演者：　${singerName}`,
                    `演出時間：　${current} 18:00`,
                  ])
                  setGuideTitle('在線上即時看精彩的音樂表演')
                }}
              >
                <div className="li-inner">
                  <img
                    src="http://localhost:3000/images/home/guideSVG/live.svg"
                    alt=""
                    className="active"
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
                  setGuideButton('前往投票')
                  setLeftVision('/images/home/vote-img.png')
                  setGuideIndex(1)
                  setGuideContent(['有喜歡的歌手嗎?', '馬上前往投票吧!'])
                  setGuideTitle('參與我們的投票活動，決定出你喜歡的表演者吧!')
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
              <button
                onClick={() => {
                  setGuideButton('來場音樂測驗')
                  setLeftVision('/images/home/game-img.png')
                  setGuideIndex(2)
                  setGuideContent(['對投票沒想法嗎?', '來場小測驗吧!'])
                  setGuideTitle('透過音樂測驗得出你喜愛的音樂種類及推薦歌手')
                }}
              >
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
              <button
                onClick={() => {
                  setGuideButton('前往訂位')
                  setLeftVision('/images/home/reservation-video.mp4')
                  setGuideIndex(3)
                  setGuideContent(['座位有限', '立即來場讓你難忘的音樂盛宴吧'])
                  setGuideTitle('立即線上訂位')
                }}
              >
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
      <Guide
        guideButton={guideButton}
        leftVision={leftVision}
        guideIndex={guideIndex}
        guideTitle={guideTitle}
        guideContent={guideContent}
      />
    </div>
  )
  return <>{SecondScreen}</>
}

export default SecondScreen
