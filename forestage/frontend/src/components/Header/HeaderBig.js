import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Auth from '../../components/Auth/'
import '../../styles/header/headerBig.scss'

function HeaderBig(props) {
  const history = useHistory()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authToken, setAuthToken] = useState('')

  const reloadPage = () => {
    const pathname = props.location.pathname
    history.push(pathname)
  }

  const logoutSwal = () => {
    Swal.fire({
      icon: 'success',
      title: '登出成功',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'))
    reloadPage()
  }, [showAuthModal])

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
                      class="cart-image"
                    />
                  </a>
                  <div className="header-circle"></div>
                </li>
              </div>
              <li className="login">
                {authToken ? (
                  <a
                    href="#/"
                    className="h4"
                    onClick={() => {
                      localStorage.removeItem('authToken')
                      setAuthToken('')
                      logoutSwal()
                    }}
                  >
                    登出
                  </a>
                ) : (
                  <a
                    href="#/"
                    className="h4"
                    onClick={() => {
                      setShowAuthModal(!showAuthModal)
                    }}
                  >
                    登入
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
    </>
  )
}

export default withRouter(HeaderBig)
