import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../Header/'
import Hero from './ReservationCheckoutMain/Hero'
import Main from './ReservationCheckoutMain/'
import '../../styles/reservation/res_checkout/res_check.scss'
import axios from 'axios'
import Footer from '../Footer/'

// import Footer from '../../components/Footer'

function CheckoutPage(props) {
  // const { reservationHistory } = props.location.state
  // console.log(props.location.state.reservationHistory, 'checkout page')
  const history = useHistory()
  // const { checkList, setCheckList, test } = props
  const [dishList, setDishList] = useState([])
  const [checkList, setCheckList] = useState({})
  const [didMount, setDidMount] = useState(false)
  const [memberId, setMemberId] = useState(0)
  const [insertResData, setInsertResData] = useState({
    date: '',
    seat_id: 0,
    attendance: 0,
    name: '',
    mobile: '',
    total: 0,
    note: '',
    member_id: 1,
    mcm_id: 0,
    status: '未完成',
  })
  const [fromHistory, setFromHistory] = useState(true)
  let reservationId = 0
  if (props.location.state !== undefined) {
    reservationId = props.location.state.dataFromMember.reservationId
  }

  const checkInsertResData = Boolean(sessionStorage.getItem('insertResData'))
  // 載入時取得會員id
  // // 取得memberid，存入memberId狀態
  function getMemberIdAndResInfo() {
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
        let newInsertResData = { ...insertResData }
        newInsertResData.date = checkList.chosenDate
        newInsertResData.seat_id = checkList.seatId
        newInsertResData.attendance = checkList.attendance
        newInsertResData.total = checkList.total
        newInsertResData.member_id = result.data.memberId

        setInsertResData(newInsertResData)
      })
  }
  useEffect(() => {
    setDidMount(true)
    window.scrollTo(0, 0)

    // 將歷史訂位人資料帶入
    // 加入判斷條件?
    // if (props.location.state !== undefined) {
    //   let newInsertResData = { ...insertResData }
    //   newInsertResData.name =
    //     props.location.state.reservationHistory.reservationInfo.name
    //   newInsertResData.mobile =
    //     props.location.state.reservationHistory.reservationInfo.mobile
    //   setInsertResData(newInsertResData)
    // }

    if (props.location.state !== undefined) {
      setDishList(props.location.state.dishList)
      setCheckList(props.location.state.checkList)
    } else {
      // 如果沒有從訂位頁面得到props.location，則導回訂位頁面
      history.push('/reservation')
    }

    // 如果已經拜訪過此頁，則讀取session storage資訊
    checkInsertResData &&
      setInsertResData(
        JSON.parse(window.sessionStorage.getItem('insertResData'))
      )

    if (
      props.location.state !== undefined &&
      props.location.state.dataFromMember.prevPath === '/member/reservation'
    ) {
      let newInsertResData = { ...insertResData }
      newInsertResData.name =
        props.location.state.reservationHistory.reservationInfo.name
      newInsertResData.mobile =
        props.location.state.reservationHistory.reservationInfo.mobile
      setInsertResData(newInsertResData)
    }
  }, [])

  useEffect(() => {
    // 將訂位頁資料帶入insert物件中，使用didMount避免帶入空的coupon id與備註
    if (didMount) {
      getMemberIdAndResInfo()
    }
  }, [checkList])

  // 將insertResData存入sessionStorage
  useEffect(() => {
    window.sessionStorage.setItem(
      'insertResData',
      JSON.stringify(insertResData)
    )
  }, [insertResData])

  return (
    <>
      <Header />
      <Hero />
      <Main
        dishList={dishList}
        checkList={checkList}
        insertResData={insertResData}
        setInsertResData={setInsertResData}
        memberId={memberId}
        setMemberId={setMemberId}
        reservationId={reservationId}
      />
      <Footer />
    </>
  )
}

export default CheckoutPage
