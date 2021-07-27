import React from 'react'

function Order(props) {
  const {
    inputText,
    setInputText,
    inputTel,
    setInputTel,
    textArea,
    setTextArea,
  } = props
  return (
    <>
      <div className="res-person">
        <h3>訂位人資料</h3>
        <hr />
        <div className="content">
          <div className="title">
            <span
              className="h4 date"
              type="text"
              value={inputText}
              onChange={(event) => {
                setInputText(event.target.value)
              }}
            >
              姓名
            </span>
            <span
              className="h4"
              type="tel"
              value={inputTel}
              onChange={(event) => {
                setInputTel(event.target.value)
              }}
            >
              電話
            </span>
            <span className="h4" disabled>
              地址
            </span>
            <span
              className="h4"
              value={textArea}
              onChange={(event) => {
                setTextArea(event.target.value)
              }}
            >
              備註
            </span>
          </div>
          <div className="detail">
            <input type="text" placeholder="羅大奕" />
            <input type="text" placeholder="0912345678" />
            <input
              type="text"
              className="add"
              placeholder="桃園市中壢區中央路100號"
              disabled
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="餐點放在門口就好"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order.js
