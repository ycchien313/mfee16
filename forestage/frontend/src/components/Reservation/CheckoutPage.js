import React, { useEffect, useState } from 'react'
import Header from '../Header/'
import Hero from './ReservationCheckoutMain/Hero'
import Main from './ReservationCheckoutMain/'
import '../../styles/reservation/res_checkout/res_check.scss'

// import Footer from '../../components/Footer'

function CheckoutPage(props) {
  // const { checkList, setCheckList, test } = props
  const [dishList, setDishList] = useState({})
  useEffect(() => {
    console.log(props, 'aa')
  }, [])
  return (
    <>
      {/* {console.log(test)} */}
      <Header />
      <Hero />
      <Main />
      {/* <Footer /> */}
    </>
  )
}

export default CheckoutPage
