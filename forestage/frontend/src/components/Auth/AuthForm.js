import React, { useContext, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { setAuthToken } from './utils'
import AuthContext from './AuthContext'

function AuthForm(props) {
  const { setUser } = useContext(AuthContext)
  const { signinScreen, setShowAuthModal } = props
  const [errorMsg, setErrorMsg] = useState('')
  const [addr, setAddr] = useState({ city: '桃園市', street: '' })
  const [cityOptions, setCityOptions] = useState(['桃園市', '台北市', '新北市'])
  const [signupFields, setSignupFields] = useState({
    email: 'angel@gmail.com',
    password: '111',
    confirmPassword: '111',
    mobile: '0912345678',
    address: '桃園市',
  })
  const [signinFields, setSigninFields] = useState({
    account: 'angel@gmail.com',
    password: '123',
  })

  // 對 server 請求
  const serverRequest = axios.create({
    // baseURL: 'http://127.0.0.1:3001/auth/',
    baseURL: 'https://localhost:8443/auth/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  // 檢查密碼與確認密碼是否符合
  const checkPassword = (e) => {
    const passwordInput = e.target['password']
    const confirmPasswordInput = e.target['confirmPassword']

    if (signupFields.password !== signupFields.confirmPassword) {
      // 新增驗證錯誤背景
      passwordInput.classList.add('bg-lightgray')
      confirmPasswordInput.classList.add('bg-lightgray')

      setErrorMsg('密碼與確認密碼不一致')

      return false
    }

    // 移除驗證錯誤背景
    passwordInput.classList.remove('bg-lightgray')
    confirmPasswordInput.classList.remove('bg-lightgray')
    return true
  }

  // 處理 input onChange
  const handleInputChange = (e) => {
    switch (signinScreen) {
      case true:
        let newSigninFields = {
          ...signinFields,
          [e.target.name]: e.target.value,
        }
        setSigninFields(newSigninFields)
        break

      case false:
        let newSignupFields = {
          ...signupFields,
          [e.target.name]: e.target.value,
        }
        setSignupFields(newSignupFields)
        break

      default:
        break
    }

    e.target.classList.remove('bg-lightgray')

    // 清空錯誤訊息
    setErrorMsg('')
  }

  // 處理 地址(select、input) onChange
  const handleAddrChange = (e) => {
    let newAddr = { ...addr, [e.target.name]: e.target.value }
    setAddr(newAddr)

    // 當地址有變動，馬上處理 signupFields 狀態的 address 欄位
    let newSignupField = {
      ...signupFields,
      address: `${newAddr.city}${newAddr.street}`,
    }
    setSignupFields(newSignupField)
  }

  // 處理 驗證訊息
  const handleInvalid = (e) => {
    e.preventDefault()
    e.target.classList.add('bg-lightgray')

    // 從第一個錯誤開始顯示，須配合 handleInputChange()
    errorMsg === '' && setErrorMsg(e.target.title)
  }

  // 處理 表單送出
  const handleSubmit = async (e) => {
    e.preventDefault()

    switch (signinScreen) {
      // 登入
      case true:
        console.log('準備傳入後端，資料為: ', signinFields)

        try {
          const response = await serverRequest.post('/signin', signinFields)
          const data = response.data
          const result = data.result
          const msg = data.msg

          // 登入失敗
          if (result === '失敗') {
            setErrorMsg(msg)
            return
          }

          // 登入成功
          const memberId = data.data.memberId
          const token = data.token
          console.log('登入成功，token: ', token)

          // 設定 token 給 localStorage
          setAuthToken(token)
          // 設定 token 給 request 的 header
          serverRequest.defaults.headers.common['Authorization'] = token
          // 設定 memberId 給 react context (user state)
          setUser({ memberId: memberId })

          // 載入指示器及轉場
          await loading()
          await transition('登入成功')

          // 重新整理
          setShowAuthModal(false)
        } catch (error) {}
        break

      // 註冊
      case false:
        // 密碼與確認密碼不一致
        if (!checkPassword(e)) return

        console.log('準備傳入後端，資料為: ', signupFields)

        try {
          const response = await serverRequest.post('/signup', signupFields)
          const data = response.data
          const result = data.result
          const msg = data.msg
          const memberId = data.data.memberId
          const token = data.token

          // 註冊失敗
          if (result === '失敗') {
            msg === '此 email 已有人註冊' &&
              e.target['email'].classList.add('bg-lightgray')

            setErrorMsg(msg)
            return
          }

          // 註冊成功
          console.log('註冊成功，token', token)
          // 設定 token 給 localStorage
          setAuthToken(token)
          // 設定 token 給 request 的 header
          serverRequest.defaults.headers.common['Authorization'] = token
          // 設定 memberId 給 react context (user state)
          setUser({ memberId: memberId })

          // 載入指示器及轉場
          await loading()
          await transition('登入成功')

          // 重新整理
          setShowAuthModal(false)
          // window.location.reload(
        } catch (error) {
          // 內部錯誤
          console.error('error:', error)
        }
        break

      default:
        break
    }
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

  const signinDom = (
    <>
      <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
        <div className="form-container">
          <label htmlFor="email">帳號 / E-mail</label>
          <input
            name="account"
            type="text"
            required
            title="請輸入帳號或 E-mail"
            value={signinFields.account}
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            type="password"
            placeholder="共 3 ~ 8 個字元"
            minLength="3"
            maxLength="8"
            required
            title="密碼長度為 3 ~ 8 個字元"
            value={signinFields.password}
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
          <div className="btn-row">
            <span className="error-msg">{errorMsg}</span>
            <button className="orange-guide-button">
              <span>送出</span>
              <i className="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  )

  const signupDom = (
    <>
      <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
        <div className="form-container">
          <div className="form-row">
            <label htmlFor="email">E-mail (此為以後登入帳號)</label>
            <input
              name="email"
              type="email"
              value={signupFields.email}
              title="請輸入正確的 E-mail"
              required
              onChange={(e) => {
                handleInputChange(e)
              }}
            />
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="password">密碼</label>
              <input
                name="password"
                type="password"
                placeholder="共 3 ~ 8 個字元"
                minLength="3"
                maxLength="8"
                required
                title="密碼字數為 3~8 個字元"
                value={signupFields.password}
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
            </div>
            <div className="form-col">
              <label htmlFor="confirmPassword">確認密碼</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="共 3 ~ 8 個字元"
                minLength="3"
                maxLength="8"
                required
                title="確認密碼字數為 3 ~ 8 個字元"
                value={signupFields.confirmPassword}
                onChange={(e) => {
                  handleInputChange(e)
                }}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="mobile">手機號碼</label>
            <input
              name="mobile"
              type="tel"
              value={signupFields.mobile}
              placeholder="ex. 0911222333"
              pattern="([0-9]{4}-[0-9]{3}-[0-9]{3})|([0-9]{4}[0-9]{3}[0-9]{3})"
              required
              title="請輸入正確的手機號碼"
              onChange={(e) => {
                handleInputChange(e)
              }}
            />
          </div>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="city">地址</label>
              <select
                name="city"
                className="input"
                onChange={(e) => {
                  handleAddrChange(e)
                }}
              >
                {cityOptions.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-col">
              <label htmlFor="street">　</label>
              <input
                name="street"
                type="address"
                autoComplete="shipping street-address"
                value={addr.street}
                onChange={(e) => {
                  handleAddrChange(e)
                }}
              />
            </div>
          </div>

          <div className="btn-row">
            <span className="error-msg">{errorMsg}</span>
            <button type="submit" className="orange-guide-button">
              <span>送出</span>
              <i className="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  )

  return <>{signinScreen ? signinDom : signupDom}</>
}

export default AuthForm
