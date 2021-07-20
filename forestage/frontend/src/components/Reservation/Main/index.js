import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChooseDate from './ChooseDate'
import ChooseSeat from './ChooseSeat'
import ChooseMeal from './ChooseMeal'
import CheckList from './CheckList'

function Main() {
  const [seatInfo, setSeatInfo] = useState()
  const [remainingSeat, setRemainingSeat] = useState()
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/reservation/seat').then((result) => {
      // console.log(result.data[0].name)
      setSeatInfo(result.data)

    })

    let reservationInfo = [
      '2021-07-31',
      1,
      2,
      '王曉華',
      '0912344455',
      2000,
      '我是測試用的備註',
      1,
      1,
      '未完成',
    ]
    let [
      date,
      seat_id,
      attendance,
      name,
      mobile,
      total,
      note,
      member_id,
      mcm_id,
      stauts,
    ] = reservationInfo

    // axios({
    //   method: 'post',
    //   url: 'http://127.0.0.1:3001/reservation/checkout/send',
    //   data: {
    //     reservationInfo: {
    //       date,
    //       seat_id,
    //       attendance,
    //       name,
    //       mobile,
    //       total,
    //       note,
    //       member_id,
    //       mcm_id,
    //       stauts,
    //   },
    //   },
    // }).then(() => {
    //   console.log('aaa')
    // })
  }, [])
  return (
    <>
      <main>
        <div class="container-big">
          <article class="main-article">
            <ChooseDate
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
              seatInfo={seatInfo}
            />
            <ChooseSeat />
            <ChooseMeal />
          </article>
          <aside class="aside-list">
            <CheckList />
          </aside>
        </div>
      </main>
      <div class="table-bg"></div>
    </>
  )
}

export default Main
