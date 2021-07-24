import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function AuthForm(props) {
  const { signinScreen } = props
  const [errorMsg, setErrorMsg] = useState('')
  const [addr, setAddr] = useState({ city: '桃園市', street: '' })
  const [cityOptions, setCityOptions] = useState(['桃園市', '台北市', '新北市'])
  const [signupField, setSignupField] = useState({
    email: 'angel@gmail.com',
    password: '111',
    confirmPassword: '111',
    mobile: '0912345678',
    address: '桃園市',
  })

  const serverRequest = axios.create({
    baseURL: 'http://127.0.0.1:3001/auth/',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'appliaction/json',
    }),
  })

  // 檢查密碼與確認密碼是否符合
  const checkPassword = (e) => {
    const passwordInput = e.target['password']
    const confirmPasswordInput = e.target['confirmPassword']

    if (signupField.password !== signupField.confirmPassword) {
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
    let newSignupField = { ...signupField, [e.target.name]: e.target.value }
    setSignupField(newSignupField)

    e.target.classList.remove('bg-lightgray')

    setErrorMsg('')
  }

  // 處理 地址(select、input) onChange
  const handleAddrChange = (e) => {
    let newAddr = { ...addr, [e.target.name]: e.target.value }
    setAddr(newAddr)

    // 當地址有變動，馬上處理 signupField 狀態的 address 欄位
    let newSignupField = {
      ...signupField,
      address: `${newAddr.city}${newAddr.street}`,
    }
    setSignupField(newSignupField)
  }

  // 處理 驗證訊息
  const handleInvalid = (e) => {
    e.preventDefault()
    e.target.classList.add('bg-lightgray')

    // 從第一個錯誤開始顯示
    errorMsg === '' && setErrorMsg(e.target.title)
  }

  // 處理 表單送出
  const handleSubmit = async (e) => {
    e.preventDefault()

    switch (signinScreen) {
      case true:
        break

      case false:
        if (!checkPassword(e)) return

        console.log('準備傳入後端，資料為: ', signupField)

        try {
          const response = await serverRequest.post('/signup', signupField)
          const data = response.data
          const status = data.status
          const msg = data.msg

          // 註冊失敗
          if (msg === '此 email 已有人註冊') {
            e.target['email'].classList.add('bg-lightgray')
            setErrorMsg(msg)
            return
          } else if (msg === '註冊失敗') {
            setErrorMsg(msg)
            return
          }

          // 註冊成功
          setTimeout(() => {
            Swal.fire({
              icon: 'success',
              title: '註冊成功',
              showConfirmButton: false,
              timer: 1000,
            })
            // To Do 跳轉至當時頁面(訂餐頁 or 首頁 ...)
          }, 1000)
        } catch (error) {
          // 內部錯誤
          console.error('error:', error)
        }
        break

      default:
        break
    }
  }

  const signinDom = (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="email">帳號 / 電子郵件</label>
          <input name="eamil" type="text" />
          <label htmlFor="password">密碼</label>
          <input name="password" type="password" />
          <div className="btn-row">
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
            <label htmlFor="email">E-Mail(此為以後登入帳號)</label>
            <input
              name="email"
              type="email"
              value={signupField.email}
              title="請輸入正確的email"
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
                minLength="3"
                maxLength="8"
                required
                title="密碼字數為 3-8"
                value={signupField.password}
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
                minLength="3"
                maxLength="8"
                required
                title="確認密碼字數為 3-8"
                value={signupField.confirmPassword}
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
              value={signupField.mobile}
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
