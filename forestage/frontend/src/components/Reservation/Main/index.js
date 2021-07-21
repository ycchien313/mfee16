import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChooseDate from './ChooseDate'
import ChooseSeat from './ChooseSeat'
import ChooseMeal from './ChooseMeal'
import CheckList from './CheckList'

function Main() {
  const [seatInfo, setSeatInfo] = useState([])
  const [remainingSeat, setRemainingSeat] = useState([])
  const [seatCount, setSeatCount] = useState([])
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
    axios.get('http://127.0.0.1:3001/reservation/seat').then((result) => {
      setSeatInfo(result.data)
    })
  }, [])

  useEffect(() => {
    if (didMount) {
      // console.log(seatInfo[0].seat_id)
      let newObj = {}
      for (let i = 0; i < seatInfo.length; i++) {
        const foundRemainSeats = remainingSeat.find((item) => {
          return item.seat_id === seatInfo[i].seat_id
        })

        let totalSeats = foundRemainSeats
          ? foundRemainSeats.remainingSeats
          : seatInfo[i].totalSeats

        // let newId = seatInfo[i].seat_id
        console.log(seatInfo[i].seat_id, totalSeats)
        newObj[seatInfo[i].seat_id] = totalSeats
        console.log(newObj)
        setSeatCount(newObj)
      }

      // const rockSeatInfo = [...seatInfo].filter((seat) => {
      //   return seat.seat_id === 1
      // })
      // console.log(rockSeatInfo[0].totalSeats)
      // const rockSeatRemaining = [...remainingSeat].filter((seat) => {
      //   return seat.seat_id === 1
      // })
      // console.log(rockSeatRemaining[0].remainingSeats)
      // let newSeatCount =
      //   rockSeatInfo[0].totalSeats - rockSeatRemaining[0].remainingSeats
      // setSeatCount({ ...seatCount, 1: newSeatCount})
    }
  }, [remainingSeat])
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
  return (
    <>
      <main>
        <div class="container-big">
          <article class="main-article">
            <ChooseDate
              remainingSeat={remainingSeat}
              setRemainingSeat={setRemainingSeat}
              seatInfo={seatInfo}
              seatCount={seatCount}
              setSeatCount={setSeatCount}
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
