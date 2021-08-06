import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/header/headerSmall.scss'
function DownMenu() {
  return (
    <>
      <div className="down-menu">
        <ul>
          <li>
            <Link to={{ pathname: '/reservation' }}>
              <a href="#/">線上訂位</a>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/singer' }}>
              <a href="#/">歌手介紹</a>
            </Link>
            <Link to={{ pathname: '/dish' }}>
              <a href="#/">餐點介紹</a>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/comment' }}>
              <a href="#/">檢視文章</a>
            </Link>
            <Link to={{ pathname: '/comment' }}>
              <a href="#/">我的評論</a>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/' }}>
              <a href="#/">Live 直播</a>
            </Link>
            <Link to={{ pathname: '/' }}>
              <a href="#/">歌手投票</a>
            </Link>
            <Link to={{ pathname: '/game' }}>
              <a href="#/">小遊戲</a>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/member' }}>
              <a href="#/">會員資料</a>
            </Link>
            <Link to={{ pathname: '/member/reservation' }}>
              <a href="#/">我的訂位</a>
            </Link>
            <Link to={{ pathname: '/member/delivery' }}>
              <a href="#/">外送訂單</a>
            </Link>
            <Link to={{ pathname: '/member/coupon' }}>
              <a href="#/">折價券</a>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: '/reservation' }}>
              <a href="#/">外送訂餐</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DownMenu
