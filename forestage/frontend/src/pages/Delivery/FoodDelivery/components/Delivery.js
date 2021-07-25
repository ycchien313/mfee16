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
  const [main, inputMain] = useState([])
  const [side, inputSide] = useState([])
  const [dessert, inputDessert] = useState([])
  const [counts, setCounts] = useState(Array(3).fill(0))
  const [dishCount, setDishCount] = useState({})
  // 空[]
  const [dishList, setDishList] = useState([])

  const [dishes, setDishes] = useState([])
  //地址,縣區街道
  const [address, setAddress] = useState({
    city: '桃園市',
    dist: '中壢區',
    road: '中央路123號',
  })
  const [addFee, setFee] = useState('')

  const getDishes = () => {
    $.ajax({
      url: 'http://localhost:3001/delivery/dish',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        setDishes(result)

        let newDish = ''
        result.forEach((dish) => {
          newDish = { ...newDish }
        })
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
        inputMain(result)
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

  useEffect(() => {
    if (dishes.length > 0) {
      let newDishCount = {}
      dishes.forEach((item) => {
        newDishCount[item.dish_id] = 0
      })
      setDishCount(newDishCount)
    }
  }, [dishes])

  return (
    <>
      <div className="FoodDelivery">
        <div className="hero-section">
          <Map address={address} setAddress={setAddress} setFee={setFee}/>
          <Takeout
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
          />
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
                      <h4
                        className="category-innertext"
                        onClick={(e) => {
                          let newAddress = {
                            ...address,
                            dist: '123',
                          }
                          setAddress(newAddress)
                          console.log(address)
                        }}
                      >
                        主餐
                      </h4>
                    </div>
                  </div>
                  <div className="MealBox-group">
                    {dishes.map((v, i) => {
                      if (v.type === '主餐') {
                        return (
                          <MainMealBox
                            key={v.dish_id}
                            index={i}
                            name={v.name}
                            price={v.price}
                            id={v.dish_id}
                            image_realistic={v.image_realistic}
                            counts={counts}
                            setCounts={setCounts}
                            dishes={dishes}
                            setDishes={setDishes}
                            dishCount={dishCount}
                            setDishCount={setDishCount}
                          />
                        )
                      }
                    })}
                    {/* {console.log(main, 'main')} */}
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
                    {dishes.map((v, i) => {
                      if (v.type === '附餐') {
                        return (
                          <SideBox
                            key={v.dish_id}
                            index={i}
                            name={v.name}
                            price={v.price}
                            id={v.dish_id}
                            image_realistic={v.image_realistic}
                            counts={counts}
                            setCounts={setCounts}
                            dishes={dishes}
                            setDishes={setDishes}
                            dishCount={dishCount}
                            setDishCount={setDishCount}
                          />
                        )
                      }
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
                    {dishes.map((v, i) => {
                      if (v.type === '甜點') {
                        return (
                          <DessertBox
                            key={v.dish_id}
                            index={i}
                            name={v.name}
                            price={v.price}
                            id={v.dish_id}
                            image_realistic={v.image_realistic}
                            counts={counts}
                            setCounts={setCounts}
                            dishes={dishes}
                            setDishes={setDishes}
                            dishCount={dishCount}
                            setDishCount={setDishCount}
                          />
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Aside
            dishCount={dishCount}
            dishes={dishes}
            setDishes={setDishes}
            dishList={dishList}
            setDishList={setDishList}
            addFee={addFee}
          />
        </div>
        <div className="mobile-out">
          <input
            type="button"
            defaultValue="送出訂單"
            className="OrderGet mobile-order-get"
            field=""
          />
        </div>
      </div>
    </>
  )
}

export default Delivery
