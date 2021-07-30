import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import '../../../../styles/member/modal.scss'

function ReservationDetailModal(props) {
  const { show, handleClose, memberId, reservationId } = props

  const [didMount, setDidMount] = useState(true)

  // 取得詳細訂單資料
  const fetchReservation = () => {
    const response = axios.get(
      `/reservation/recent/detail/:${memberId}/:${reservationId}`,
      { headers: {} }
    )
  }

  useEffect(() => {
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      // 取得後端資料
      const fetchData = async () => {
        const order = await fetchReservation()
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
              訂位編號 #123
            </span>
          </Modal.Title>
          <div>
            <span className="modal-title">已取消</span>
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
                  <div className="col-6 mb-3 text-end">2021/07/15</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">表演歌手</div>
                  <div className="col-6 mb-3 text-end">李龍號</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">座位區</div>
                  <div className="col-6 mb-3 text-end">搖滾區</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">人數</div>
                  <div className="col-6 mb-3 text-end">2</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">訂位姓名</div>
                  <div className="col-6 mb-3 text-end">王大明</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">電話</div>
                  <div className="col-6 mb-3 text-end">0912345678</div>
                </div>
                <div className="row">
                  <div className="col-12 mb-1 title">備註</div>
                </div>
                <div className="row">
                  <div className="col-12">
                    我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬我不要番茄醬
                  </div>
                </div>
              </div>
              <div className="col-6 right-part">
                <div className="row">
                  <div className="col-6 mb-3 title">餐點</div>
                  <div className="col-6 mb-3 title text-end">數量</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-1">瑪格莉特大披薩</div>
                  <div className="col-6 mb-1 text-end">4</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-1">瑪格莉特大披薩</div>
                  <div className="col-6 mb-1 text-end">4</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-1">瑪格莉特大披薩</div>
                  <div className="col-6 mb-1 text-end">4</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-1">瑪格莉特大披薩</div>
                  <div className="col-6 mb-1 text-end">4</div>
                </div>
                <div className="row">
                  <div className="col-6 mb-1 mt-3 title">總金額</div>
                  <div className="col-6 mb-1 mt-3 text-end">4000</div>
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
