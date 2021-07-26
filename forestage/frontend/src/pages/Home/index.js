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
//
import moment from 'moment'
import EightScreen from './sections/EightScreen'

function Home() {
  // 當天歌手資訊
  const [singerName, setSingerName] = useState()
  const [singerImg, setSingerImg] = useState()
  const [singerIntroduction, setSingetIntroduction] = useState()

  // 登入狀態
  const [loginState, setLoginState] = useState(false)

  let current = moment().format('MM/DD')
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
    })
  }, [])

  return (
    <>
      <div className="home">
        <FirstScreen
          singerName={singerName}
          singerImg={singerImg}
          singerDate={current}
        />
        <SecondScreen singerName={singerName} />
        <ThirdScreen
          singerName={singerName}
          singerImg={singerImg}
          singerIntroduction={singerIntroduction}
        />
        <FourthScreen />
        <FivethScreen />
        <SixthScreen />
        <SeventhScreen />
        <EightScreen />
      </div>
    </>
  )
}

export default Home
