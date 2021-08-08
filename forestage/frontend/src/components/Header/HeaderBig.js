import React, { useEffect, useState } from 'react'
import '../../styles/header/headerBig.scss'
import $ from 'jquery'
import HeaderBigCart from './HeaderBigCart'
import HeaderAuth from './HeaderAuth'
import { HashLink as Link } from 'react-router-hash-link'
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
            <Link to="/#" style={{ width: '100%' }}>
              <img src="http://localhost:3000/images/header/LOGO.svg" alt="" />
            </Link>
          </a>

          <nav className="header-nav">
            <ul className="header-nav-ul">
              <li>
                <Link to="/reservation#" style={{ padding: '0' }}>
                  <a href="#/" className="h4">
                    線上訂位
                  </a>
                </Link>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  餐廳介紹
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to="/singer#">歌手介紹</Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to="/dish#">餐點介紹</Link>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  撰寫評論
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to="/comment#">檢視文章</Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to="/comment/myComment#">我的評論</Link>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  互動平台
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to="/#secondScreen">Live直播</Link>
                  </li>
                  <li>
                    <Link to="/#fourthScreen">歌手投票</Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to="/game#">小遊戲</Link>
                  </li>
                </ul>
              </li>
              <li className="slide-down">
                <a href="#/" className="h4">
                  會員專區
                </a>
                <ul className="header-slide-menu">
                  <li className="top-border-radius">
                    <Link to="/member#">會員資料</Link>
                  </li>
                  <li>
                    <Link to="/member/reservation#">我的訂位</Link>
                  </li>
                  <li>
                    <Link to="/member/delivery#">外送訂單</Link>
                  </li>
                  <li className="bottom-border-radius">
                    <Link to="/member/coupon#">折價卷</Link>
                  </li>
                </ul>
              </li>
              <li className="cart-div">
                <div>
                  <Link to="/delivery#" style={{ padding: '0' }}>
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
                        className="cart-image"
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
          <h4 className="cart-total">合計: ${totalPrice}</h4>
          <Link to="/delivery#">
            <button className="button-orange">下一步</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HeaderBig
