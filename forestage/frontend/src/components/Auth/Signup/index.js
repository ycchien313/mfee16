import React from 'react'
import '../../../styles/auth/signup.scss'
import WelLogo from '../WelLogo'
import AuthTitle from '../AuthTitle'
import AuthSocial from '../AuthSocial'
import AuthForm from '../AuthForm'

function Signup(props) {
  const { signinScreen, setSigninScreen, setShowAuthModal } = props

  return (
    <>
      <div className="sign-up">
        <div className="signup-page-container">
          <div className="wave-top"></div>
          <div className="middle-container">
            <div className="left-side">
              <AuthTitle
                signinScreen={signinScreen}
                setSigninScreen={setSigninScreen}
              />
              <AuthSocial signinScreen={signinScreen} />
              <AuthForm
                signinScreen={signinScreen}
                setShowAuthModal={setShowAuthModal}
              />
            </div>
            <div className="right-side">
              <WelLogo />
            </div>
          </div>
          <div className="wave-down"></div>
        </div>
      </div>
    </>
  )
}

export default Signup
