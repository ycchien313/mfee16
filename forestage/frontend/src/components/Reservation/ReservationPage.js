import React, { useEffect, useState } from 'react'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import Footer from '../Footer/'
import '../../styles/reservation/res/reservation-meal-RWD.scss'
import '../../styles/reservation/res/reservation.scss'
import Auth from '../Auth/'
import { gsap } from 'gsap'
import { Tween } from 'react-gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// import Footer from '../../components/Footer'

function ReservationPage(props) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  let dataFromMember = { reservationId: 0, prevPath: '' }
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
      console.log(props.location.state.prevPath)
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
      console.log(props.location.state.prevPath)
    }
  }
  // 視窗關閉時移除sessionStorage
  useEffect(() => {
    window.scrollTo(0, 0)
    window.addEventListener(
      'beforeunload',
      function (event) {
        sessionStorage.clear()
      },
      false
    )

    return () => {
      window.onbeforeunload = function () {
        sessionStorage.clear()
      }
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
