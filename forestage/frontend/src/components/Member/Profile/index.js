import React from 'react'
import Banner from '../Common/Banner'
import Main from './Main/'
import Footer from '../../Footer/'
import Header from '../../Header'

function Profile(props) {
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

export default Profile
