import React, { useContext, useState } from 'react'
import Auth from '../../components/Auth/'
import AuthContext from '../../components/Auth/AuthContext'

function Member() {
  const { user } = useContext(AuthContext)
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          setShowAuthModal(!showAuthModal)
        }}
      >
        打開登入畫面
      </button>
      <button
        onClick={() => {
          console.log(user)
        }}
      >
        取得 user
      </button>
      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
    </>
  )
}

export default Member
