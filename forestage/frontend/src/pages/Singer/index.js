import React, { useState, useEffect } from 'react'
import $, { ajax } from 'jquery'
import '../../styles/singer/singer.scss'
import SingerInfo from '../../components/Singer/SingerInfo'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
function Singer() {
  // 存取api
  const [style, setStyle] = useState('搖滾')
  const [tag, setTag] = useState([15, 14])
  const [singerInfo, setSingerInfo] = useState([])
  // 將api匯入至state

  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/singer/data/${style}`,
      method: `get`,
      dataType: `json`,
    }).then(function (result) {
      let singerInfoClone = []
      for (let i = 0; i < result.length; i++) {
        if (result[i].type === style) {
          singerInfoClone.push(result[i])
        }
      }
      setSingerInfo(singerInfoClone)
    })
  }, [style])
  useEffect(() => {
    $('.music-tag').on('click', function () {
      $(this).addClass('active')
      $(this).closest('li').siblings().find('.music-tag').removeClass('active')
    })
    let newTag = tag
    console.log('newTag : ', newTag)
    setTag(newTag)
  }, [])
  //
  return (
    <>
      <Header />
      <div className="singer">
        <div class="hero-section">
          <div class="top-wave">
            <h1 class="h1 title">餐廳介紹</h1>
            <h3 class="h3 title">歌手介紹</h3>
            <img
              class="wave-1"
              src="http://localhost:3000/images/singer/top-wave.svg"
              alt=""
            />
            <img
              class="elfin"
              src="http://localhost:3000/images/singer/elfin-green.png"
              alt=""
            />
          </div>
          <div class="slogan">
            <div class="bottom-wave"></div>
            <div class="h2 title">預約一個音樂ｘ美食ｘ森林的美好夜晚。</div>
          </div>
        </div>
        <main>
          <div class="singer">
            <div class="tag">
              <ul class="tag-ul">
                <li>
                  <div
                    class="rock music-tag active"
                    onClick={function () {
                      setStyle('搖滾')
                      setTag([15, 14])
                    }}
                  >
                    <img
                      class="rock-tag "
                      src="http://localhost:3000/images/singer/rock.svg"
                      alt=""
                    />
                    <span class="title-text">搖滾</span>
                  </div>
                </li>
                <li>
                  <div
                    class="jazz music-tag"
                    onClick={function () {
                      setStyle('爵士')
                      setTag([11, 12])
                    }}
                  >
                    <img
                      class="jazz-tag"
                      src="http://localhost:3000/images/singer/jazz.svg"
                      alt=""
                    />
                    <span class="title-text">爵士</span>
                  </div>
                </li>
                <li>
                  <div
                    class="lyrical music-tag"
                    onClick={function () {
                      setStyle('抒情')
                      setTag([10, 12])
                    }}
                  >
                    <img
                      class="lyrical-tag"
                      src="http://localhost:3000/images/singer/lyrical.svg"
                      alt=""
                    />
                    <span class="title-text">抒情</span>
                  </div>
                </li>
              </ul>
            </div>
            <SingerInfo singerInfo={singerInfo} style={style} tag={tag} />
            <div class="btn">
              <div class="guide-button orange">
                去投票
                <img
                  src="http://localhost:3000/images/singer/arrow-circle-right-solid.svg"
                  alt=""
                />
              </div>
              <div class="guide-button pink">
                線上訂位
                <img
                  src="http://localhost:3000/images/singer/arrow-circle-right-solid.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
export default Singer
