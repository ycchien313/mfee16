/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import Bread from './Bread'

function DeliveryOrder(props) {
  //折價卷選擇
  const [selectedOption, setSelectOption] = useState('')
  //姓名輸入
  const [inputText, setInputText] = useState('')
  //電話輸入
  const [inputTel, setInputTel] = useState('')
  //備註文字區域
  const [textArea, setTextArea] = useState('')

  return (
    <>
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
          <Bread />
          <div className="dish-content">
            <h3>外送訂單內容</h3>
            <hr className="top" />
            <div className="order-time">
              <h4>送餐時間 :</h4>
              <span className="Time">2021/06/20 18:00</span>
            </div>
            <div className="content">
              <div className="name">
                <span className="h4 dish-name">餐點名稱</span>
                <span className="h4">單價</span>
                <span className="h4">數量</span>
                <span className="h4">小計</span>
              </div>
              <div className="detail">
                <div className="dish">
                  <figure className="dish-pic">
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/菜單-瑪格莉特大pizza.jpg'
                      }
                      alt=""
                    />
                  </figure>
                  <span className="dish-name h4">碳烤豬肋排</span>
                </div>
                <span className="h4">500</span>
                <span className="h4">2</span>
                <span className="h4">1000</span>
              </div>
              <div className="detail">
                <div className="dish">
                  <figure className="dish-pic">
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/菜單-瑪格莉特大pizza.jpg'
                      }
                      alt=""
                    />
                  </figure>
                  <span className="dish-name h4">爆米花</span>
                </div>
                <span className="h4">100</span>
                <span className="h4">2</span>
                <span className="h4">200</span>
              </div>
              <div className="detail">
                <div className="dish">
                  <figure className="dish-pic">
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/菜單-瑪格莉特大pizza.jpg'
                      }
                      alt=""
                    />
                  </figure>
                  <span className="dish-name h4">瑪格麗特大披薩</span>
                </div>
                <span className="h4">300</span>
                <span className="h4">1</span>
                <span className="h4">300</span>
              </div>
              <div className="detail">
                <div className="dish">
                  <figure className="dish-pic">
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/菜單-瑪格莉特大pizza.jpg'
                      }
                      alt=""
                    />
                  </figure>
                  <span className="dish-name h4">總匯潛艇堡</span>
                </div>
                <span className="h4">200</span>
                <span className="h4">1</span>
                <span className="h4">200</span>
              </div>
              <hr />
              <div className="price-count">
                <div className="price-count-name">
                  <span className="h4">總計</span>
                  <span className="h4">折價券</span>
                  <span className="h4">折扣</span>
                  <span className="h4 after-discount">折扣後金額</span>
                </div>
                <div className="price-count-detail">
                  <div className="total">
                    <span className="h4">1700</span>
                    <span className="h4">元</span>
                  </div>
                  <select
                    name=""
                    id=""
                    className="h4"
                    value={selectedOption}
                    onChange={(e) => {
                      setSelectOption(e.target.value)
                    }}
                  >
                    <option value="端午節優惠 滿千折百">
                      端午節優惠 滿千折百
                    </option>
                    <option value="參與音樂測驗遊戲獎勵">
                      參與音樂測驗遊戲獎勵
                    </option>
                    <option value="發文評論獎勵">發文評論獎勵</option>
                    <option value="參與歌手投票獎勵">參與歌手投票獎勵</option>
                  </select>
                  <div className="discount">
                    <span className="h4">100</span>
                    <span className="h4">元</span>
                  </div>
                  <div className="total-after">
                    <span className="h4">1600</span>
                    <span className="h4">元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </>
  )
}

export default DeliveryOrder
