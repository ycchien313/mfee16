import React from 'react'
import { Link } from 'react-router-dom'
import '../../../styles/header/headerSmall.scss'
function DownMenu() {
  return (
    <>
      <div className="down-menu">
        <ul>
          <li>
            <Link to={{ pathname: '/reservation' }}>線上訂位</Link>
          </li>
          <li>
            <Link to={{ pathname: '/singer' }}>歌手介紹</Link>
            <Link to={{ pathname: '/dish' }}>餐點介紹</Link>
          </li>
          <li>
            <Link to={{ pathname: '/comment' }}>檢視文章</Link>
            <Link to={{ pathname: '/comment' }}>我的評論</Link>
          </li>
          <li>
            <Link to={{ pathname: '/' }}>Live 直播</Link>
            <Link to={{ pathname: '/' }}>歌手投票</Link>
            <Link to={{ pathname: '/game' }}>小遊戲</Link>
          </li>
          <li>
            <Link to={{ pathname: '/member' }}>會員資料</Link>
            <Link to={{ pathname: '/member/reservation' }}>我的訂位</Link>
            <Link to={{ pathname: '/member/delivery' }}>外送訂單</Link>
            <Link to={{ pathname: '/member/coupon' }}>折價券</Link>
          </li>
          <li>
            <Link to={{ pathname: '/delivery' }}>外送訂餐</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DownMenu
