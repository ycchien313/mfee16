import React, { useState, useEffect } from 'react'
import MainMealBox from '../components/MainMealBox'
import SideBox from '../components/SideBox'
import DessertBox from '../components/DessertBox'
import Aside from './Aside'
import Takeout from './Takeout'
import Map from './Map'

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


  const [counts, setCounts] = useState(Array(3).fill(0))
  // const [counts, setCounts] = useState(0)
  // 餐點數量+-
  // const setDishCount = (productIndex, newCount) => {
  //   let newCounts = [...counts]
  //   newCounts[productIndex] = newCount
  //   setCounts(newCounts)
  // }
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
        console.log(result)
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
  }, [])

  return (
    <>
      <div className="hero-section">
        <Map dist={dist} inputDist={inputDist} rd={rd} inputRd={inputRd} />
        <Takeout time={time} setTime={setTime} date={date} setDate={setDate} />
      </div>
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
                  {main.map((v, i) => {
                    return (
                      <MainMealBox
                        key={i}
                        index={i}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                        counts={counts}
                        setCounts={setCounts}
                        // -
                        // counts={counts[i]}
                        // setCounts={(newCount) => {
                        //   setDishCount(newCount, i)
                        // }}
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
                        // setDesertBoxTotal={setDesertBoxTotal}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Aside />
      </div>
      <div className="mobile-out">
        <input
          type="button"
          defaultValue="送出訂單"
          className="OrderGet mobile-order-get"
          field=""
        />
      </div>
    </>
  )
}

export default Delivery
