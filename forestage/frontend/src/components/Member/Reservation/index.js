import React from 'react'
import Header from '../../Header/'
import Banner from '../Common/Banner'
import Main from './Main/'
import Footer from '../../Footer/'

function Reservation(props) {
  const { pagename } = props

  document.title = pagename

  return (
    <>
      <Header />
      <Banner pagename={pagename} />
      <Main pagename={pagename} />
      <Footer />
    </>
  )
}

export default Reservation
