import React from 'react'
import '../../styles/auth/signup.scss'

function Signup() {
  return (
    <>
      <div className="sign-up">
        <div class="signup-page-container">
          <div class="wave-top"></div>
          <div class="middle-container">
            <div class="left-side">
              <div class="title-container">
                <h2 class="title">註冊</h2>
                <p class="sub-title">
                  已經有帳號了嗎 ? <span>登入</span>
                </p>
              </div>
              <div class="signup-container">
                <a class="signup-box g-blue">
                  <div class="icon-box">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/images/auth/auth-google-icon.svg'
                      }
                      alt=""
                    />
                  </div>
                  <span>Sign up with Google</span>
                </a>
                <a class="signup-box f-blue">
                  <div class="icon-box f-blue">
                    <i class="fab fa-facebook-square"></i>
                  </div>
                  <span>Sign up with Facebook</span>
                </a>
              </div>
              <form action="">
                <div class="form-container">
                  <div class="form-row">
                    <label for="email">E-Mail(此為以後登入帳號)</label>
                    <input type="text" name="email" />
                  </div>
                  <div class="form-row">
                    <div class="form-col">
                      <label for="password">密碼</label>
                      <input type="password" name="password" />
                    </div>
                    <div class="form-col">
                      <label for="confirmPassword">確認密碼</label>
                      <input type="password" name="confirmPassword" />
                    </div>
                  </div>
                  <div class="form-row">
                    <label for="phone">手機號碼</label>
                    <input type="tel" name="phone" />
                  </div>
                  <div class="form-row">
                    <div class="form-col">
                      <label for="frmCityS">地址</label>
                      <input
                        type="ship-city"
                        name="ship-city"
                        autocomplete="shipping locality"
                      />
                    </div>
                    <div class="form-col">
                      <label for="frmAddressS">　</label>
                      <input
                        type="ship-address"
                        name="ship-address"
                        autocomplete="shipping street-address"
                      />
                    </div>
                  </div>

                  <div class="btn-row">
                    <button class="orange-guide-button">
                      <span>送出</span>
                      <i class="fas fa-arrow-circle-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="right-side">
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
          </div>
          <div class="wave-down"></div>
        </div>
      </div>
    </>
  )
}

export default Signup
