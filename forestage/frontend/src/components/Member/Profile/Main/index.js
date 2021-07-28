import React from 'react'
import '../../../../styles/member/profile.scss'
import axios from 'axios'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import PersonalInfo from './PersonalInfo'
import SigninInfo from './SigninInfo'

function Main(props) {
  const { pagename } = props

  const memberId = 1

  // server 端會員資料的請求
  const dbRequest = axios.create({
    baseURL: 'http://127.0.0.1:3001/member/',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'appliaction/json',
    }),
  })
  // file 用 headers
  // const dbRequest = axios.create({
  //   baseURL: 'http://127.0.0.1:3001/member/',
  //   headers: new Headers({
  //     'Content-Type': 'multipart/form-data',
  //   }),
  // })

  return (
    <>
      <div className="profile">
        <main className="main">
          <div className="main-container">
            {/* <!-- 左側：導覽列 --> */}
            <Aside />
            {/* <!-- 右側：麵包屑、內容--> */}
            <div className="right-side">
              {/* <!-- 麵包屑 --> */}
              <Breadcrumb pagename={pagename} />

              {/* <!-- 內容 --> */}
              {/* <!-- ********** 不同部份開始 ********** --> */}
              <div className="content">
                <div className="content-container">
                  <div className="info-container">
                    {/* <!-- 左側：會員照片、個人資料 --> */}
                    <PersonalInfo dbRequest={dbRequest} memberId={memberId} />

                    {/* <!-- 中間分隔線 --> */}
                    <div className="vertical-line"></div>

                    {/* <!-- 右側：登入資料 --> */}
                    <SigninInfo dbRequest={dbRequest} memberId={memberId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Main