import React from 'react'
import '../../../styles/header/headerSmall.scss'
function DownMenu() {
  return (
    <>
      <div className="down-menu">
        <ul>
          <li>
            <a href="#/">線上訂位</a>
          </li>
          <li>
            <a href="#/">歌手介紹</a>
            <a href="#/">餐點介紹</a>
          </li>
          <li>
            <a href="#/">檢視文章</a>
            <a href="#/">我的評論</a>
          </li>
          <li>
            <a href="#/">Live 直播</a>
            <a href="#/">歌手投票</a>
            <a href="#/">小遊戲</a>
          </li>
          <li>
            <a href="#/">會員資料</a>
            <a href="#/">我的訂位</a>
            <a href="#/">外送訂單</a>
            <a href="#/">折價券</a>
          </li>
          <li>
            <a href="#/">外送訂餐</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DownMenu
