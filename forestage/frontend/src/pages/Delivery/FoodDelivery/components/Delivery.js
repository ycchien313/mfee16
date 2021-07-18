import React, { useState, useEffect } from 'react'

function Delivery(props) {
  //請選擇送餐時間time
  const [time, setTime] = useState('')
  //請選擇送餐時間date
  const [date, setDate] = useState('')
  //請輸入要外送地址區域
  const [dist, inputDist] = useState('')
  //請輸入要外送地址路~號
  const [rd, inputRd] = useState('')
  //設定餐點狀態
  const [data, setdata] = useState('')


  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/delivery/dish',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        console.log(result)
        // 抓
        setdata(result[0].name)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className="hero-section">
        <div className="top-wave">
          <h1 className="h1 title">外送頁面</h1>
          <div className="mobile-takeout">
            <div className="takeoutDiv">
              <h3>請輸入您要外送的地址</h3>
              <div className="Area">
                <input
                  type="text"
                  value="桃園市"
                  className="input-disable"
                  disabled
                />
                <input
                  type="text"
                  className="takeoutInput add"
                  value={dist}
                  onChange={(event) => {
                    inputDist(event.target.value)
                  }}
                />
              </div>
              <input
                type="text"
                className="takeoutInput add-r"
                value={rd}
                onChange={(event) => {
                  inputRd(event.target.value)
                }}
              />
              <div className="Shipping">
                <p>免運門檻: 300 元</p>
                <p>運費: 60 元</p>
              </div>
            </div>
          </div>
          <img className="wave-1" src=" images/top-wave.svg" alt="" />
          <img className="elfin" src=" images/YellowElfin.png" alt="" />
          <img className="path" src=" images/Path .png" alt="" />
        </div>
        <div className="left-div">
          <div className="map">
            <div className="banner-DialogBox">
              <h3 className="banner-text">請選擇你的位置 !</h3>
            </div>
            <img src=" images/Taoyuan.png" alt="" className="Taoyuan" />
            <img src=" images/pin.png" alt="" className="pin" />
          </div>
        </div>
        <div className="right-div">
          <img className="pinkElfin" src=" images/PinkElfin.png" alt="" />
          <div className="takeout">
            <div className="takeoutDiv">
              <h3>請輸入您要外送的地址</h3>
              <div className="Area">
                <input
                  type="text"
                  value="桃園市"
                  className="input-disable"
                  disabled
                />
                <input
                  type="text"
                  value="中壢區"
                  className="takeoutInput add"
                />
              </div>
              <input
                type="text"
                value="中大路100號"
                className="takeoutInput add-r"
              />
              <div className="Shipping">
                <p>免運門檻: 300 元</p>
                <p>運費: 60 元</p>
              </div>
            </div>
          </div>
        </div>
        <div className="slogan">
          <div className="bottom-wave">
            <div className="order-time">
              <h3>請選擇送餐時間</h3>
              <div className="date">
                <p className="p">日期</p>
                <input
                  type="date"
                  value={date}
                  className="input"
                  onChange={(event) => {
                    setDate(event.target.value)
                  }}
                />
              </div>
              <div className="time">
                <p className="p">時間</p>
                <input
                  type="time"
                  value={time}
                  className="input"
                  onChange={(event) => {
                    setTime(event.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <h2 className="chose">選擇餐點</h2>
      <div className="order">
        <div className="mobile-order-out">
          <div className="mobile-order"></div>
        </div>
        <div className="order-left">
          <div className="MainMeal-group">
            <div className="wrapper">
              <div className="maindiv">
                <div className="category">
                  <div className="category-bg" id="category-title-green">
                    <h4 className="category-innertext">主餐</h4>
                  </div>
                </div>
                <div className="MealBox-group">
                  <div className="MainMealBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                  <div className="MainMealBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                  <div className="MainMealBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Side-group">
            <div className="wrapper">
              <div className="maindiv">
                <div className="category">
                  <div className="category-bg" id="category-title-gray">
                    <h4 className="category-innertext">附餐</h4>
                  </div>
                </div>
                <div className="MealBox-group">
                  <div className="SideBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                  <div className="SideBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                  <div className="SideBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Dessert-group">
            <div className="wrapper">
              <div className="maindiv">
                <div className="category">
                  <div className="category-bg" id="category-title-pink">
                    <h4 className="category-innertext">甜點</h4>
                  </div>
                </div>
                <div className="MealBox-group">
                  <div className="DessertBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                  <div className="DessertBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                  <div className="DessertBox">
                    <img src=" images/sub.png" alt="" className="sub" />
                    <form
                      id="myform"
                      method="POST"
                      action="#/"
                      className="button-group"
                    >
                      <input
                        type="button"
                        value=""
                        className="minus"
                        field="quantity"
                      />
                      <input
                        type="text"
                        name="quantity"
                        value="0"
                        className="num"
                      />
                      <input
                        type="button"
                        value=""
                        className="plus"
                        field="quantity"
                      />
                    </form>
                    <p className="food">食物 300$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="aside-list">
          <div className="menu">
            <div className="content">
              <div className="title">
                <h4>目前品項</h4>
              </div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <hr />
              </ul>
            </div>
            <img src=" images/menu.png" alt="" />
            <input
              type="button"
              value="送出訂單"
              className="OrderGet"
              field=""
            />
          </div>
        </aside>
      </div>

      <div className="mobile-out">
        <input
          type="button"
          value="送出訂單"
          className="OrderGet mobile-order-get"
          field=""
        />
      </div>
    </>
  )
}

export default Delivery
