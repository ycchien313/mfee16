import React, { useEffect } from 'react'
import axios from 'axios'
import ReservationContent from './Content/ReservationContent'
import DishContent from './Content/DishContent/'
import ReservationPerson from './Content/ReservationPerson'

function Main(props) {
  const { dishList, checkList, insertResData, setInsertResData } = props
  function insertReservation() {
    axios({
      method: 'post',
      url: 'http://localhost:3001/reservation/checkout/send',
      data: {
        dishList,
        insertResData,
      },
    })
  }
  return (
    <>
      <main className="reservation-checkout">
        <div className="res-check">
          <div className="container-big">
            <div className="bread-crumb">
              <a href="" className="prev span">
                線上訂位
              </a>
              {'  /  '}
              <a href="" className="active span">
                訂位確認
              </a>
            </div>
            <ReservationContent checkList={checkList} />
            <DishContent
              dishList={dishList}
              insertResData={insertResData}
              setInsertResData={setInsertResData}
              checkList={checkList}
            />
            <ReservationPerson
              insertResData={insertResData}
              setInsertResData={setInsertResData}
            />

            <div className="check">
              <span className="info-text">
                本店採現場付款，訂單送出後您將收到 E-Mail 確認信。
              </span>
              <div className="buttons">
                <button className="guide-button back">
                  <img
                    src="http://localhost:3000/images/reservation/res_checkout/arrow-circle-left-solid.svg"
                    alt=""
                  />
                  修改訂位
                </button>
                <button
                  className="pink-guide-button"
                  onClick={() => {
                    insertReservation()
                  }}
                >
                  確認送出
                  <img
                    src="http://localhost:3000/images/reservation/res_checkout/arrow-circle-right-solid.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default Main
