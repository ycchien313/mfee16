import React, { useState, useEffect } from 'react'
import MainMealBox from '../components/MainMealBox'
import SideBox from '../components/SideBox'
import DessertBox from '../components/DessertBox'
import Aside from './Aside'
import Map from './Map'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Swal from 'sweetalert2'
// import { Modal } from 'react-bootstrap'
import AsideMobile from './AsideMobile'

function Delivery(props) {
  const [show, setShow] = useState(false)

  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [fulltime, setFulltime] = useState('')
  const [main, inputMain] = useState([])
  const [side, inputSide] = useState([])
  const [dessert, inputDessert] = useState([])
  // const [counts, setCounts] = useState(Array(3).fill(0))
  // console.log("count:",counts)
  const [dishCount, setDishCount] = useState({})
  // console.log('dishCount:', dishCount)
  // 訂餐
  const [dishList, setDishList] = useState([])
  // console.log("dishList:",dishList)
  // all
  const [dishes, setDishes] = useState([])
  // console.log('dishes', dishes)
  const [address, setAddress] = useState({
    city: '桃園市',
    dist: '',
    road: '',
  })

  const [img, setImg] = useState([])
  // 免運
  const [addFee, setFee] = useState('')
  const [subTotal, setSubTotal] = useState([])
  // console.log('sub', subTotal)
  const [name, setName] = useState([])
  const [counts, setCounts] = useState([])

  //彈出

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
    //
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

  //
  useEffect(() => {
    if (dishes.length > 0) {
      let newDishCount = {}
      dishes.forEach((item) => {
        newDishCount[item.dish_id] = 0
      })
      // cart，轉成陣列
      const cart = JSON.parse(localStorage.getItem('cart'))
      // console.log(cart, 'cart')
      if (cart !== undefined && null) {
        cart.forEach((v, i) => {
          // console.log('v:', v)
          for (let i = 0; i < dishes.length; i++) {
            // console.log(dishes[i].name)
            if (dishes[i].name === v.name) {
              const id = dishes[i].dish_id
              const cartCount = v.count
              // console.log(cartCount)
              newDishCount = { ...newDishCount, [id]: cartCount }
            }
          }
          // console.log('newDishCount', newDishCount)
        })
      }
      setDishCount(newDishCount)
    }
  }, [dishes])

  return (
    <>
      <div className="FoodDelivery">
        <div className="hero-section">
          <Map
            address={address}
            setAddress={setAddress}
            setFee={setFee}
            addFee={addFee}
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
          />
        </div>
        <h2 className="chose">選擇餐點</h2>
        <div className="order">
          <div className="mobile-order-out">
            <AsideMobile
              show={show}
              dishes={dishes}
              dishList={dishList}
              addFee={addFee}
            />

            <div
              className="mobile-order"
              onClick={() => {
                setShow(!show)
                // console.log('123')
              }}
            ></div>
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
            counts={counts}
            setCounts={setCounts}
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
              // className="pink-guide-button mobile-order-get"
              field=""
              onClick={function () {
                Swal.fire({
                  icon: 'warning',
                  title: '確認有無遺漏訂單選項',
                  text: '包含: 地址、日期、時間以及定一份餐點~',
                  confirmButtonColor: '#fc5c75',
                })
              }}
            />
          ) : localStorage.getItem('authToken') === null ? (
            <input
              type="button"
              defaultValue="確認登入"
              // className="pink-guide-button mobile-order-get"
              className="OrderGet mobile-order-get"
              field=""
              onClick={function () {
                Swal.fire({
                  icon: 'warning',
                  title: '確認有無登入',
                  text: '請至上方登入~',
                  confirmButtonColor: '#fc5c75',
                })
              }}
            />
          ) : (
            <Link
              className="Link-back"
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
                // className="pink-guide-button mobile-order-get"
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
