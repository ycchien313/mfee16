import React from 'react'
import '../../styles/auth/signin.scss'

function Signin() {
  return (
    <>
      <div className="sign-in">
        <div class="signin-page-container">
          <div class="wave-top"></div>
          <div class="middle-container">
            <div class="left-side">
              <img
                src={process.env.PUBLIC_URL + '/images/auth/elfin-green.png'}
                class="wel-img"
                alt=""
              />
              <div class="wel-title">
                <h1 class="title-top">Welcome to</h1>
                <img
                  src={process.env.PUBLIC_URL + '/images/auth/logo-brown.png'}
                  class="title-down"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side">
              <div class="title-container">
                <h2 class="title">登入</h2>
                <p class="sub-title">
                  還沒有帳號嗎 ? <span>註冊新帳號</span>
                </p>
              </div>
              <div class="signin-container">
                <a class="signin-box g-blue">
                  <div class="icon-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/images/auth/auth-google-icon.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span>Sign in with Google</span>
                </a>
                <a class="signin-box f-blue">
                  <div class="icon-box f-blue">
                    <i class="fab fa-facebook-square"></i>
                  </div>
                  <span>Sign in with Facebook</span>
                </a>
              </div>
              <form action="">
                <div class="form-container">
                  <label for="email">帳號 / 電子郵件</label>
                  <input type="text" name="email" />
                  <label for="password">密碼</label>
                  <input type="password" name="password" />
                  <div class="btn-row">
                    <button class="orange-guide-button">
                      <span>送出</span>
                      <i class="fas fa-arrow-circle-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="wave-down"></div>
        </div>
      </div>
    </>
  )
}

export default Signin
