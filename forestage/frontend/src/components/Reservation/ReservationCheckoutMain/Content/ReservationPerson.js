import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

function ReservationPerson(props) {
  const { insertResData, setInsertResData, dishList } = props

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

  const CheckDataSwal = withReactContent(Swal)

  function fireAlert() {
    CheckDataSwal.fire({
      title: '您的訂位已送出',
      icon: 'success',
      html: '<h5>請至信箱收取您的訂位確認信</h5><div style="display:flex; justify-content:center"><a href="/member/reservation" style="background:#f5b54d; width:120px; height:40px; color:white; display:block; line-height:40px; border-radius:5px; text-decoration: none; margin:5px;">檢視訂單</a><a href="/home" style="background:#97bc78; width:120px; height:40px; color:white; display:block; line-height:40px; border-radius:5px; text-decoration: none; margin:5px;">回首頁<a/></div>',
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {},
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nameInp = document.getElementById('nameInp')
    const phoneInp = document.getElementById('phoneInp')
    // console.log(nameInp.checkValidity())
    if (nameInp.checkValidity() && phoneInp.checkValidity()) {
      insertReservation()
      fireAlert()
    }
  }
  function setName(value) {
    const newInsertResData = { ...insertResData }
    newInsertResData.name = value
    setInsertResData(newInsertResData)
  }

  function setMobile(value) {
    const newInsertResData = { ...insertResData }
    newInsertResData.mobile = value
    setInsertResData(newInsertResData)
  }

  function setNote(value) {
    const newInsertResData = { ...insertResData }
    newInsertResData.note = value
    setInsertResData(newInsertResData)
  }

  return (
    <>
      <div className="res-person">
        <div className="head">
          <h3>訂位人資料</h3>
          <button>同會員資料</button>
        </div>
        <hr />
        <div className="content">
          <div className="title">
            <span className="h4 date">姓名</span>
            <span className="h4">電話</span>
            <span className="h4">備註</span>
          </div>
          <form id="resPersonForm" className="detail" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="王大明"
              value={insertResData.name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
              id="nameInp"
            />
            <input
              type="text"
              pattern="09\d{8}"
              placeholder="請輸入電話"
              minLength="9"
              maxLength="10"
              value={insertResData.mobile}
              onChange={(e) => {
                setMobile(e.target.value)
              }}
              required
              id="phoneInp"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="請輸入備註"
              value={insertResData.note}
              onChange={(e) => {
                setNote(e.target.value)
              }}
              maxlength="200"
            ></textarea>
          </form>
        </div>
      </div>
    </>
  )
}
export default ReservationPerson
