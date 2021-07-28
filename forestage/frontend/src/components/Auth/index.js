import React, { useState, useEffect } from 'react'
import '../../styles/auth/auth.scss'
import Signin from './Signin/'
import Signup from './Signup/'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

function Auth(props) {
  const { showAuthModal, setShowAuthModal } = props
  const [signinScreen, setSigninScreen] = useState(true) // true: Signin，false: Signup

  // 關閉卷軸
  const closeScroll = () => {
    document.documentElement.style.overflowY = 'hidden'
  }

  // 開啟卷軸
  const openScroll = () => {
    document.documentElement.style.overflowY = 'scroll'
  }

  useEffect(() => {
    closeScroll()
  }, [])

  useEffect(() => {
    return () => {
      openScroll()
    }
  }, [])

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
