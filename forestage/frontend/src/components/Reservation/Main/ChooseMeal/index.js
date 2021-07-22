import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'
import MealsBig from './MealsBig/'
import MealsSmall from './MealsSmall/'

function ChooseMeal(props) {
  const { checkList, setCheckList, dishList, setDishList } = props
  const [dishes, setDishes] = useState([])
  const [showDishes, setShowDishes] = useState([])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  function getDishes() {
    axios.get('http://127.0.0.1:3001/reservation/dish').then((result) => {
      let initShowDishes = result.data.filter((dish) => {
        return dish.type === '主餐'
      })
      console.log(initShowDishes)
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
          <MealsSmall dishes={dishes} setDishes={setDishes} />
        ) : (
          <MealsBig
            dishes={dishes}
            setDishes={setDishes}
            showDishes={showDishes}
            setShowDishes={setShowDishes}
            checkList={checkList}
            setCheckList={setCheckList}
            dishList={dishList}
            setDishList={setDishList}
          />
        )}
      </section>
    </>
  )
}

export default ChooseMeal
