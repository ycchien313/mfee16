import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import '../../../../styles/member/modal.scss'

function RecentReservationCancelModal(props) {
  const { showCancelModal, handleClose, memberId, orders, reservationId } =
    props
  const history = useHistory()
  const [order, setOrder] = useState({ date: '', seatName: '', attendance: '' })
  const [dataLoading, setDataLoading] = useState(false)

  const updateReservationFromServer = async () => {
    await axios.put(
      `http://localhost:3001/member/reservation/cancel/${memberId}/${reservationId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
  }

  useEffect(() => {
    if (showCancelModal === true) {
      for (let i = 0; i < orders.length; i++) {
        if (reservationId === orders[i].reservation_id) {
          setOrder({
            date: orders[i].date,
            seatName: orders[i].seat_name,
            attendance: orders[i].attendance,
          })
        }
      }
    }
  }, [showCancelModal])

  const loading = (
    <>
      <div className="text-center">
        <img
          src={process.env.PUBLIC_URL + '/images/member/spinner.svg'}
          alt=""
        ></img>
      </div>
    </>
  )

  return (
    <>
      <Modal className="cancel" show={showCancelModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h4">訂位編號#{reservationId}</Modal.Title>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              handleClose()
            }}
          ></button>
        </Modal.Header>
        {dataLoading ? (
          loading
        ) : (
          <>
            <Modal.Body>
              <div class="container">
                <div class="row mb-3">
                  <div class="col-12 h4">您要取消此次訂位嗎？</div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 left-part">訂位日期</div>
                  <div class="col-6 right-part">{order.date}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 left-part">座位區</div>
                  <div class="col-6 right-part">{order.seatName}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 left-part">人數</div>
                  <div class="col-6 right-part">{order.attendance}</div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary close-button"
                onClick={() => {
                  handleClose()
                }}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary orange"
                onClick={() => {
                  updateReservationFromServer()
                  setDataLoading(true)
                  setTimeout(() => {
                    handleClose()
                    history.go(0)
                  }, 1000)
                }}
              >
                取消訂位
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  )
}

export default RecentReservationCancelModal
