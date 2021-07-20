import React from 'react'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import PersonalInfo from './PersonalInfo'
import SigninInfo from './SigninInfo'

function Main(props) {
  const { pagename } = props

  return (
    <>
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
