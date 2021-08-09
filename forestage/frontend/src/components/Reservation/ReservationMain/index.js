import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import StyledLink from '../StyledLink'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from 'axios'
import ChooseDate from './ChooseDate'
import ChooseSeat from './ChooseSeat'
import ChooseMeal from './ChooseMeal'
import CheckList from './CheckList'

function Main(props) {
  const history = useHistory()

  // const { checkList, setCheckList } = props
  const { showAuthModal, setShowAuthModal, dateFromHome, dataFromMember } = props
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
  const [fromHistory, setFromHistory] = useState(true)
  const [reservationHistory, setReservationHistory] = useState({})

  const target = useRef(null)

  // 確認sessionstorage是否有該資料
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

  // 驗證訂位資料 Swal 
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

  // 檢查資料是否齊全
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

  // 取得欲修改之訂位資料
  function getReservation() {
    axios
      .get('http://localhost:3001/reservation/history', {
        params: {
          reservationId: dataFromMember.reservationId,
        },
      })
      .then(function (result) {
        console.log(result.data)
        let reservationInfo = result.data.reservationInfo[0]
        let seatName = result.data.seatName[0]
        let singerInfo = result.data.singerInfo[0]
        let reservationDish = result.data.reservationDish
        let gotReservationHistory = {
          reservationInfo,
          reservationDish,
          seatName,
          singerInfo,
        }
        setReservationHistory(gotReservationHistory)
        console.log(reservationInfo)
        // 修改欲存入session中checklist
        let newCheckList = { ...checkList }
        newCheckList.attendance = reservationInfo.attendance
        newCheckList.chosenDate = reservationInfo.date
        newCheckList.seatId = reservationInfo.seat_id
        newCheckList.total = reservationInfo.total
        newCheckList.seatArea = seatName.name
        newCheckList.singer = singerInfo.name
        newCheckList.singerPic = singerInfo.picture
        newCheckList.minOrder =
          seatName.minimum_order * reservationInfo.attendance
        console.log(newCheckList)
        setFromHistory(false)

        setCheckList(newCheckList)
        window.sessionStorage.setItem('checkList', JSON.stringify(newCheckList))
      })
  }

  useEffect(() => {
    setDidMount(true)

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
      let newSeatCount = JSON.parse(sessionStorage.getItem('seatCount'))
      let keyArr = Object.keys(newSeatCount)
      let newObj = {}
      keyArr.forEach((v) => {
        newObj[+v] = newSeatCount[v]
      })

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
      // window.sessionStorage.setItem('checkList', JSON.stringify(checkList))
      window.sessionStorage.setItem('seatCount', JSON.stringify(seatCount))
      window.sessionStorage.setItem('seatInfo', JSON.stringify(seatInfo))
    }
  }, [remainingSeat, seatCount, seatInfo])
  
  useEffect(() => {
    // 若從我的訂位紀錄來，則先修改欲存入session中資料
    // 只抓第一次
    if (fromHistory &&  dataFromMember.prevPath === '/member/reservation') {
      getReservation()
    }
    if (didMount) {
      window.sessionStorage.setItem('checkList', JSON.stringify(checkList))
    }
  }, [checkList])

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
              dateFromHome={dateFromHome}
              reservationHistory={reservationHistory}
              dataFromMember={dataFromMember}
            />
            <ChooseSeat
              seatInfo={seatInfo}
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              checkList={checkList}
              setCheckList={setCheckList}
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
              reservationHistory={reservationHistory}
              dataFromMember={dataFromMember}
            />
            <ChooseMeal
              checkList={checkList}
              setCheckList={setCheckList}
              dishList={dishList}
              setDishList={setDishList}
              reservationHistory={reservationHistory}
              dataFromMember={dataFromMember}
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
              reservationHistory={reservationHistory}
              dataFromMember={dataFromMember}
            />
          </aside>
        </div>
      </main>
      <div className="table-bg reservation"></div>
      <div className="reservation bottom">
        <StyledLink
          onClick={(e) => {
            handleSubmit(e)
            history.push()
          }}
          to={{
            pathname: '/reservation/checkout',
            state: { checkList, dishList, reservationHistory },
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
