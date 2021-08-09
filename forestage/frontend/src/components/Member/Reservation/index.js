import React from 'react'
import Header from '../../Header'
import Banner from '../Common/Banner'
import Main from './Main'
import Footer from '../../Footer'
import CustomerService from '../Common/CustomerService'

function Reservation(props) {
  const { pagename } = props

  document.title = pagename

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

export default Reservation
