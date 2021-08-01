import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import '../../../../styles/member/modal.scss'

function DeliveryDetailModal(props) {
  const { show, handleClose, memberId, deliveryId } = props

  const [didMount, setDidMount] = useState(true)
  const [deliveryFields, setDeliveryFields] = useState({
    deliveryId: '',
    status: '',
    deliveryTime: '',
    name: '',
    mobile: '',
    address: '',
    note: '',
    dishes: [{ dishName: '', dishCount: '' }],
    total: '',
  })

  // 取得詳細訂單資料
  const fetchDetailReservation = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/delivery/history/detail/${memberId}/${deliveryId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
    const data = response.data.data
    console.log(response)

    // 組合 dish_name, dish_count 成物件
    const dishes = () => {
      let dishesList = []
      data.forEach((v, i) => {
        dishesList.push({ dishName: v.dish_name, dishCount: v.dish_count })
      })

      return dishesList
    }

    // 設置新的
    const order = {
      deliveryId: data[0].delivery_id,
      status: data[0].status,
      deliveryTime: data[0].delivery_time,
      name: data[0].name,
      mobile: data[0].mobile,
      address: data[0].address,
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
        const order = await fetchDetailReservation()

        setDeliveryFields(order)
      }

      fetchData()
    }
  }, [deliveryId, didMount])

  return (
    <>
      <Modal className="show-detail" size="lg" show={show} onHide={handleClose}>
        <Modal.Header className="modal-header">
          <Modal.Title>
            <span className="modal-title h4" id="exampleModalLabel">
              訂單編號 #{deliveryFields.deliveryId}
            </span>
          </Modal.Title>
          <div>
            <span className="modal-title">{deliveryFields.status}</span>
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
                  <div className="col-6 mb-3 title">送餐時間</div>
                  <div className="col-6 mb-3 text-end">
                    {deliveryFields.deliveryTime}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">姓名</div>
                  <div className="col-6 mb-3 text-end">
                    {deliveryFields.name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3 title">電話</div>
                  <div className="col-6 mb-3 text-end">
                    {deliveryFields.mobile}
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 mb-3 title">地址</div>
                  <div class="col-8 mb-3 text-end">
                    {deliveryFields.address}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-1 title">備註</div>
                </div>
                <div className="row">
                  <div className="col-12">{deliveryFields.note}</div>
                </div>
              </div>
              <div className="col-6 right-part">
                <div className="row">
                  <div className="col-6 mb-3 title">餐點</div>
                  <div className="col-6 mb-3 title text-end">數量</div>
                </div>
                {deliveryFields.dishes.map((dish, i) => {
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
                    {deliveryFields.total}
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
export default DeliveryDetailModal
