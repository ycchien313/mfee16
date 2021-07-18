import React from 'react'

function SigninInfo() {
  return (
    <>
      <div className="signin-info-container">
        <div className="data-container">
          <div className="table-container">
            <div className="info-row">
              <div className="info-col h4">登入資料</div>
              <button className="reset-btn orange-guide-button">
                重設密碼
              </button>
            </div>
            <div className="info-row">
              <div className="info-col">帳號 / 電子郵件</div>
              <div className="info-col textarea-container">
                <textarea
                  className="textarea"
                  readOnly
                  defaultValue="elfin@elfin.com"
                ></textarea>
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">密碼</div>
              <div className="info-col">
                <input type="text" value="********" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SigninInfo
