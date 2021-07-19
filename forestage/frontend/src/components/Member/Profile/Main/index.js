import React, { useEffect } from 'react'
import '../../../../styles/member/member.scss'
import Aside from '../Main/Aside'
import Breadcrumb from './Breadcrumb'
import PersonalInfo from './PersonalInfo'
import SigninInfo from './SigninInfo'

function Main() {

  
  return (
    <>
      <main className="main">
        <div className="main-container">
          {/* <!-- 左側：導覽列 --> */}
          <Aside />
          {/* <!-- 右側：麵包屑、內容--> */}
          <div className="right-side">
            {/* <!-- 麵包屑 --> */}
            <Breadcrumb />

            {/* <!-- 內容 --> */}
            {/* <!-- ********** 不同部份開始 ********** --> */}
            <div className="content">
              <div className="content-container">
                <div className="info-container">
                  {/* <!-- 左側：會員照片、個人資料 --> */}
                  <PersonalInfo />

                  {/* <!-- 中間分隔線 --> */}
                  <div className="vertical-line"></div>

                  {/* <!-- 右側：登入資料 --> */}
                  <SigninInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Main
