import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ModalPassword from './ModalPassword'

function SigninInfo(props) {
  const { dbRequest, setContentIsLoaded } = props

  const [didMount, setDidMount] = useState(true)
  const [memberId, setMemberId] = useState('')
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // 取得 memberId (解 token)
  const getMember = async () => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('http://localhost:3001/auth/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = response.data
    const resMemberId = data.memberId

    setMemberId(resMemberId)
  }

  // 取得會員的 E-Mail
  const getEmailFromServer = async () => {
    const response = await dbRequest.get(`/email/${memberId}`)
    // const response = await dbRequest.get(`/email/1`)
    const data = response.data
    setEmail(data.data[0].email)
  }

  // onMount 先執行一次解 Token，以便讓 onUpdate 可以確實拿到 memberId
  useEffect(() => {
    getMember()
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      getMember()
      getEmailFromServer()
      setContentIsLoaded(true)
    }
  }, [memberId])

  return (
    <>
      <ModalPassword
        show={show}
        handleClose={handleClose}
        dbRequest={dbRequest}
        memberId={memberId}
      />

      <div className="signin-info-container">
        <div className="data-container">
          <div className="table-container">
            <div className="info-row">
              <div className="info-col h4">登入資料</div>
              <button
                className="reset-btn orange-guide-button"
                onClick={handleShow}
              >
                重設密碼
              </button>
            </div>
            <div className="info-row">
              <div className="info-col">帳號 / 電子郵件</div>
              <div className="info-col textarea-container">
                {email}
                <textarea
                  className="textarea"
                  disabled
                  defaultValue={email}
                ></textarea>
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">密碼</div>
              <div className="info-col">
                <input type="password" value="12345678" disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SigninInfo
