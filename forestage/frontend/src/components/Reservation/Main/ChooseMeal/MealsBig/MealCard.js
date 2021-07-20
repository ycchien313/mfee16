import React, { useState, useEffect } from 'react'
function MealCard(props) {
  const { id, name, type, index, setMealCountArr, mealCountArr, imgIllu, imgReal } =
    props
  useEffect(() => {
    setCountValue(mealCountArr[index])
  }, [mealCountArr])
  const [countValue, setCountValue] = useState('')
  let imgIlluSrc = 'http://localhost:3000/images/common/food/' + imgReal
  let imgRealSrc = 'http://localhost:3000/images/common/food/' + imgIllu
  return (
    <>
      <div className={`card ${type}`} id={`food-${id}`}>
        <div className="card-image">
          <img src={imgIlluSrc} alt="" />
        </div>
        <div class="illu-image">
          <img src={imgRealSrc} alt="" />
        </div>
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
