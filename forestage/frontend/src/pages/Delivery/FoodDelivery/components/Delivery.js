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

  // 所有餐點(含name、count)
  // 希望物件，{碳烤豬肋排: 0, 大披薩: 0, ...}
  const [dishes, setDishes] = useState({})

  // 餐點數量+-
  // const setProductItemCount = (productIndex, newCount) => {
  //   let newCounts = [...counts]
  //   newCounts[productIndex] = newCount
  //   setCounts(newCounts)
  // }

  const getDishes = () => {
    $.ajax({
      url: 'http://localhost:3001/delivery/dish',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        console.log(result)

        let newDish = ''
        result.forEach((dish) => {
          newDish = { ...newDish, [dish.name]: 0 }
        })
        setDishes(newDish)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  useEffect(() => {
    getDishes()

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
        // console.log(result[0])
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

  // useEffect(() => {
  //   console.log(dishes)
  // }, [dishes])

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
                        dishes={dishes}
                        setDishes={setDishes}
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
                        key={i}
                        index={i}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                        counts={counts}
                        setCounts={setCounts}
                        dishes={dishes}
                        setDishes={setDishes}
                        // counts={counts[i]}
                        // setCounts={(newCount) => {
                        //   setProductItemCount(i, newCount)
                        // }}
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
                        kkey={i}
                        index={i}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                        counts={counts}
                        setCounts={setCounts}
                        dishes={dishes}
                        setDishes={setDishes}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Aside counts={counts} dishes={dishes} setDishes={setDishes} />
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
