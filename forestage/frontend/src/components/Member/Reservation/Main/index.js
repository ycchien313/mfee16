import React, { useState } from 'react'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import Tab from './Tab'
import RecentReservation from './RecentReservation'
import HistoryReservation from './HistoryReservation'
import '../../../../styles/member/aside.scss'
import '../../../../styles/member/reservation.scss'

function Main(props) {
  const { pagename } = props
  const [isRecent, setIsRecent] = useState(true)

  return (
    <>
      <div className="reservation">
        <main className="main">
          <div className="main-container">
            {/* <!-- 左側：導覽列 --> */}
            <Aside pagename={pagename} />
            {/* <!-- 右側：麵包屑、內容--> */}
            <div className="right-side">
              {/* <!-- 麵包屑 --> */}
              <Breadcrumb pagename={pagename} />

              {/* <!-- ********** 不同部份開始 ********** --> */}
              {/* <!-- 頁籤 --> */}
              <Tab isRecent={isRecent} setIsRecent={setIsRecent} />

              {/* 近期訂位、歷史紀錄 */}
              {isRecent ? <RecentReservation /> : <HistoryReservation />}
            </div>
          </div>
        </main>
      </div>
      <div style={{ height: '100vh' }}></div>
    </>
  )
}

export default Main
