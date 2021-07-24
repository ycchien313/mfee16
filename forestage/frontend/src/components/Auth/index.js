import React, { useState } from 'react'
import Signin from './Signin/'
import Signup from './Signup/'

function Auth() {
  // true: Signin
  // false: Signup
  const [signinScreen, setSigninScreen] = useState(true)

  return (
    <>
      {signinScreen ? (
        <Signin signinScreen={signinScreen} setSigninScreen={setSigninScreen} />
      ) : (
        <Signup signinScreen={signinScreen} setSigninScreen={setSigninScreen} />
      )}
    </>
  )
}

export default Auth
