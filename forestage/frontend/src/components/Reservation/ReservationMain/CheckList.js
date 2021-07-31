import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import StyledLink from '../StyledLink'

function CheckList(props) {
  const {
    checkList,
    setCheckList,
    dishList,
    setDishList,
    seatInfo,
    setShowAuthModal,
    showAuthModal,
    showClipboard,
    setShowClipboard
  } = props

  // const [showClipboard, setShowClipboard] = useState(true)
  const clipboardDisActClass = 'clipboard disactive'
  const clipboardActClass = 'clipboard'

  const ifLogin = Boolean(window.localStorage.getItem('authToken'))

  function handleSubmit(e) {
    const checkLoginSwal = withReactContent(Swal)
    if (checkIfDataOk() === false) {
      e.preventDefault()
      fireCheckDataAlert()
    } else if (ifLogin === false) {
      e.preventDefault()
      checkLoginSwal.fire({
        title: '請先登入會員',
        showConfirmButton: false,
        timer: 2000,
      })
      setTimeout(() => {
        setShowAuthModal(true)
      }, 2000)
    }
  }

  let iconClass = 'fas fa-check-circle'
  let activeIconClass = 'fas fa-check-circle active'
  const [checkData, setCheckData] = useState({
    date: false,
    seat: false,
    minOrder: false,
  })

  function fireCheckDataAlert() {
    const CheckDataSwal = withReactContent(Swal)
    let html = ''
    checkList.chosenDate === '' ? (html += '<p>請選擇日期<p/>') : (html += '')
    checkList.seatArea === '' ? (html += '<p>請選擇座位區<p/>') : (html += '')
    if (checkList.total <= checkList.minOrder || checkList.total === 0) {
      html += '<p>餐點未達低銷金額<p/>'
    }

    CheckDataSwal.fire({
      title: '您尚未完成訂位',
      html: html,
      icon: 'warning',
      buttonsStyling: false,
      didOpen: () => {
        html = ''
      },
    })
  }

  function checkIfDataOk() {
    let newCheckData = { ...checkData }
    checkList.chosenDate !== ''
      ? (newCheckData.date = true)
      : (newCheckData.date = false)
    checkList.seatArea !== ''
      ? (newCheckData.seat = true)
      : (newCheckData.seat = false)
    checkList.total >= checkList.minOrder && checkList.minOrder !== 0
      ? (newCheckData.minOrder = true)
      : (newCheckData.minOrder = false)
    console.log('chekData', newCheckData)
    if (
      newCheckData.date &&
      newCheckData.seat &&
      newCheckData.minOrder === true
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div class={showClipboard ? clipboardActClass : clipboardDisActClass}>
        <div
          className="close-button"
          onClick={() => {
            setShowClipboard(false)
          }}
        >
          <i class="fas fa-times"></i>
        </div>
        <div class="content">
          <div class="title">
            <h4>訂位資料</h4>
            <i class="fas fa-clipboard-list"></i>
          </div>
          <ul>
            <li>
              <div class="name">
                <i
                  class={
                    checkList.chosenDate !== '' ? activeIconClass : iconClass
                  }
                ></i>
                <span>日期</span>
              </div>
              <span class="detail">{checkList.chosenDate}</span>
            </li>
            <li>
              <div class="name">
                <i
                  class={checkList.singer !== '' ? activeIconClass : iconClass}
                ></i>
                <span>歌手</span>
              </div>
              <span class="detail">{checkList.singer}</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i
                  class={
                    checkList.seatArea !== '' ? activeIconClass : iconClass
                  }
                ></i>
                <span>座位區</span>
              </div>
              <span class="detail">{checkList.seatArea}</span>
            </li>
            <li>
              <div class="name">
                <i
                  class={checkList.attendance > 0 ? activeIconClass : iconClass}
                ></i>
                <span>訂位數量</span>
              </div>
              <span class="detail">{checkList.attendance}</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i
                  class={
                    checkList.total >= checkList.minOrder &&
                    checkList.minOrder !== 0
                      ? activeIconClass
                      : iconClass
                  }
                ></i>
                <span>低消金額</span>
              </div>
              <span class="detail">{checkList.minOrder}</span>
            </li>
            <li>
              <div class="name">
                <i
                  class="fas fa-check-circle"
                  style={{ visibility: 'hidden' }}
                ></i>
                <span>目前金額</span>
              </div>
              <span class="detail">{checkList.total}</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i
                  class={
                    checkList.total >= checkList.minOrder &&
                    checkList.total !== 0
                      ? activeIconClass
                      : iconClass
                  }
                ></i>
                <span>已選擇餐點</span>
              </div>
            </li>
            {dishList.map((v, i) => {
              if (v[1] > 0) {
                return (
                  <li>
                    <span>{v[0]}</span>
                    <span>{v[1]}</span>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <img
          src="http://localhost:3000/images/reservation/board-top.svg"
          alt=""
          className="clip"
        />
        <StyledLink
          onClick={(e) => {
            handleSubmit(e)
          }}
          to={{
            pathname: '/reservation/checkout',
            state: { checkList, dishList },
          }}
        >
          <button class="pink-guide-button">
            送出訂位
            <img
              src="http://localhost:3000/images/reservation/arrow-circle-right-solid.svg"
              alt=""
            />
          </button>
        </StyledLink>
      </div>
    </>
  )
}
export default CheckList
