import React from 'react'
// import React, { useContext, useState } from 'react'
// import Auth from '../../components/Auth/'
// import AuthContext from '../../components/Auth/AuthContext'
import Header from '../../components/Header/'

function Member() {
  // const { member } = useContext(AuthContext)
  // const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      {/* <button
        onClick={() => {
          setShowAuthModal(!showAuthModal)
        }}
      >
        打開登入畫面
      </button>
      <button
        onClick={() => {
          console.log(member)
        }}
      >
        取得 member
      </button> */}

      <Header />

      {/* {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )} */}
    </>
  )
}

export default Member
