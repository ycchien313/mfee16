import React, { useState, useEffect } from 'react'
import MainMealBox from '../components/MainMealBox'
import SideBox from '../components/SideBox'
import DessertBox from '../components/DessertBox'
import Aside from './Aside'
import Takeout from './Takeout'
import Map from './Map'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Swal from 'sweetalert2'

function Delivery(props) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [fulltime, setFulltime] = useState('')
  const [main, inputMain] = useState([])
  const [side, inputSide] = useState([])
  const [dessert, inputDessert] = useState([])
  const [counts, setCounts] = useState(Array(3).fill(0))
  const [dishCount, setDishCount] = useState({})
  // 訂餐
  const [dishList, setDishList] = useState([])
  console.log(dishList)
  const [dishes, setDishes] = useState([])
  const [address, setAddress] = useState({
    city: '桃園市',
    dist: '',
    road: '輸入您的地址',
  })

  const [img, setImg] = useState([])
  // 免運
  const [addFee, setFee] = useState('')
  const [subTotal, setSubTotal] = useState([])
  const [name, setName] = useState([])

  const getDishes = () => {
    $.ajax({
      url: 'http://localhost:3001/delivery/dish',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        //
        setDishes(result)
        //
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
    setFulltime(date + ' ' + time)
  }, [date, time])

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
          <Map address={address} setAddress={setAddress} setFee={setFee} />
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
            img={img}
            setImg={setImg}
            address={address}
            fulltime={fulltime}
            subTotal={subTotal}
            setSubTotal={setSubTotal}
            name={name}
            setName={setName}
            data={date}
            time={time}
          />
        </div>
        <div className="mobile-out">
          {(counts.length === 0) |
          (date === '') |
          (time === '') |
          (fulltime === '') |
          (address.dist === '') |
          (address.road === '') ? (
            <input
              type="button"
              defaultValue="確認訂單"
              className="OrderGet mobile-order-get"
              field=""
              onClick={function () {
                Swal.fire({
                  icon: 'warning',
                  title: '確認有無遺漏訂單選項',
                  text: '包含: 地址、日期、時間以及定一份餐點~',
                })
              }}
            />
          ) : localStorage.getItem('authToken') === null ? (
            <input
              type="button"
              defaultValue="確認登入"
              className="OrderGet mobile-order-get"
              field=""
              onClick={function () {
                Swal.fire({
                  icon: 'warning',
                  title: '確認有無登入',
                  text: '請至上方登入~',
                })
              }}
            />
          ) : (
            <Link
              to={{
                pathname: '/delivery/deliveryOrder',
                state: {
                  img: img,
                  name: name,
                  subTotal: subTotal,
                  counts: counts,
                  address: address,
                  fulltime: fulltime,
                  dishList: dishList,
                },
              }}
            >
              <input
                type="button"
                defaultValue="送出訂單"
                className="OrderGet mobile-order-get"
                field=""
              />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Delivery
