import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <>
      <nav className="nav h4">
        <ul>
          <li>
            <NavLink className="nav-link" to="/reservation">
              線上訂位
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="nav-link" to="/singer">
              歌手介紹
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/dish">
              餐點介紹
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="nav-link" to="/comment">
              撰寫評論
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="nav-link" to="/home">
              Live直播
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/home">
              歌手投票
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/home">
              小遊戲
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="nav-link" to="/member">
              會員資料
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/member/reservation">
              我的訂位
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/member/delivery">
              外送訂單
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/member/coupon">
              折價券
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink className="nav-link" to="/delivery">
              外送訂餐
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Nav
