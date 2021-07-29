import React, { useEffect, useState } from 'react'
import '../../../styles/header/headerSmall.scss'
import DownMenu from './DownMenu'
import HeaderAuth from '../HeaderAuth'
import { CSSTransition } from 'react-transition-group'
import HeaderSmallCart from './HeaderSmallCart'
import $ from 'jquery'

function HeaderSmall(props) {
  let { item } = props
  const [menuOn, setMenuOn] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  useEffect(() => {
    $('.icon').on('click', function () {
      $('.cart-small').toggleClass('disabled')
    })
  }, [])
  useEffect(() => {
    total()
    totalCountValue()
  }, [item])
  function total() {
    let total = 0
    for (let i = 0; i < item.length; i++) {
      total = total + item[i].price * item[i].count
    }
    setTotalPrice(total)
  }
  function totalCountValue() {
    let total = 0
    for (let i = 0; i < item.length; i++) {
      total = total + item[i].count
    }
    setTotalCount(total)
  }
  return (
    <>
      <div className="wrapper">
        <div className="small-header">
          <div className="logo"></div>
          <div className="menu-right">
            <HeaderAuth />
            <div className="cart">
              <div className="icon"></div>
              <div className="circle">{totalCount}</div>
            </div>
            <div
              className="burger-menu"
              onClick={() => {
                !menuOn ? setMenuOn(true) : setMenuOn(false)
              }}
            ></div>
            {/* 購物車 */}
            <div className="cart-small disabled">
              <div className="cart-small-list">
                <div className="cart-small-border">
                  {item.length > 0 &&
                    item.map(function (value, index) {
                      return (
                        <HeaderSmallCart
                          key={index}
                          name={value.name}
                          price={value.price}
                          count={value.count}
                          img={value.img}
                        />
                      )
                    })}
                </div>
              </div>
              <div className="cart-small-total">
                <h3>合計: ${totalPrice}</h3>
                <div className="cart-small-submit">
                  <button className="button-orange">下一步</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CSSTransition in={menuOn} classNames="my-down-menu" unmountOnExit>
          <DownMenu />
        </CSSTransition>
      </div>
    </>
  )
}

export default HeaderSmall
