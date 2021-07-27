import React, { useState } from 'react'
import '../../styles/auth/auth.scss'
import Signin from './Signin/'
import Signup from './Signup/'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

function Auth(props) {
  const { showAuthModal, setShowAuthModal } = props
  const [signinScreen, setSigninScreen] = useState(true) // true: Signin，false: Signup

  return (
    <>
      <div
        className="auth"
        onClick={(e) => {
          e.target.className === 'auth' && setShowAuthModal(!showAuthModal)
        }}
      >
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={signinScreen}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
            classNames="fade"
          >
            <div className="auth-container">
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
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}

export default Auth
