import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

function AuthSocial(props) {
  const { signinScreen } = props

  // 對 server 請求
  const serverRequest = axios.create({
    // baseURL: 'https://localhost:8443/',
    baseURL: 'http://localhost:3001/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  })

  const responseFacebook = async (response) => {
    console.log(response)

    const fbResponse = await serverRequest.get('/facebook', response)

    console.log(fbResponse)
  }

  const signinSocial = (
    <>
      <div className="signin-container">
        <button className="signin-box g-blue">
          <div className="icon-box">
            <img
              src={process.env.PUBLIC_URL + '/images/auth/auth-google-icon.svg'}
              alt=""
            />
          </div>
          <span>Sign in with Google</span>
        </button>

        <FacebookLogin
          appId="259250762299628"
          // autoLoad
          callback={responseFacebook}
          render={(renderProps) => (
            <button className="signin-box f-blue" onClick={renderProps.onClick}>
              <div className="icon-box f-blue">
                <i className="fab fa-facebook-square"></i>
              </div>
              <span>Sign in with Facebook</span>
            </button>
          )}
        />

        {/* <button className="signin-box g-blue">
          <div className="icon-box">
            <img
              src={process.env.PUBLIC_URL + '/images/auth/auth-google-icon.svg'}
              alt=""
            />
          </div>
          <span>Sign in with Google</span>
        </button> */}
        {/* <button className="signin-box f-blue">
          <div className="icon-box f-blue">
            <i className="fab fa-facebook-square"></i>
          </div>
          <span>Sign in with Facebook</span>
        </button> */}
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
