import React, { useEffect, useState } from 'react'
import Header from '../Header/'
import Hero from './ReservationCheckoutMain/Hero'
import Main from './ReservationCheckoutMain/'
import '../../styles/reservation/res_checkout/res_check.scss'

// import Footer from '../../components/Footer'

function CheckoutPage(props) {
  // const { checkList, setCheckList, test } = props
  const [dishList, setDishList] = useState([])
  const [checkList, setCheckList] = useState([])
  useEffect(() => {
    setDishList(props.location.state.dishList)
    setCheckList(props.location.state.checkList)
  }, [])
  return (
    <>
      <Header />
      <Hero />
      <Main dishList={dishList} checkList={checkList} />
      {/* <Footer /> */}
    </>
  )
}

export default CheckoutPage
