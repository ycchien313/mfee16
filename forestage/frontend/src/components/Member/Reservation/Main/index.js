import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [memberId, setMemberId] = useState('')
  const [dataLoading, setDataLoading] = useState(true)
  const [didMount, setDidMount] = useState(true)

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

    const memberId = response.data.memberId

    return { memberId: memberId }
  }

  useEffect(() => {
    // 抓後端資料，並設定至狀態
    const fetchData = async () => {
      const { memberId } = await fetchMemberId()

      setMemberId(memberId)
    }

    fetchData()
    setDidMount(false)

    setTimeout(() => {
      setDataLoading(false)
      console.log('didMount:', dataLoading)
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
      <div className="reservation">
        <main className="main">
          <div className="main-container">
            {/* <!-- 左側：導覽列 --> */}
            <Aside pagename={pagename} isRecent={isRecent} />
            {/* <!-- 右側：麵包屑、內容--> */}
            <div className="right-side">
              {/* <!-- 麵包屑 --> */}
              <Breadcrumb pagename={pagename} />

              {/* <!-- ********** 不同部份開始 ********** --> */}
              {/* <!-- 頁籤 --> */}
              <Tab isRecent={isRecent} setIsRecent={setIsRecent} />

              {dataLoading
                ? loading
                : [
                    isRecent ? (
                      <RecentReservation memberId={memberId} />
                    ) : (
                      <HistoryReservation memberId={memberId} />
                    ),
                  ]}

              {/* 近期訂位、歷史紀錄 */}
              {/* {isRecent ? (
                <RecentReservation memberId={memberId} />
              ) : (
                <HistoryReservation memberId={memberId} />
              )} */}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Main
