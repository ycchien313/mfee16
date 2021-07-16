import React, { useState } from 'react'
import '../../../styles/header/headerSmall.scss'
import DownMenu from './DownMenu'
import { CSSTransition } from 'react-transition-group'

function HeaderSmall() {
  const [menuOn, setMenuOn] = useState(false)

  return (
    <>
      <div className="wrapper">
        <div className="small-header">
          <div className="logo"></div>
          <div className="menu-right">
            <a href="#/" className="h3">
              登入
            </a>
            <div className="cart">
              <div className="icon"></div>
              <div className="circle">12</div>
            </div>
            <div
              className="burger-menu"
              onClick={() => {
                !menuOn ? setMenuOn(true) : setMenuOn(false)
              }}
            ></div>
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
