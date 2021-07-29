import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Swal from 'sweetalert2'
import Auth from '../../components/Auth/'

function HeaderAuth(props) {
  const isTableOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const history = useHistory()
  const [authToken, setAuthToken] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)

  const reloadPage = () => {
    const pathname = props.location.pathname
    history.push(pathname)
  }

  const logoutSwal = () => {
    Swal.fire({
      icon: 'success',
      title: '登出成功',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'))
    reloadPage()
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
            setAuthToken('')
            logoutSwal()
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
            setAuthToken('')
            logoutSwal()
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
