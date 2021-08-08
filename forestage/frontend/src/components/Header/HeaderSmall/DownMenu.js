import React from 'react'
import '../../../styles/header/headerSmall.scss'
import { HashLink as Link } from 'react-router-hash-link'

function DownMenu() {
  return (
    <>
      <div className="down-menu">
        <ul>
          <li>
            <Link to="/reservation#">線上訂位</Link>
          </li>
          <li>
            <Link to="/singer#">歌手介紹</Link>
            <Link to="/dish#">餐點介紹</Link>
          </li>
          <li>
            <Link to="/comment#">檢視文章</Link>
            <Link to="/comment/myComment#">我的評論</Link>
          </li>
          <li>
            <Link to="/#secondScreen">Live 直播</Link>
            <Link to="/#fourthScreen">歌手投票</Link>
            <Link to="/game#">小遊戲</Link>
          </li>
          <li>
            <Link to="/member#">會員資料</Link>
            <Link to="/member/reservation#">我的訂位</Link>
            <Link to="/member/delivery#">外送訂單</Link>
            <Link to="/member/coupon#">折價券</Link>
          </li>
          <li>
            <Link to="/delivery#">外送訂餐</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default DownMenu
