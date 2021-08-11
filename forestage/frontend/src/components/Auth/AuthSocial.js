import React, { useContext } from 'react'
import { withRouter, useHistory } from 'react-router'
import axios from 'axios'
import AuthContext from './AuthContext'
import { setAuthToken } from './utils'
import Swal from 'sweetalert2'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'

function AuthSocial(props) {
  const { setMember } = useContext(AuthContext)
  const { signinScreen, setShowAuthModal, setErrorMsg } = props
  const history = useHistory()

  // 對 server 請求
  const serverRequest = axios.create({
    baseURL: 'http://localhost:3001/auth/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  // Google 登入
  const responseGoogle = async (response) => {
    // 把 FB accessToken 轉 Blob 類型
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: 'application/json' }
    )

    const googleResponse = await serverRequest.post('/google', tokenBlob)
    const data = googleResponse.data
    const result = data.result
    const msg = data.msg

    console.log('google response: ', googleResponse)

    // 登入失敗 或 註冊失敗，回傳錯誤訊息
    if (result !== '成功') {
      return setErrorMsg(msg)
    }

    // 登入成功 或 註冊成功
    const memberId = data.memberId
    const email = data.email
    const signup = data.signup
    const token = data.token
    // 設定 token 給 localStorage
    setAuthToken(token)
    // 設定 memberId 給 react context (user state)
    setMember({ memberId: memberId })

    // 設定 token 給 request 的 header
    serverRequest.defaults.headers.common['Authorization'] = token

    // 載入指示器及轉場
    await loading()
    await transition('登入成功')

    // 第一次登入(註冊)，設定 email 到 localStorage，跳出未修改訊息
    if (signup === 1) {
      localStorage.setItem('email', email)
      await changePasswordTip('Google')
    }

    // 首頁則強制更新
    props.location.pathname === '/' && history.go(0)

    // 關閉彈出視窗
    setShowAuthModal(false)
  }

  // FB 登入
  const responseFacebook = async (response) => {
    // 把 FB accessToken 轉 Blob 類型
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: 'application/json' }
    )

    // 取得 FB 登入驗證後回傳資訊
    const fbResponse = await serverRequest.post('/facebook', tokenBlob)
    const data = fbResponse.data
    const result = data.result
    const msg = data.msg

    // console.log('fb response: ', fbResponse)

    // 登入失敗 或 註冊失敗，回傳錯誤訊息
    if (result !== '成功') {
      return setErrorMsg(msg)
    }

    // 登入成功 或 註冊成功
    const memberId = data.memberId
    const email = data.email
    const signup = data.signup
    const token = data.token
    // 設定 token 給 localStorage
    setAuthToken(token)
    // 設定 memberId 給 react context (user state)
    setMember({ memberId: memberId })

    // 設定 token 給 request 的 header
    serverRequest.defaults.headers.common['Authorization'] = token

    // 載入指示器及轉場
    await loading()
    await transition('登入成功')

    // 第一次登入(註冊)，設定 email 到 localStorage，跳出未修改訊息
    if (signup === 1) {
      localStorage.setItem('email', email)
      await changePasswordTip('Facebook')
    }

    // 首頁則強制更新
    props.location.pathname === '/' && history.go(0)
    // 關閉彈出視窗
    setShowAuthModal(false)
  }

  // 載入指示器
  const loading = () =>
    new Promise((resolve, reject) => {
      resolve(
        Swal.fire({
          html:
            '<div>' +
            '<img src="http://127.0.0.1:3000//images/auth/spinner.svg" alt=""></img>' +
            '</div>',
          showConfirmButton: false,
          timer: 750,
        })
      )
    })

  // 轉場
  const transition = (title) =>
    new Promise((resolve, reject) => {
      resolve(
        Swal.fire({
          icon: 'success',
          title: title,
          showConfirmButton: false,
          timer: 1000,
        })
      )
    })

  // 第一次登入，修改密碼提示訊息
  const changePasswordTip = (social) =>
    new Promise((resolve, reject) => {
      resolve(
        Swal.fire({
          icon: 'info',
          title:
            '提醒：請記得至<a href="http://127.0.0.1/member/profile" style="text-decoration: none; color:#f5b54d";>會員專區</a>修改密碼',
          text: `第一次 ${social} 登入，密碼為 elfin`,
          confirmButtonColor: '#97bc78',
        })
      )
    })

  const signinSocial = (
    <>
      <div className="signin-container">
        <GoogleLogin
          clientId="519861503616-62kk3nm10cufqntq8e7nci8lh4j47vv3.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="signin-box g-blue"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <div className="icon-box">
                <img
                  src={
                    process.env.PUBLIC_URL + '/images/auth/auth-google-icon.svg'
                  }
                  alt=""
                />
              </div>
              <span>Sign in with Google</span>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <FacebookLogin
          appId="259250762299628"
          // autoLoad
          callback={responseFacebook}
          render={(renderProps) => (
            <button className="signin-box f-blue" onClick={renderProps.onClick}>
              <div className="icon-box f-blue">
                <i className="fab fa-facebook-square"></i>
              </div>
              <span>Sign in with Facebook</span>
            </button>
          )}
        />
      </div>
    </>
  )

  const signupSocial = (
    <>
      <div className="signup-container">
        <GoogleLogin
          clientId="519861503616-62kk3nm10cufqntq8e7nci8lh4j47vv3.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className="signup-box g-blue"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <div className="icon-box">
                <img
                  src={
                    process.env.PUBLIC_URL + '/images/auth/auth-google-icon.svg'
                  }
                  alt=""
                />
              </div>
              <span>Sign up with Google</span>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <FacebookLogin
          appId="259250762299628"
          // autoLoad
          callback={responseFacebook}
          render={(renderProps) => (
            <button className="signup-box f-blue" onClick={renderProps.onClick}>
              <div className="icon-box f-blue">
                <i className="fab fa-facebook-square"></i>
              </div>
              <span>Sign up with Facebook</span>
            </button>
          )}
        />
      </div>
    </>
  )

  return <>{signinScreen ? signinSocial : signupSocial}</>
}

export default withRouter(AuthSocial)
