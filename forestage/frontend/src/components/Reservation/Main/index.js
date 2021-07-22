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
  const [checkList, setCheckList] = useState({
    chosenDate: '',
    singer: '',
    seatArea: '',
    attendance: 0,
    minOrder: 0,
    total: 0,
  })
  const [dishList, setDishList] = useState([])

  useEffect(() => {
    setDidMount(true)
    axios.get('http://127.0.0.1:3001/reservation/seat').then((result) => {
      setSeatInfo(result.data)
    })
  }, [])

  // console.log(seatInfo[1].name)

  // 計算各區剩餘座位數量
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
        newObj[seatInfo[i].seat_id] = totalSeats
        setSeatCount(newObj)
      }
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
              setCheckList={setCheckList}
              checkList={checkList}
            />
            <ChooseSeat
              seatInfo={seatInfo}
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              checkList={checkList}
              setCheckList={setCheckList}
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
            />
          </aside>
        </div>
      </main>
      <div class="table-bg"></div>
    </>
  )
}

export default Main
