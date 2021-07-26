import React, { useState } from 'react'
import '../../styles/auth/auth.scss'
import Signin from './Signin/'
import Signup from './Signup/'

function Auth(props) {
  const { showAuthModal, setShowAuthModal } = props
  // true: Signin，false: Signup
  const [signinScreen, setSigninScreen] = useState(true)

  return (
    <>
      <div
        className="auth"
        onClick={(e) => {
          e.target.className === 'auth' && setShowAuthModal(!showAuthModal)
        }}
      >
        {signinScreen ? (
          <Signin
            signinScreen={signinScreen}
            setSigninScreen={setSigninScreen}
            setShowAuthModal={setShowAuthModal}
          />
        ) : (
          <Signup
            signinScreen={signinScreen}
            setSigninScreen={setSigninScreen}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </div>
    </>
  )
}

export default Auth
