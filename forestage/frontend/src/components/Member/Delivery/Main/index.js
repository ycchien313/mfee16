import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import Tab from './Tab'
import RecentDelivery from './RecentDelivery'
import HistoryDelivery from './HistoryDelivery'
import '../../../../styles/member/member_delivery.scss'

function Main(props) {
  const { pagename } = props
  const [isRecent, setIsRecent] = useState(true)
  const [memberId, setMemberId] = useState('')
  const [dataLoading, setDataLoading] = useState(true)
  const [contentIsLoaded, setContentIsLoaded] = useState(false)

  const token = localStorage.getItem('authToken')

  //解 token，取 memberId
  const fetchMemberId = async () => {
    const response = await axios.get('http://localhost:3001/auth/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })

    const memberIdFromToken = response.data.memberId

    return { memberId: memberIdFromToken }
  }

  useEffect(() => {
    // 抓後端資料，並設定至狀態
    const fetchData = async () => {
      const { memberId } = await fetchMemberId()

      setMemberId(memberId)
    }

    fetchData()

    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }, [])

  const loading = (
    <>
      <div className="content-spinner">
        <img
          src={process.env.PUBLIC_URL + '/images/member/spinner.svg'}
          alt=""
        ></img>
      </div>
    </>
  )

  return (
    <>
      <div className="member-delivery">
        <main className="main">
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

              {/* 近期訂單、歷史紀錄 */}
              {dataLoading
                ? loading
                : [
                    isRecent ? (
                      <RecentDelivery
                        memberId={memberId}
                        setContentIsLoaded={setContentIsLoaded}
                      />
                    ) : (
                      <HistoryDelivery
                        memberId={memberId}
                        setContentIsLoaded={setContentIsLoaded}
                      />
                    ),
                  ]}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Main
