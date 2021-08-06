import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router'
import '../../../styles/auth/signup.scss'
import WelLogo from '../WelLogo'
import AuthTitle from '../AuthTitle'
import AuthSocial from '../AuthSocial'
import AuthForm from '../AuthForm'

// import { Tween } from 'react-gsap'

function Signup(props) {
  const { signinScreen, setSigninScreen, setShowAuthModal } = props
  const history = useHistory()
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <>
      {/* <Tween to={{ x: '300px' }} duration={2} playState={playState}> */}
      <div className="sign-up">
        <div className="signup-page-container">
          <div className="wave-top"></div>
          <div className="middle-container">
            <div
              role="button"
              className="cancel-btn orange-guide-button"
              onClick={() => {
                setShowAuthModal(false)
                props.match.url === '/member' && history.push('/')
              }}
            >
              <i className="cancel-btn-icon fas fa-times"></i>
            </div>
            <div className="left-side">
              <AuthTitle
                signinScreen={signinScreen}
                setSigninScreen={setSigninScreen}
              />
              <AuthSocial
                signinScreen={signinScreen}
                setShowAuthModal={setShowAuthModal}
                setErrorMsg={setErrorMsg}
              />
              <AuthForm
                signinScreen={signinScreen}
                setShowAuthModal={setShowAuthModal}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
              />
            </div>

            <div className="right-side">
              <WelLogo />
            </div>
          </div>
          <div className="wave-down"></div>
        </div>
      </div>
      {/* </Tween> */}
    </>
  )
}

export default withRouter(Signup)
