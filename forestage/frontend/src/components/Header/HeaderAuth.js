import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import Auth from '../../components/Auth/'

function HeaderAuth() {
  const isTableOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const history = useHistory()
  const [authToken, setAuthToken] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)

  const logoutSwal = () => {
    Swal.fire({
      icon: 'success',
      title: '登出成功',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    token === null ? setAuthToken(null) : setAuthToken(token)
  }, [authToken, showAuthModal])

  const loginDom = (
    <>
      {authToken === null ? (
        <a
          href="#/"
          className="h4"
          onClick={() => {
            setShowAuthModal(!showAuthModal)
          }}
        >
          登入
        </a>
      ) : (
        <a
          href="#/"
          className="h4"
          onClick={() => {
            localStorage.removeItem('authToken')
            setAuthToken(null)
            logoutSwal()
            history.push('/')
          }}
        >
          登出
        </a>
      )}
    </>
  )

  const loginMdDom = (
    <>
      {authToken === null ? (
        <a
          href="#/"
          className="h3"
          onClick={() => {
            setShowAuthModal(true)
          }}
        >
          登入
        </a>
      ) : (
        <a
          href="#/"
          className="h3"
          onClick={() => {
            localStorage.removeItem('authToken')
            setAuthToken(null)
            logoutSwal()
            history.push('/')
          }}
        >
          登出
        </a>
      )}
    </>
  )

  return (
    <>
      {isTableOrMobile ? loginMdDom : loginDom}

      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
    </>
  )
}

export default withRouter(HeaderAuth)
