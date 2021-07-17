import React, { useEffect, useState } from 'react'
import '../../styles/home/home.scss'
import $ from 'jquery'
import FirstScreen from './sections/FirstScreen'
import SecondScreen from './sections/SecondScreen'
import ThirdScreen from './sections/ThirdScreen'

function Home() {
  const [singerName, setSingerName] = useState()
  const [singerImg, setSingerImg] = useState()
  const [singerIntroduction, setSingetIntroduction] = useState()
  const [comment, setComment] = useState()
  // ComponentDidAmount
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
      {/* <FirstScreen singerName={singerName} singerImg={singerImg} />
      <SecondScreen /> */}
      <ThirdScreen
        singerName={singerName}
        singerImg={singerImg}
        singerIntroduction={singerIntroduction}
      />
    </>
  )
}

export default Home
