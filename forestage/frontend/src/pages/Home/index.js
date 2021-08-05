import React, { useEffect, useState } from 'react'
import '../../styles/home/home.scss'
import $ from 'jquery'
// Screens
import FirstScreen from './sections/FirstScreen'
import SecondScreen from './sections/SecondScreen'
import ThirdScreen from './sections/ThirdScreen'
import FourthScreen from './sections/FourthScreen'
import FivethScreen from './sections/FivthScreen'
import SixthScreen from './sections/SixthScreen'
import SeventhScreen from './sections/SeventhScreen'
import EightScreen from './sections/EightScreen'
//
import moment from 'moment'

// header
import Header from '../../components/Header'
// footer
import Footer from '../../components/Footer'
function Home() {
  // 當天歌手資訊
  const [singerName, setSingerName] = useState()
  const [singerImg, setSingerImg] = useState()
  const [singerIntroduction, setSingetIntroduction] = useState()
  const [singerDate, setSingerDate] = useState()

  // 登入狀態
  const [loginDetail, setLoginDetail] = useState()
  const [memberId, setMemberId] = useState(0)
  const [authToken, setAuthToken] = useState()
  const [loginState, setLoginState] = useState(false)
  const [all, setAll] = useState({})
  const [cart, setCart] = useState([])
  const [item, setItem] = useState([])
  let current = moment().format('MM/DD')
  const [loading, setLoading] = useState(false)
  // ComponentDidmount
  useEffect(() => {
    // 取得當天表演者資訊
    $.ajax({
      url: 'http://localhost:3001/home/singer_today',
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setSingerName(result.name)
      setSingerImg(result.picture)
      setSingetIntroduction(result.introduction)
      // 處理時間格式
      let fullDate = [...result.date]
      let date = fullDate.slice(5).join('').replace(/-/g, '/')
      setSingerDate(date)
    })
    $('.home').on('click', function () {
      $('.cart-big').addClass('disabled')
      $('.cart-small').addClass('disabled')
      $('.header-cart').removeClass('active')
    })
    let result = localStorage.getItem('authToken')
    setAuthToken(result)
    // console.log('token:', result)
  }, [])
  useEffect(() => {
    // memberId get
    // console.log('辨識用')
    let token = localStorage.getItem('authToken')
    // console.log(token)
    setAuthToken(token)

    $.ajax({
      url: 'http://localhost:3001/auth/me',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).then(function (result) {
      // console.log(result)
      setMemberId(result.memberId)
    })

    $.ajax({
      url: `http://localhost:3001/member_state/${memberId}`,
      method: 'GET',
      dataType: 'JSON',
    }).then(function (result) {
      // console.log(result[0].memberId)
    })
  }, [])

  return (
    <>
      <Header item={item} setItem={setItem} />
      <div className="home">
        <FirstScreen
          singerName={singerName}
          singerImg={singerImg}
          singerDate={singerDate}
        />
        <SecondScreen singerName={singerName} singerDate={singerDate} />
        <ThirdScreen
          singerName={singerName}
          singerImg={singerImg}
          singerIntroduction={singerIntroduction}
        />
        <FourthScreen memberId={memberId} authToken={authToken} />
        <FivethScreen />
        <SixthScreen />
        <SeventhScreen />
        <EightScreen all={all} setAll={setAll} item={item} setItem={setItem} />
        <Footer />
      </div>
    </>
  )
}

export default Home
