import React, { useEffect, useState } from 'react'
import '../../styles/header/headerBig.scss'
import $ from 'jquery'
import HeaderBigCart from './HeaderBigCart'
function HeaderBig(props) {
  // const [count,setCount] =useState()

  useEffect(() => {
    // 待辦: 取得商品價格、圖片，存到新狀態給到子元件
    // 原狀態
    $('.cart-div').on('click', function () {
      $(this).find('.header-cart').toggleClass('active')
      $('.cart').toggleClass('disabled')
    })
  }, [])
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
              <li className="cart-div">
                <div>
                  <a href="#/" className="header-cart h4">
                    外送訂餐
                  </a>
                </div>
                <div className="header-cartImgAndCircle">
                  <li>
                    <a href="#/" className="header-cartImg">
                      <img
                        src="http://localhost:3000/images/header/shopping-cart-solid.png"
                        alt=""
                        class="cart-image"
                      />
                    </a>
                    <div className="header-circle"></div>
                  </li>
                </div>
              </li>

              <li className="login">
                <a href="#/" className="h4">
                  登入
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="cart disabled">
        {/* <div className="cart-title">
          <div className="cart-detail">
            <h4>Img</h4>
            <h4>Product</h4>
            <h4>Price</h4>
            <h4>Count</h4>
          </div>
        </div> */}
        <div className="cart-list">
          <HeaderBigCart />
          <HeaderBigCart />
          <HeaderBigCart />
          <HeaderBigCart />
          <HeaderBigCart />
          <HeaderBigCart />
          <HeaderBigCart />
        </div>
        <div className="cart-submit">
          <h4>Total</h4>
          <button className="button-orange">送出</button>
        </div>
      </div>
    </>
  )
}

export default HeaderBig
