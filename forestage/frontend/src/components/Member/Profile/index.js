import React from 'react'
import '../../../styles/member/profile.scss'
import Banner from './Banner'
import Main from './Main/'

function Profile() {
  document.title = '會員資料'

  return (
    <>
      <Banner />
      <Main />
    </>
  )
}

export default Profile
