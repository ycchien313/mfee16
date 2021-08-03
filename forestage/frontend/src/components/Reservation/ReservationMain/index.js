import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import StyledLink from '../StyledLink'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from 'axios'
import ChooseDate from './ChooseDate'
import ChooseSeat from './ChooseSeat'
import ChooseMeal from './ChooseMeal'
import CheckList from './CheckList'

function Main(props) {
  // const { checkList, setCheckList } = props
  const { showAuthModal, setShowAuthModal} = props
  const [seatInfo, setSeatInfo] = useState([])
  const [remainingSeat, setRemainingSeat] = useState([])
  const [seatCount, setSeatCount] = useState([])
  const [didMount, setDidMount] = useState(false)
  const [dishList, setDishList] = useState([])
  const [checkList, setCheckList] = useState({
    chosenDate: '',
    singer: '',
    singerPic: '',
    seatArea: '',
    seatId: 0,
    attendance: 0,
    minOrder: 0,
    total: 0,
  })
  // 手機版clipboard開關
  const [showClipboard, setShowClipboard] = useState(false)
  const [checkData, setCheckData] = useState({
    date: false,
    seat: false,
    minOrder: false,
  })

  const target = useRef(null)

  const checkRemainingSeat = Boolean(sessionStorage.getItem('remainingSeat'))
  const checkSeatCount = Boolean(sessionStorage.getItem('seatCount'))
  const checkCheckList = Boolean(sessionStorage.getItem('checkList'))
  const checkSeatInfo = Boolean(sessionStorage.getItem('seatInfo'))

  const ifLogin = Boolean(window.localStorage.getItem('authToken'))

  // 驗證登入
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
        timer: 1500,
      })
      setTimeout(() => {
        setShowAuthModal(true)
      }, 2000)
    }
  }

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
    // console.log('chekData', newCheckData)
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

  useEffect(() => {
    setDidMount(true)
    // axios.get('http://127.0.0.1:3001/reservation/seat').then((result) => {
    //   setSeatInfo(result.data)
    // })

    // 將sessionStorage狀態存入狀態
    checkRemainingSeat &&
      setRemainingSeat(
        JSON.parse(window.sessionStorage.getItem('remainingSeat'))
      )
    checkCheckList &&
      setCheckList(JSON.parse(window.sessionStorage.getItem('checkList')))
    checkSeatInfo &&
      setSeatInfo(JSON.parse(window.sessionStorage.getItem('seatInfo')))

    // 將sessionStorage中seatCount的key轉回int(ID)後，存入狀態
    if (checkSeatCount) {
      // console.log(seatInfo, 'sinfo')
      let newSeatCount = JSON.parse(sessionStorage.getItem('seatCount'))
      let keyArr = Object.keys(newSeatCount)
      let newObj = {}
      keyArr.forEach((v) => {
        newObj[+v] = newSeatCount[v]
      })
      // console.log(newObj)
      setSeatCount(newObj)
    }
  }, [])

  useEffect(() => {
    // 拖曳事件
    let dragTarget = document.getElementById('dragTarget')
    let stickyAncester = document.querySelector('.sticky-ancester')

    // 點擊target後無法立即讀到dom物件，因此加此判斷式
    if (target.current !== null) {
      // 計算sticky外層高度
      if (document.body.clientWidth < 768) {
        stickyAncester.style.height = document.body.clientHeight + 'px'
      }

      // icon 初始位置
      dragTarget.style.left = document.body.clientWidth * 0.8 + 'px'

      dragTarget.addEventListener('touchmove', function (e) {
        // grab the location of touch
        var touchLocation = e.targetTouches[0]

        e.preventDefault()
        // console.log(document.body.clientWidth)
        // assign box new coordinates based on the touch.
        dragTarget.style.left = touchLocation.pageX - 20 + 'px'
      })
    }
  }, [showClipboard])

  // 將state存入sessionStorage
  useEffect(() => {
    if (didMount) {
      window.sessionStorage.setItem(
        'remainingSeat',
        JSON.stringify(remainingSeat)
      )
      window.sessionStorage.setItem('checkList', JSON.stringify(checkList))
      window.sessionStorage.setItem('seatCount', JSON.stringify(seatCount))
      window.sessionStorage.setItem('seatInfo', JSON.stringify(seatInfo))
    }
  }, [remainingSeat, seatCount, checkList, seatInfo])

  // 計算各區剩餘座位數量
  // function getSeatCount() {
  //   let newObj = {}
  //   for (let i = 0; i < seatInfo.length; i++) {
  //     const foundRemainSeats = remainingSeat.find((item) => {
  //       return item.seat_id === seatInfo[i].seat_id
  //     })

  //     let totalSeats = foundRemainSeats
  //       ? foundRemainSeats.remainingSeats
  //       : seatInfo[i].totalSeats

  //     // let newId = seatInfo[i].seat_id
  //     newObj[seatInfo[i].seat_id] = totalSeats
  //     setSeatCount(newObj)
  //   }
  // }

  // useEffect(() => {
  //   if (didMount) {
  //     getSeatCount()
  //   }
  // }, [remainingSeat])

  return (
    <>
      <main className="reservation">
        <div className="sticky-ancester">
          <div className="list-move-zone">
            {showClipboard ? (
              <></>
            ) : (
              <img
                className="order-list-icon"
                id="dragTarget"
                src="http://localhost:3000/images/common/order-list-icon.svg"
                onClick={() => {
                  setShowClipboard(true)
                }}
                ref={target}
                alt=""
              />
            )}
          </div>
        </div>
        <div class="container-big">
          <article class="main-article">
            <ChooseDate
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
              seatInfo={seatInfo}
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              setCheckList={setCheckList}
              checkList={checkList}
              setSeatInfo={setSeatInfo}
            />
            <ChooseSeat
              seatInfo={seatInfo}
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              checkList={checkList}
              setCheckList={setCheckList}
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
            />
            <ChooseMeal
              checkList={checkList}
              setCheckList={setCheckList}
              dishList={dishList}
              setDishList={setDishList}
            />
          </article>
          <aside class="aside-list">
            <CheckList
              checkList={checkList}
              setCheckList={setCheckList}
              dishList={dishList}
              setDishList={setDishList}
              seatInfo={seatInfo}
              showAuthModal={showAuthModal}
              setShowAuthModal={setShowAuthModal}
              showClipboard={showClipboard}
              setShowClipboard={setShowClipboard}
              checkData={checkData}
              setCheckData={setCheckData}
              handleSubmit={handleSubmit}
            />
          </aside>
        </div>
      </main>
      <div className="table-bg reservation"></div>
      <div className="reservation bottom">
        <StyledLink
          onClick={(e) => {
            handleSubmit(e)
          }}
          to={{
            pathname: '/reservation/checkout',
            state: { checkList, dishList },
          }}
        >
          <button className="pink-guide-button bottom">
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

export default Main
