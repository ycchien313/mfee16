import React, { useState, useEffect } from 'react'
import ModalPassword from './ModalPassword'

function SigninInfo(props) {
  const { dbRequest, memberId } = props

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getEmailServer = async () => {
    const response = await dbRequest.get(`/email/${memberId}`)
    const data = response.data
    setEmail(data.data[0].email)
  }

  useEffect(() => {
    getEmailServer()
  }, [])

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
