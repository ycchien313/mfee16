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
          console.log(e)
        }}
      >
        {signinScreen ? (
          <Signin
            signinScreen={signinScreen}
            setSigninScreen={setSigninScreen}
          />
        ) : (
          <Signup
            signinScreen={signinScreen}
            setSigninScreen={setSigninScreen}
          />
        )}
      </div>
    </>
  )
}

export default Auth
