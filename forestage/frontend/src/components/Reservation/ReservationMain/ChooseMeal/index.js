import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'
import MealsBig from './MealsBig/'
import MealsSmall from './MealsSmall/'

function ChooseMeal(props) {
  const { checkList, setCheckList, dishList, setDishList } = props
  const [dishes, setDishes] = useState([])
  const [showDishes, setShowDishes] = useState([])
  const [didMount, setDidMount] = useState(false)
  const [dishCount, setDishCount] = useState({})

  // 檢查storage是否有此筆資料
  const checkDishCount = Boolean(window.sessionStorage.getItem('dishCount'))

  useEffect(() => {
    if (didMount) {
      window.sessionStorage.setItem('dishCount', JSON.stringify(dishCount))
    }

  }, [dishCount])

  useEffect(() => {
    setDidMount(true)

  }, [])

  // 建立餐點物件
  useEffect(() => {
    if (didMount) {
      // 如果sessionStorage沒有dishCount時，建立餐點物件 key為dish_id value為0
      if (checkDishCount === false) {
        let newDishCount = {}
        dishes.forEach((item) => {
          newDishCount[item.dish_id] = 0
        })
        setDishCount(newDishCount)
      } else {
        // 如果sessionStorage有dishCount，將sessionStorage餐點數量存入state
        let newdishCount = JSON.parse(sessionStorage.getItem('dishCount'))
        let keyArr = Object.keys(newdishCount)
        let newObj = {}
        keyArr.forEach((v) => {
          newObj[+v] = newdishCount[v]
        })
        setDishCount(newObj)
      }
    }
  }, [dishes])

  // 建立餐點陣列 [餐點名稱,數量,小計,圖片,單價, id]
  useEffect(() => {
    if (didMount) {
      let newDishArr = []
      let dishArr = Object.entries(dishCount)
      dishes.forEach((dish) => {
        newDishArr = dishArr.map((v, i) => {
          if (parseInt(v[0]) === dish.dish_id) {
            v[0] = dish.name
            v[2] = dish.price * v[1]
            v[3] = dish.image_realistic
            v[4] = dish.price
            v[5] = dish.dish_id
          }
          return v
        })
      })
      setDishList(newDishArr)
    }
  }, [dishes, dishCount])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  function getDishes() {
    axios.get('http://127.0.0.1:3001/reservation/dish').then((result) => {
      let initShowDishes = result.data.filter((dish) => {
        return dish.type === '主餐'
      })
      // console.log(initShowDishes)
      setDishes(result.data)
      setShowDishes(initShowDishes)
    })
  }

  useEffect(() => {
    getDishes()
  }, [])
  return (
    <>
      <section className="choose-meal">
        <div className="steps">
          <h3 className="step">選擇日期</h3>
          <div className="arrow"></div>
          <h3 className="step">選擇座位</h3>
          <div className="arrow"></div>
          <div className="active">
            <h3 className="step">選擇餐點</h3>
            <img
              src="http://localhost:3000/images/reservation/active-title.png"
              alt=""
            />
          </div>
        </div>
        {isTabletOrMobile ? (
          <MealsSmall
            dishes={dishes}
            setDishes={setDishes}
            showDishes={showDishes}
            setShowDishes={setShowDishes}
            checkList={checkList}
            setCheckList={setCheckList}
            dishCount={dishCount}
            setDishCount={setDishCount}
          />
        ) : (
          <MealsBig
            dishes={dishes}
            setDishes={setDishes}
            showDishes={showDishes}
            setShowDishes={setShowDishes}
            checkList={checkList}
            setCheckList={setCheckList}
            dishCount={dishCount}
            setDishCount={setDishCount}
          />
        )}
      </section>
    </>
  )
}

export default ChooseMeal
