import React from 'react'
import '../../../styles/member/profile.scss'
import Banner from '../Common/Banner'
import Main from './Main/'

function Profile(props) {
  const { pagename } = props

  document.title = pagename

  return (
    <>
      <Banner pagename={pagename} />
      <Main pagename={pagename} />
    </>
  )
}

export default Profile
