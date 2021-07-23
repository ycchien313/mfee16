import React, { useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'

function Auth() {
  const [toggleScreen, setToggleScreen] = useState(false)

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      {toggleScreen ? <Signin /> : <Signup />}
    </>
  )
}

export default Auth
