import React, { useState } from 'react'
import Order from './Order'
import OrderList from './OrderList'

function DeliveryOrder(props) {
  const [selectedOption, setSelectOption] = useState('')
  const [inputText, setInputText] = useState('')
  const [inputTel, setInputTel] = useState('')
  const [textArea, setTextArea] = useState('')

  return (
    <>
      <div className="DeliveryOrder">
        <div className="hero-section">
          <div className="top-wave">
            <h1 className="h1 title">外送訂餐</h1>
            <h3 className="h3 title">確認訂單</h3>
            <img
              className="wave-1"
              src={
                'http://localhost:3000/images/delivery/deliveryOrder/top-wave.svg'
              }
              alt=""
            />
            <img
              className="elfin"
              src={
                'http://localhost:3000/images/delivery/deliveryOrder/elfin-green.png'
              }
              alt=""
            />
          </div>
        </div>
        <div className="res-check">
          <div className="container-big">
            <div className="bread-crumb">
              <a href="#/" className="prev span">
                外送訂餐
              </a>
              {'  /  '}
              <a href="#/" className="active span">
                確認訂單
              </a>
            </div>
            <OrderList
              selectedOption={selectedOption}
              setSelectOption={setSelectOption}
            />
            <Order
              inputText={inputText}
              setInputText={setInputText}
              inputTel={inputTel}
              setInputTel={setInputTel}
              textArea={textArea}
              setTextArea={setTextArea}
            />
            <div className="check">
              <span className="info-text">
                本店採現場付款，訂單送出後您將收到 E-Mail 確認信。
              </span>
              <div className="buttons">
                <button className="guide-button back">
                  <img
                    src={
                      'http://localhost:3000/images/delivery/deliveryOrder/arrow-circle-left-solid.svg'
                    }
                    alt=""
                  />
                  修改訂位
                </button>
                <button className="pink-guide-button">
                  確認送出
                  <img
                    src={
                      'http://localhost:3000/images/delivery/deliveryOrder/arrow-circle-right-solid.svg'
                    }
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeliveryOrder
