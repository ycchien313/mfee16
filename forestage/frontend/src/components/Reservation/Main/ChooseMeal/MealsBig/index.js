import React, { useState, useEffect } from 'react'
import MealCard from './MealCard'

// 假餐點資料
const meals = [
  { name: '瑪格莉特大披薩', id: 1 },
  { name: '碳烤豬肋排', id: 2 },
  { name: '總匯潛艇堡', id: 3 }

]

function MealsBig() {
  const [mealCountArr, setMealCountArr] = useState([])
  useEffect(() => {
    // 建立一個陣列儲存每筆餐點數量
    let newMealCountArr = new Array(meals.length).fill(0)
    setMealCountArr(newMealCountArr)
  }, [])
  return (
    <>
      <div className="category-group">
        <div className="category active">
          <h4>主餐</h4>
          <img
            src="http://localhost:3000/images/reservation/maindish-bg.svg"
            alt=""
          />
        </div>
        <div className="category">
          <h4>附餐</h4>
          <img
            src="http://localhost:3000/images/reservation/sidedish-bg.svg"
            alt=""
          />
        </div>
        <div className="category">
          <h4>甜點</h4>
          <img
            src="http://localhost:3000/images/reservation/dessert-bg.svg"
            alt=""
          />
        </div>
      </div>
      <div className="cards">
        {meals.map((v, i) => {
          return (
            <MealCard
              key={v.id}
              index={i}
              id={v.id}
              name={v.name}
              setMealCountArr={setMealCountArr}
              mealCountArr={mealCountArr}
            />
          )
        })}
      </div>
    </>
  )
}
export default MealsBig
