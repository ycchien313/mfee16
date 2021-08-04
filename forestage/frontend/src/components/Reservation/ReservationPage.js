import React, { useEffect, useState } from 'react'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import Footer from '../Footer/'
import '../../styles/reservation/res/reservation-meal-RWD.scss'
import '../../styles/reservation/res/reservation.scss'
import Auth from '../Auth/'

// import Footer from '../../components/Footer'

function ReservationPage(props) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  let dateFromHome = {}
  if (props.location.state !== undefined) {
    dateFromHome = props.location.state.select
    if (props.location.state.prevPath === '/home') {
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
      />
      <div className="res-footer">
        <Footer />
      </div>
    </>
  )
}

export default ReservationPage
