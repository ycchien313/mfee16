import React from 'react'
import '../../../styles/member/profile.scss'
import '../../../styles/member/aside.scss'
import Banner from '../Common/Banner'
import Main from './Main/'
import Footer from '../../Footer/'

function Profile(props) {
  const { pagename } = props

  document.title = pagename

  return (
    <>
      <div className="profile">
        <Banner pagename={pagename} />
        <Main pagename={pagename} />
      </div>
      <div className="aside">
        <div className="aside-to-footer"></div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
