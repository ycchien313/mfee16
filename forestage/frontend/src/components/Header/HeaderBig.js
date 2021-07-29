import React from 'react'
import '../../styles/header/headerBig.scss'
function HeaderBig() {
  return (
    <>
      <div className="main-header">
        <div className="header-container">
          <a href="#/" className="logo">
            <img src="http://localhost:3000/images/header/LOGO.svg" alt="" />
          </a>
          <nav className="header-nav">
            <ul className="header-nav-ul">
              <li>
                <a href="#/" className="h4">
                  線上訂位
                </a>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  餐點介紹
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <a href="#/">歌手介紹</a>
                  </li>
                  <li className="bottom-border-radius">
                    <a href="#/">餐廳介紹</a>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  撰寫評論
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <a href="#/">檢視文章</a>
                  </li>
                  <li className="bottom-border-radius">
                    <a href="#/">我的評論</a>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  互動平台
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <a href="#/">Live直播</a>
                  </li>
                  <li>
                    <a href="#/">歌手投票</a>
                  </li>
                  <li className="bottom-border-radius">
                    <a href="#/">小遊戲</a>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  會員專區
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <a href="#/" className="h4">
                      會員資料
                    </a>
                  </li>
                  <li>
                    <a href="#/">我的訂位</a>
                  </li>
                  <li>
                    <a href="#/">外送訂單</a>
                  </li>
                  <li className="bottom-border-radius">
                    <a href="#/">折價卷</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#/" className="header-cart h4">
                  外送訂餐
                </a>
              </li>
              <div className="header-cartImgAndCircle">
                <li>
                  <a href="#/" className="header-cartImg">
                    <img
                      src="http://localhost:3000/images/header/shopping-cart-solid.png"
                      alt=""
                      className="cart-image"
                    />
                  </a>
                  <div className="header-circle"></div>
                </li>
              </div>
              <li className="login">
                <a href="#/" className="h4">
                  登入
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default HeaderBig
