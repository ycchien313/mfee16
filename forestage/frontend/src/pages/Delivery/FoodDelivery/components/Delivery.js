import React, { useState, useEffect } from 'react'
import MainMealBox from '../components/MainMealBox'
import SideBox from '../components/SideBox'
import DessertBox from '../components/DessertBox'
import Aside from './Aside'
import Takeout from './Takeout'
import Map from './Map'
import $ from 'jquery'

function Delivery(props) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [dist, inputDist] = useState('')
  const [rd, inputRd] = useState('')
  const [main, inputMain] = useState([])
  const [side, inputSide] = useState([])
  const [dessert, inputDessert] = useState([])
  const [counts, setCounts] = useState(Array(3).fill(0))

  // 所有餐點(含name、count)
  // 希望物件，{碳烤豬肋排: 0, 大披薩: 0, ...}
  const [dishes, setDishes] = useState({})
  const [dishePrice, setDishePrice] = useState({})

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
          newDish = { ...newDish }
          // newDish = { ...newDish, [dish.name]: 0 }
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
                        dishePrice={dishePrice}
                        setDishePrice={setDishePrice}
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
                        dishePrice={dishePrice}
                        setDishePrice={setDishePrice}
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
                        key={i}
                        index={i}
                        name={v.name}
                        price={v.price}
                        image_realistic={v.image_realistic}
                        counts={counts}
                        setCounts={setCounts}
                        dishes={dishes}
                        setDishes={setDishes}
                        dishePrice={dishePrice}
                        setDishePrice={setDishePrice}
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
