import React, { useEffect, useState } from 'react'
import '../../styles/header/headerBig.scss'
import $ from 'jquery'
import HeaderBigCart from './HeaderBigCart'
import HeaderAuth from './HeaderAuth'
import { Link } from 'react-router-dom'

function HeaderBig(props) {
  let { cartList } = props
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCountNum, setTotalCountNum] = useState(0)
  // header收起與顯示

  // 於父母給予新資料時更新時執行計算總價及總數
  useEffect(() => {
    total()
    totalCount()
  }, [cartList])
  // 總價計算
  function total() {
    let total = 0
    for (let i = 0; i < cartList.length; i++) {
      total = total + cartList[i].price * cartList[i].count
    }
    // console.log(total)
    setTotalPrice(total)
  }
  // 總數計算
  function totalCount() {
    let totalCount = 0
    for (let i = 0; i < cartList.length; i++) {
      totalCount = totalCount + cartList[i].count
    }
    // console.log(totalCount)
    setTotalCountNum(totalCount)
  }
  useEffect(() => {
    $('.cart-li').on('click', function () {
      // $(this).find('.header-cart').toggleClass('active')
      $('.cart-big').toggleClass('disabled')
    })
  }, [])
  return (
    <>
      <div className="main-header">
        <div className="header-container">
          <a href="#/" className="logo">
            <Link to={{ pathname: '/' }}>
              <img src="http://localhost:3000/images/header/LOGO.svg" alt="" />
            </Link>
          </a>

          <nav className="header-nav">
            <ul className="header-nav-ul">
              <li>
                <Link to={{ pathname: '/reservation' }}>
                  <a href="#/" className="h4">
                    線上訂位
                  </a>
                </Link>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  餐點介紹
                </a>

                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to={{ pathname: '/singer' }}>
                      <a href="#/">歌手介紹</a>
                    </Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to={{ pathname: '/dish' }}>
                      <a href="#/">餐廳介紹</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  撰寫評論
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to={{ pathname: '/comment' }}>
                      <a href="#/">檢視文章</a>
                    </Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to={{ pathname: '/comment' }}>
                      <a href="#/">我的評論</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  互動平台
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to={{ pathname: '/' }}>
                      <a href="#/">Live直播</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: '/' }}>
                      <a href="#/">歌手投票</a>
                    </Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to={{ pathname: '/game' }}>
                      <a href="#/">小遊戲</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  會員專區
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to={{ pathname: '/member' }}>
                      <a href="#/" className="h4">
                        會員資料
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: '/member/reservation' }}>
                      <a href="#/">我的訂位</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: '/member/delivery' }}>
                      <a href="#/">外送訂單</a>
                    </Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to={{ pathname: '/member/coupon' }}>
                      <a href="#/">折價卷</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="cart-div">
                <div>
                  <Link to={{ pathname: '/delivery' }}>
                    <a href="#/" className="header-cart h4">
                      外送訂餐
                    </a>
                  </Link>
                </div>
                <div className="header-cartImgAndCircle">
                  <li className="cart-li">
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
          {cartList.length > 0 &&
            cartList.map(function (value, index) {
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
          <Link to={{ pathname: '/delivery' }}>
            <button className="button-orange">下一步</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HeaderBig
