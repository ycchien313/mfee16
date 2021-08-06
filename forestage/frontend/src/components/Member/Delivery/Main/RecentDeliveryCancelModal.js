import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import '../../../../styles/member/modal.scss'

function RecentDeliveryCancelModal(props) {
  const { showCancelModal, handleClose, memberId, orders, deliveryId } = props
  const history = useHistory()
  const [dataLoading, setDataLoading] = useState(false)
  const [order, setOrder] = useState({
    deliveryTime: '',
    dishes: [],
    total: '',
  })

  const updateReservationFromServer = () => {
    axios.put(
      `http://localhost:3001/member/delivery/cancel/${memberId}/${deliveryId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json, charset=utf-8',
        },
      }
    )
  }

  useEffect(() => {
    if (showCancelModal === true) {
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].deliveryId === deliveryId) {
          setOrder({
            deliveryTime: orders[i].deliveryTime,
            dishes: orders[i].dishes,
            total: orders[i].total,
          })
          return
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
          <Modal.Title>訂單編號#{deliveryId}</Modal.Title>
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
                  <div class="col-12 h4">您要取消此筆訂單嗎？</div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 left-part">訂餐時間</div>
                  <div class="col-6 right-part">{order.deliveryTime}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 left-part">餐點內容</div>
                  <div class="col-6 right-part count">數量</div>
                </div>
                {order.dishes.map((v, i) => {
                  return (
                    <>
                      <div class="row mb-1">
                        <div class="col-6 left-part dish">{v.dishName}</div>
                        <div class="col-6 right-part dish">{v.dishCount}</div>
                      </div>
                    </>
                  )
                })}
                <div class="row my-3">
                  <div class="col-6 left-part">總金額</div>
                  <div class="col-6 right-part">{order.total}</div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                class="btn btn-secondary close-button"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleClose()
                }}
              >
                關閉
              </button>
              <button
                type="button"
                class="btn btn-primary orange"
                onClick={() => {
                  updateReservationFromServer()
                  setDataLoading(true)
                  setTimeout(() => {
                    handleClose()
                    history.go(0)
                  }, 1000)
                }}
              >
                取消訂餐
              </button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  )
}

export default RecentDeliveryCancelModal
