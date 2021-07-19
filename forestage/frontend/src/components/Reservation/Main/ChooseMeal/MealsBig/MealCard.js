import React, { useState, useEffect } from 'react'
function MealCard(props) {
  const { id, name, index, setMealCountArr, mealCountArr } = props
  useEffect(() => {
    setCountValue(mealCountArr[index])
  }, [mealCountArr])
  const [countValue, setCountValue] = useState('')
  return (
    <>
      <div className="card maindish" id={`food-${id}`}>
        <div className="card-image">
          <img
            src="http://localhost:3000/images/reservation/菜單-瑪格莉特大pizza.jpg"
            alt=""
          />
        </div>
        {/* <div class="illu-image">
          <img
            src="http://localhost:3000/images/reservation/瑪格莉特大pizza.png"
            alt=""
          />
        </div> */}
        <div className="button-group">
          <div
            className="minus-button"
            onClick={() => {
              let newMealCountArr = [...mealCountArr]
              countValue > 0
                ? (newMealCountArr[index] -= 1)
                : (newMealCountArr[index] = 0)
              setMealCountArr(newMealCountArr)
            }}
          ></div>
          <input type="number" value={countValue} />
          <div
            className="plus-button"
            onClick={() => {
              let newMealCountArr = [...mealCountArr]
              newMealCountArr[index] += 1
              setMealCountArr(newMealCountArr)
            }}
          ></div>
        </div>
        <span>{name}</span>
      </div>
    </>
  )
}

export default MealCard
