import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../../../styles/member/modal.scss'

function RecentReservationCancelModal(props) {
  const { showCancelModal, handleClose, memberId, reservationId } = props
  return (
    <>
      <Modal className="cancel" show={showCancelModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h4">訂位編號#12346</Modal.Title>
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
        <Modal.Body>
          <div class="container">
            <div class="row mb-3">
              <div class="col-12 h4">您要取消此次訂位嗎？</div>
            </div>
            <div class="row mb-3">
              <div class="col-6 left-part">訂位日期</div>
              <div class="col-6 right-part">2021/08/22</div>
            </div>
            <div class="row mb-3">
              <div class="col-6 left-part">座位區</div>
              <div class="col-6 right-part">搖滾區</div>
            </div>
            <div class="row mb-3">
              <div class="col-6 left-part">人數</div>
              <div class="col-6 right-part">2</div>
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
          <button type="button" className="btn btn-primary orange">
            取消訂位
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RecentReservationCancelModal
