import React, { useEffect } from 'react'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import '../../styles/reservation/res/reservation.scss'

// import Footer from '../../components/Footer'

function ReservationPage(props) {
  // 視窗關閉時移除sessionStorage
  useEffect(() => {
    window.addEventListener(
      'beforeunload',
      function (event) {
        sessionStorage.clear();
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
      <Hero />
      <Main />
      {/* <Footer /> */}
    </>
  )
}

export default ReservationPage
