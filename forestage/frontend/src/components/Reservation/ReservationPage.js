import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import Footer from '../Footer/'
import '../../styles/reservation/res/reservation-meal-RWD.scss'
import '../../styles/reservation/res/reservation.scss'
import Auth from '../Auth/'

function ReservationPage(props) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [locationKeys, setLocationKeys] = useState([])
  const history = useHistory()

  // 從會員中心來的state
  let dataFromMember = { reservationId: 0, prevPath: '' }
  // 從首頁來的state
  let dateFromHome = {}

  // 從首頁送來資料
  if (
    props.location.state !== undefined &&
    props.location.state.prevPath === '/home'
  ) {
    dateFromHome = props.location.state.select
    if (props.history.location.state.prevPath === '/home') {
      // 避免返回首頁再進入訂位頁時仍選擇前一個歌手
      // 從home每次進來先清空
      sessionStorage.clear()
      // console.log(props.location.state.prevPath)
    }
  }

  // 從我的訂位頁送來資料
  if (
    props.location.state !== undefined &&
    props.location.state.prevPath === '/member/reservation'
  ) {
    dataFromMember.reservationId = props.location.state.reservationId
    dataFromMember.prevPath = props.location.state.prevPath
    if (props.history.location.state.prevPath === '/member/reservation') {
      // 從MEMBER來每次進來先清空
      sessionStorage.clear()
      window.sessionStorage.setItem(
        'reservationId',
        `${props.location.state.reservationId}`
      )
      // console.log(props.location.state.prevPath)
    }
  }
  // 點擊瀏覽器上一頁清除session
  useEffect(() => {
    // 偵測上下頁動作
    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key])
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys)
          // console.log('下一頁的動作')
        } else {
          setLocationKeys((keys) => [location.key, ...keys])
          // 上一頁時清除session
          sessionStorage.clear()
          // console.log('上一頁的動作')
        }
      }
    })
  }, [locationKeys])

  useEffect(() => {
    // 載入時捲動到最上方
    window.scrollTo(0, 0)
    // 離開時清空sesstion
    window.addEventListener(
      'beforeunload',
      function (event) {
        sessionStorage.clear()
      },
      false
    )
    return () => {
      window.removeEventListener('beforeunload', function (event) {
        sessionStorage.clear()
      })
    }
  }, [])
  return (
    <>
      <Header />
      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
      <Hero />
      <Main
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        dateFromHome={dateFromHome}
        dataFromMember={dataFromMember}
      />
      <div className="res-footer">
        <Footer />
      </div>
    </>
  )
}

export default ReservationPage
