import React from 'react'

import { useMediaQuery } from 'react-responsive'
import MealsBig from './MealsBig/'
import MealsSmall from './MealsSmall/'
function ChooseMeal() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
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
        {isTabletOrMobile ? <MealsSmall /> : <MealsBig />}
      </section>
    </>
  )
}

export default ChooseMeal
