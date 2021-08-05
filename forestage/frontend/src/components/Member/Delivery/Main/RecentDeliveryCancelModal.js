import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../../../styles/member/modal.scss'

function RecentDeliveryCancelModal(props) {
  const { showCancelModal, handleClose, memberId, deliveryId } = props

  return (
    <>
      <Modal className="cancel" show={showCancelModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>訂單編號#12346</Modal.Title>
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
              <div class="col-12 h4">您要取消此筆訂單嗎？</div>
            </div>
            <div class="row mb-3">
              <div class="col-6 left-part">訂餐時間</div>
              <div class="col-6 right-part">2021/08/22 18:00</div>
            </div>
            <div class="row mb-3">
              <div class="col-6 left-part">餐點內容</div>
              <div class="col-6 right-part count">數量</div>
            </div>
            <div class="row mb-1">
              <div class="col-6 left-part dish">瑪格莉特大披薩</div>
              <div class="col-6 right-part dish">2</div>
            </div>
            <div class="row mb-1">
              <div class="col-6 left-part dish">總匯潛艇堡</div>
              <div class="col-6 right-part dish">2</div>
            </div>
            <div class="row mb-1">
              <div class="col-6 left-part dish">草莓蛋糕</div>
              <div class="col-6 right-part dish">1</div>
            </div>
            <div class="row my-3">
              <div class="col-6 left-part">總金額</div>
              <div class="col-6 right-part">4000</div>
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
          <button type="button" class="btn btn-primary orange">
            取消訂餐
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RecentDeliveryCancelModal
