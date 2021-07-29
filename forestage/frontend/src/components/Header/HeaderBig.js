import React, { useEffect, useState } from 'react'
import '../../styles/header/headerBig.scss'
import $ from 'jquery'
import HeaderBigCart from './HeaderBigCart'
import HeaderAuth from './HeaderAuth'
function HeaderBig(props) {
  let { item } = props
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCountNum, setTotalCountNum] = useState(0)
  // 於item更新時執行計算總價及總數
  useEffect(() => {
    total()
    totalCount()
  }, [item])
  // 總價計算
  function total() {
    let total = 0
    for (let i = 0; i < item.length; i++) {
      total = total + item[i].price * item[i].count
    }
    console.log(total)
    setTotalPrice(total)
  }
  // 總數計算
  function totalCount() {
    let totalCount = 0
    for (let i = 0; i < item.length; i++) {
      totalCount = totalCount + item[i].count
    }
    console.log(totalCount)
    setTotalCountNum(totalCount)
  }
  useEffect(() => {
    $('.cart-div').on('click', function () {
      $(this).find('.header-cart').toggleClass('active')
      $('.cart-big').toggleClass('disabled')
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
                    <div className="header-circle">{totalCountNum}</div>
                  </li>
                </div>
              </li>

              <li className="login">
                <HeaderAuth />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="cart-big disabled">
        <div className="cart-list">
          {item.length > 0 &&
            item.map(function (value, index) {
              return (
                <HeaderBigCart
                  key={index}
                  name={value.name}
                  price={value.price}
                  count={value.count}
                  img={value.img}
                />
              )
            })}
        </div>
        <div className="cart-submit">
          <h4 class="cart-total">合計: ${totalPrice}</h4>
          <button className="button-orange">下一步</button>
        </div>
      </div>
    </>
  )
}

export default HeaderBig
