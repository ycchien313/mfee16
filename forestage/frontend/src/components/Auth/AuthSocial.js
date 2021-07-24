import React from 'react'

function AuthSocial(props) {
  const { signinScreen } = props

  const signinSocial = (
    <>
      <div className="signin-container">
        <a className="signin-box g-blue">
          <div className="icon-box">
            <img
              src={process.env.PUBLIC_URL + '/images/auth/auth-google-icon.svg'}
              alt=""
            />
          </div>
          <span>Sign in with Google</span>
        </a>
        <a className="signin-box f-blue">
          <div className="icon-box f-blue">
            <i className="fab fa-facebook-square"></i>
          </div>
          <span>Sign in with Facebook</span>
        </a>
      </div>
    </>
  )

  const signupSocial = (
    <>
      <div className="signup-container">
        <a className="signup-box g-blue">
          <div className="icon-box">
            <img
              src={process.env.PUBLIC_URL + '/images/auth/auth-google-icon.svg'}
              alt=""
            />
          </div>
          <span>Sign up with Google</span>
        </a>
        <a className="signup-box f-blue">
          <div className="icon-box f-blue">
            <i className="fab fa-facebook-square"></i>
          </div>
          <span>Sign up with Facebook</span>
        </a>
      </div>
    </>
  )

  return <>{signinScreen ? signinSocial : signupSocial}</>
}

export default AuthSocial
