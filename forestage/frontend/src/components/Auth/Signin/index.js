import React from 'react'
import '../../../styles/auth/signin.scss'
import WelLogo from '../WelLogo'
import AuthTitle from '../AuthTitle'
import AuthSocial from '../AuthSocial'
import AuthForm from '../AuthForm'

function Signin(props) {
  const { signinScreen, setSigninScreen } = props

  return (
    <>
      <div className="sign-in">
        <div className="signin-page-container">
          <div className="wave-top"></div>
          <div className="middle-container">
            <div className="left-side">
              <WelLogo />
            </div>
            <div className="right-side">
              <AuthTitle
                signinScreen={signinScreen}
                setSigninScreen={setSigninScreen}
              />
              <AuthSocial signinScreen={signinScreen} />
              <AuthForm signinScreen={signinScreen} />
            </div>
          </div>
          <div className="wave-down"></div>
        </div>
      </div>
    </>
  )
}

export default Signin
