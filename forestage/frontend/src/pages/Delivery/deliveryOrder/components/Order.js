import React from 'react'

function Order(props) {
  const {
    inputText,
    setInputText,
    inputTel,
    inputAdd,
    setInputTel,
    textArea,
    setTextArea,
    orderAll,
  } = props
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
            <span className="h4 date" type="text">
              姓名
            </span>
            <span className="h4" type="tel">
              電話
            </span>
            <span className="h4" disabled>
              地址
            </span>
            <span className="h4">備註</span>
          </div>
          <div className="detail">
            <input
              type="text"
              placeholder="羅大奕"
              value={inputText}
              onChange={(event) => {
                setInputText(event.target.value)
              }}
            />
            <input
              type="text"
              placeholder="0912345678"
              value={inputTel}
              onChange={(event) => {
                setInputTel(event.target.value)
              }}
            />
            <input
              type="text"
              className="add"
              placeholder="桃園市中壢區中央路100號"
              value={inputAdd}
              disabled
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="餐點放在門口就好"
              value={textArea}
              onChange={(event) => {
                setTextArea(event.target.value)
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
