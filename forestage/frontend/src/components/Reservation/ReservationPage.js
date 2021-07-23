import React from 'react'
import Header from '../Header/'
import Main from './ReservationMain/'
import Hero from './ReservationMain/Hero'
import '../../styles/reservation/res/reservation.scss'

// import Footer from '../../components/Footer'

function ReservationPage(props) {
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
