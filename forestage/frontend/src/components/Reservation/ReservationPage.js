import React, { useEffect, useState } from 'react'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import '../../styles/reservation/res/reservation.scss'
import Auth from '../Auth/'

// import Footer from '../../components/Footer'

function ReservationPage(props) {
  const [showAuthModal, setShowAuthModal] = useState(false)

  // 視窗關閉時移除sessionStorage
  useEffect(() => {
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
      {/* <Auth /> */}
      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
      <Hero />
      <Main showAuthModal={showAuthModal} setShowAuthModal={setShowAuthModal} />
      {/* <Footer /> */}
    </>
  )
}

export default ReservationPage
