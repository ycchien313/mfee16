import React, { useEffect, useState } from 'react'

import axios from 'axios'
import ChooseDate from './ChooseDate'
import ChooseSeat from './ChooseSeat'
import ChooseMeal from './ChooseMeal'
import CheckList from './CheckList'

function Main(props) {
  // const { checkList, setCheckList } = props
  const { showAuthModal, setShowAuthModal } = props
  const [seatInfo, setSeatInfo] = useState([])
  const [remainingSeat, setRemainingSeat] = useState([])
  const [seatCount, setSeatCount] = useState([])
  const [didMount, setDidMount] = useState(false)
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

  const [dishList, setDishList] = useState([])

  const checkRemainingSeat = Boolean(sessionStorage.getItem('remainingSeat'))
  const checkSeatCount = Boolean(sessionStorage.getItem('seatCount'))
  const checkCheckList = Boolean(sessionStorage.getItem('checkList'))
  const checkSeatInfo = Boolean(sessionStorage.getItem('seatInfo'))

  useEffect(() => {
    setDidMount(true)
    axios.get('http://127.0.0.1:3001/reservation/seat').then((result) => {
      setSeatInfo(result.data)
    })

    checkRemainingSeat &&
      setRemainingSeat(
        JSON.parse(window.sessionStorage.getItem('remainingSeat'))
      )
    // checkSeatCount && setSeatCount(JSON.parse(window.sessionStorage.getItem('seatCount')))
    checkCheckList &&
      setCheckList(JSON.parse(window.sessionStorage.getItem('checkList')))
    checkSeatInfo &&
      setSeatInfo(JSON.parse(window.sessionStorage.getItem('seatInfo')))

    // 將key轉回int(ID)
    if (checkSeatCount) {
      console.log(seatInfo, 'sinfo')
      let newSeatCount = JSON.parse(sessionStorage.getItem('seatCount'))
      let keyArr = Object.keys(newSeatCount)
      let newObj = {}
      keyArr.forEach((v) => {
        newObj[+v] = newSeatCount[v]
      })
      console.log(newObj)
      setSeatCount(newObj)
    }
  }, [])

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

      // setSeatCount(newObj)
    }
  }, [remainingSeat, seatCount, checkList, seatInfo])

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


  return (
    <>
      <main className="reservation">
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
              remainingSeat={remainingSeat}
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
            />
          </aside>
        </div>
      </main>
      <div class="table-bg reservation"></div>
    </>
  )
}

export default Main
