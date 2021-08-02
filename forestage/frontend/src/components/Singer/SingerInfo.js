import React from 'react'
import Card from './Card'

function SingerInfo(props) {
  let { singerInfo } = props
  return (
    <>
      <div class="singer-title h2">{singerInfo[0].type}歌手</div>
      <div class="introduction-all">
        <div class="maroon5">
          <img class="singerimg" src="/Header/images/maroon5.jpg" alt="" />
        </div>
        <div class="introduction-text1">
          <div class="introduction">
            <div class="introduction-title">
              <div class="h3">{singerInfo[0].name}</div>
            </div>
            <div class="assess h4">
              <div className="star">
                <div className="empty_star">★★★★★</div>
                <div className="full_star">★★★★★</div>
              </div>
              (382)
            </div>
          </div>
          <div class="link-top"></div>
          <div class="introduction-content">{singerInfo[0].introduction}</div>
        </div>
      </div>
      <div class="comment">
        <div class="comment-bar">
          <div class="left-btn">
            <img class="btn-l" src="/Header/images/btn-left.svg" alt="" />
          </div>
          <ul class="comment-content"></ul>
          <div class="right-btn">
            <img class="btn-r" src="/Header/images/btn-right.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="introduction-all">
        <div class="introduction-text2">
          <div class="introduction">
            <div class="introduction-title">
              <div class="h3">{singerInfo[1].name}</div>
            </div>
            <div class="assess h4">
              <img src="/Header/images/five_star.png" alt="" />
              (382)
            </div>
          </div>
          <div class="link-top"></div>
          <div class="introduction-content">{singerInfo[1].introduction}</div>
        </div>
        <div class="linkinpark">
          <img class="singerimg" src="/Header/images/林肯公園.jpg" alt="" />
        </div>
      </div>
      <div class="comment">
        <div class="comment-bar">
          <div class="left-btn">
            <img class="btn-l" src="/Header/images/btn-left.svg" alt="" />
          </div>
          <ul class="comment-content">
            <Card />
          </ul>
          <div class="right-btn">
            <img class="btn-r" src="/Header/images/btn-right.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
export default SingerInfo
