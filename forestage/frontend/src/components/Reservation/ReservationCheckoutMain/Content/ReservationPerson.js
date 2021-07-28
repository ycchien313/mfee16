import React from 'react'
function ReservationPerson(props) {
  const { insertResData, setInsertResData } = props

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
          <div className="detail">
            <input
              type="text"
              placeholder="王大明"
              value={insertResData.name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="0912345678"
              value={insertResData.mobile}
              onChange={(e) => {
                setMobile(e.target.value)
              }}
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
            ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReservationPerson
