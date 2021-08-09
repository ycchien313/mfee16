import React from 'react'
import Header from '../../Header'
import Banner from '../Common/Banner'
import Main from './Main'
import Footer from '../../Footer'
import CustomerService from '../Common/CustomerService'

function Coupon(props) {
  const { pagename } = props

  return (
    <>
      <Header />
      <Banner pagename={pagename} />
      <Main pagename={pagename} />
      <Footer />
      <CustomerService />
    </>
  )
}

export default Coupon
