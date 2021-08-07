import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import StyledLink from '../StyledLink'
// import { Tween } from 'react-gsap'
import { gsap } from 'gsap'

function CheckList(props) {
  const history = useHistory()
  const {
    checkList,
    setCheckList,
    dishList,
    setDishList,
    seatInfo,
    setShowAuthModal,
    showAuthModal,
    showClipboard,
    setShowClipboard,
    checkData,
    setCheckData,
    handleSubmit,
    reservationHistory,
    dataFromMember,
  } = props

  const clipboardDisActClass = 'clipboard disactive'
  const clipboardActClass = 'clipboard'

  let iconClass = 'fas fa-check-circle'
  let activeIconClass = 'fas fa-check-circle active'
  useEffect(() => {
    gsap.fromTo(
      '.fa-check-circle.active',
      { scaleX: 1.8, scaleY: 1.8, duration: 1, ease: 'power2.out' },
      { scaleX: 1.2, scaleY: 1.2, duration: 0.5 }
    )
  }, [checkList])
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
            history.push()
          }}
          to={{
            pathname: '/reservation/checkout',
            state: { checkList, dishList, reservationHistory, dataFromMember },
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
