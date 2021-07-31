import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import '../../../../styles/member/modal.scss'

function ReservationDetailModal(props) {
  const { show, handleClose, memberId, reservationId } = props

  const [didMount, setDidMount] = useState(true)
  const [reservationFields, setReservationFields] = useState({
    reservationId: '',
    status: '',
    date: '',
    singerName: '',
    seatName: '',
    attendance: '',
    name: '',
    mobile: '',
    note: '',
    dishes: [{ dishName: '', dishCount: '' }],
    total: '',
  })

  // 取得詳細訂單資料
  const fetchReservation = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/reservation/recent/detail/${memberId}/${reservationId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
    const data = response.data.data

    // 組合 dish_name, dish_count 成物件
    const dishes = () => {
      let dishesList = []
      data.forEach((v, i) => {
        dishesList.push({ dishName: v.dish_name, dishCount: v.dish_count })
      })

      return dishesList
    }

    const order = {
      reservationId: data[0].reservation_id,
      status: data[0].status,
      date: data[0].date,
      singerName: data[0].singer_name,
      seatName: data[0].seat_name,
      attendance: data[0].attendance,
      name: data[0].name,
      mobile: data[0].mobile,
      note: data[0].note,
      dishes: dishes(),
      total: data[0].total,
    }

    return order
  }

  useEffect(() => {
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      // 取得後端資料
      const fetchData = async () => {
        const order = await fetchReservation()

        setReservationFields(order)
      }

      fetchData()
    }
  }, [reservationId])

  return (
    <>
      <Modal className="show-detail" size="lg" show={show} onHide={handleClose}>
        <Modal.Header className="modal-header">
          <Modal.Title>
            <span className="modal-title h4" id="exampleModalLabel">
              訂位編號 #{reservationFields.reservationId}
            </span>
          </Modal.Title>
          <div>
            <span className="modal-title">{reservationFields.status}</span>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-6 left-part">
                <div className="row">
                  <div className="col-6 mb-3 title">訂位日期</div>
                  <div className="col-6 mb-3 text-end">
                    {reservationFields.date}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">表演歌手</div>
                  <div className="col-6 mb-3 text-end">
                    {reservationFields.singerName}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">座位區</div>
                  <div className="col-6 mb-3 text-end">
                    {reservationFields.seatName}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">人數</div>
                  <div className="col-6 mb-3 text-end">
                    {reservationFields.attendance}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">訂位姓名</div>
                  <div className="col-6 mb-3 text-end">
                    {reservationFields.name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">電話</div>
                  <div className="col-6 mb-3 text-end">
                    {reservationFields.mobile}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-1 title">備註</div>
                </div>
                <div className="row">
                  <div className="col-12">{reservationFields.note}</div>
                </div>
              </div>
              <div className="col-6 right-part">
                <div className="row">
                  <div className="col-6 mb-3 title">餐點</div>
                  <div className="col-6 mb-3 title text-end">數量</div>
                </div>
                {reservationFields.dishes.map((dish, i) => {
                  return (
                    <>
                      <div className="row" key={i}>
                        <div className="col-6 mb-1">{dish.dishName}</div>
                        <div className="col-6 mb-1 text-end">
                          {dish.dishCount}
                        </div>
                      </div>
                    </>
                  )
                })}
                <div className="row">
                  <div className="col-6 mb-1 mt-3 title">總金額</div>
                  <div className="col-6 mb-1 mt-3 text-end">
                    {reservationFields.total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary close-button"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            關閉
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ReservationDetailModal
