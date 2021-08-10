import React, { useState, useEffect } from 'react'
import '../../styles/game/musicTestResult.scss'
import '../../styles/common/global.scss'
import axios from 'axios'
import $ from 'jquery'
import Auth from '../../components/Auth'
import Header from '../../components/Header/'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HashLink as Link } from 'react-router-hash-link'

function GameResult(props) {
  const result = props.result
  const setGoResult = props.setGoResult
  const [authToken, setAuthToken] = useState('')
  const [memberId, setMemberId] = useState(0)
  const [login, setLogin] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const setQuestionNumber = props.setQuestionNumber
  function getCoupon() {
    if (Boolean(localStorage.getItem('authToken'))) {
      axios
        .post('http://localhost:3001/game/getCoupon', {
          memberId: memberId,
        })
        .then(function (response) {
          console.log(response)
          const CheckDataSwal = withReactContent(Swal)
          CheckDataSwal.fire({
            title: '您的訂位已送出',
            icon: 'success',
          })
        })
    } else {
      setShowAuthModal(true)
    }
  }

  useEffect(() => {
    // let token = localStorage.getItem('authToken')
    // setAuthToken(token)

    // $.ajax({
    //   url: 'http://localhost:3001/auth/me',
    //   method: 'GET',
    //   dataType: 'JSON',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then(function (result) {
    //   setMemberId(result.memberId)
    // })
    let authToken = window.localStorage.getItem('authToken')
    // console.log('auth', authToken)
    axios
      .get('http://localhost:3001/auth/me', {
        method: 'get',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        setMemberId(result.data.memberId)
      })
  }, [])

  return (
    <>
      <Header />
      <div className="musicTestResult">
        <main className="music-main">
          <div className="wrapper-m">
            <div className="title1">
              <span className="h2 elfin"></span>
              <span className="h2 test-title"></span>
            </div>
            <div className="game-bg">
              <div className="question">
                <div className="elfin-avatar"></div>
                <div className="question-box">
                  <div className="triangle"></div>
                  <div className="box h4">你的音樂類型是…</div>
                </div>
              </div>
              <div className="result-card">
                <h2 className="main-title">{result[0]}</h2>
                <figure className="style-pic">
                  <img
                    src={'http://localhost:3000/images/game/' + result[1]}
                    alt=""
                  />
                </figure>
                <h4 className="recommend">推薦歌手</h4>
                <h3 className="singer-name">{result[2]}</h3>
                <p className="style-text">{result[3]}</p>
              </div>
              <div className="button-group">
                <div
                  className="again-button"
                  onClick={() => {
                    setQuestionNumber(1)
                    setGoResult(false)
                  }}
                >
                  <img
                    src="http://localhost:3000/images/game/redo-solid.svg"
                    alt=""
                  />
                </div>
                <div
                  className="guide-button orange h4 get-coupon"
                  onClick={function () {
                    getCoupon()
                    const CheckDataSwal = withReactContent(Swal)
                    if (Boolean(localStorage.getItem('authToken'))) {
                      CheckDataSwal.fire({
                        title: '恭喜獲得折價券',
                        icon: 'success',
                        buttonsStyling: false,
                      })
                    }
                  }}
                >
                  領折價券
                </div>
                <Link className="link" to="/#fourthScreen">
                  <div className="guide-button orange next h4 ">
                    去投票
                    <div className="icon"></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {showAuthModal && (
            <Auth
              showAuthModal={showAuthModal}
              setShowAuthModal={setShowAuthModal}
            />
          )}
        </main>
      </div>
    </>
  )
}

export default GameResult
