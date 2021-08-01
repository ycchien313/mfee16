import React, { useState } from 'react'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import Tab from './Tab'
import RecentCoupon from './RecentCoupon'
import HistoryCoupon from './HistoryCoupon'
import '../../../../styles/member/coupon.scss'

function Main(props) {
  const { pagename } = props
  const [contentIsLoaded, setContentIsLoaded] = useState(false)
  const [isRecent, setIsRecent] = useState(true)

  return (
    <>
      <div className="coupon">
        <div className="main-container">
          {/* 左側：導覽列 */}
          <Aside
            pagename={pagename}
            contentIsLoaded={contentIsLoaded}
            setContentIsLoaded={setContentIsLoaded}
          />

          <div className="right-side">
            {/* 麵包屑 */}
            <Breadcrumb pagename={pagename} />

            {/* 頁籤 */}
            <Tab isRecent={isRecent} setIsRecent={setIsRecent} />

            {/* 可使用、歷史紀錄 */}
            {isRecent ? <RecentCoupon /> : <HistoryCoupon />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
