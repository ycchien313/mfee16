import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import Tab from './Tab'
import RecentCoupon from './RecentCoupon'
import HistoryCoupon from './HistoryCoupon'
import '../../../../styles/member/coupon.scss'

function Main(props) {
  const { pagename } = props
  const [contentIsLoaded, setContentIsLoaded] = useState(false)
  const [memberId, setMemberId] = useState('')
  const [isRecent, setIsRecent] = useState(true)
  const [didMount, setDidMount] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)

  const token = localStorage.getItem('authToken')

  const fetchMemberId = async () => {
    const response = await axios.get('http://localhost:3001/auth/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })

    return { memberIdFromServer: response.data.memberId }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { memberIdFromServer } = await fetchMemberId()

      setMemberId(memberIdFromServer)
    }

    fetchData()

    setTimeout(() => {
      setDataLoading(false)
    }, 1000)

    console.log('mount')
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      console.log('update')
    }
  }, [didMount])

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
            {dataLoading
              ? loading
              : [
                  isRecent ? (
                    <RecentCoupon
                      memberId={memberId}
                      setContentIsLoaded={setContentIsLoaded}
                    />
                  ) : (
                    <HistoryCoupon
                      memberId={memberId}
                      setContentIsLoaded={setContentIsLoaded}
                    />
                  ),
                ]}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
