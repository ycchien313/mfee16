import React, { useState, useEffect } from 'react'
import MainMealBox from '../components/MainMealBox'
import SideBox from '../components/SideBox'
import DessertBox from '../components/DessertBox'
import moment from 'moment'

import $ from 'jquery'

function Delivery(props) {
  //請選擇送餐時間time
  const [time, setTime] = useState('')
  //請選擇送餐時間date
  const [date, setDate] = useState('')
  //請輸入要外送地址區域
  const [dist, inputDist] = useState('')
  //請輸入要外送地址路~號
  const [rd, inputRd] = useState('')

  // 主餐
  const [main, inputMain] = useState([])
  // 副餐
  const [side, inputSide] = useState([])
  // 甜點
  const [dessert, inputDessert] = useState([])
  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/delivery/dish/main',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        // console.log(result)
        // 抓
        // setdata(result[0].name)
        inputMain(result)
        // console.log(main)
      })
      .catch(function (err) {
        console.log(err)
      })
    //
    $.ajax({
      url: 'http://localhost:3001/delivery/dish/side',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        inputSide(result)
      })
      .catch(function (err) {
        console.log(err)
      })
    //
    $.ajax({
      url: 'http://localhost:3001/delivery/dish/dessert',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        inputDessert(result)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [main])

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
          <img
            className="wave-1"
            src={
              'http://localhost:3000/images/delivery/FoodDelivery/top-wave.svg'
            }
            alt=""
          />
          <img
            className="elfin"
            src={
              'http://localhost:3000/images/delivery/FoodDelivery/YellowElfin.png'
            }
            alt=""
          />
          <img
            className="path"
            src={'http://localhost:3000/images/delivery/FoodDelivery/Path .png'}
            alt=""
          />
        </div>
        <div className="left-div">
          <div className="map">
            <div className="banner-DialogBox">
              <h3 className="banner-text">請選擇你的位置 !</h3>
            </div>
            <img
              src={
                'http://localhost:3000/images/delivery/FoodDelivery/Taoyuan.png'
              }
              alt=""
              className="Taoyuan"
            />
            <img
              src={'http://localhost:3000/images/delivery/FoodDelivery/pin.png'}
              alt=""
              className="pin"
            />
          </div>
        </div>
        <div className="right-div">
          <img
            className="pinkElfin"
            src={
              'http://localhost:3000/images/delivery/FoodDelivery/PinkElfin.png'
            }
            alt=""
          />
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
                  min={moment().format('YYYY-MM-DD')}
                  // min="2021-07-19"
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
                  min={moment().format('hh:MM')}
                  // min="10:00:00"
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
                  {main.map(function (v, i) {
                    return (
                      <MainMealBox
                        key={v.dish_id}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                      />
                    )
                  })}
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
                  {side.map(function (v, i) {
                    return (
                      <SideBox
                        key={v.dish_id}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                      />
                    )
                  })}
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
                  {dessert.map(function (v, i) {
                    return (
                      <DessertBox
                        key={v.dish_id}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                      />
                    )
                  })}
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
            <img
              src={
                'http://localhost:3000/images/delivery/FoodDelivery/menu.png'
              }
              alt=""
            />
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
