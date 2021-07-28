import React, { useEffect } from 'react'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import '../../styles/reservation/res/reservation.scss'

// import Footer from '../../components/Footer'

function ReservationPage(props) {
  // 視窗關閉時移除localstorage
  useEffect(() => {
    window.addEventListener(
      'beforeunload',
      function () {
        localStorage.removeItem(
          'dishCount',
          'seatInfo',
          'seatCount',
          'checkList',
          'singerCalendar',
          'attendance',
          'remainingSeat',
          'activeDate',
          'insertResData'
        )
      },
      false
    )

    return () => {
      window.onbeforeunload = function () {
        localStorage.clear()
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
