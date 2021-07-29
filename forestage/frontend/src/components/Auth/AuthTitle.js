import React, { useState, useEffect } from 'react'

function AuthTitle(props) {
  const { signinScreen, setSigninScreen } = props

  const [authTitle, setAuthTitle] = useState({
    title: '',
    subTitle: '',
    subTitleLink: '',
  })

  // 切換標題內容
  const toggleTitle = () => {
    let newAuthTitle = null

    if (signinScreen) {
      newAuthTitle = {
        ...AuthTitle,
        title: '登入',
        subTitle: '還沒有帳號碼 ? ',
        subTitleLink: '註冊新帳號',
      }
    } else {
      newAuthTitle = {
        ...AuthTitle,
        title: '註冊',
        subTitle: '已經有帳號了嗎 ? ',
        subTitleLink: '點此登入',
      }
    }

    setAuthTitle(newAuthTitle)
  }

  useEffect(() => {
    toggleTitle()
  }, [])

  return (
    <>
      <div className="title-container">
        <h2 className="title">{authTitle.title}</h2>
        <p className="sub-title">
          {authTitle.subTitle}
          <span
            onClick={() => {
              setSigninScreen(!signinScreen)
            }}
          >
            {authTitle.subTitleLink}
          </span>
        </p>
      </div>
    </>
  )
}

export default AuthTitle
