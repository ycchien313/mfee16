import React, { useState, useEffect } from 'react'
function MealCard(props) {
  const { id, name, type, index, imgIllu, imgReal, dishCount, setDishCount, price } =
    props
  // useEffect(() => {
  //   setCountValue(mealCountArr[index])
  // }, [mealCountArr])
  // const [countValue, setCountValue] = useState('')
  // let imgIlluSrc = 'http://localhost:3000/images/common/food/' + imgIllu
  let imgRealSrc = 'http://localhost:3000/images/common/food/' + imgReal

  function addDishCount(dishId) {
    let newDishCount = { ...dishCount }
    newDishCount[dishId] += 1
    setDishCount(newDishCount)
  }

  function minusDishCount(dishId) {
    let newDishCount = { ...dishCount }
    newDishCount[dishId] > 0
      ? (newDishCount[dishId] -= 1)
      : (newDishCount[dishId] = 0)

    setDishCount(newDishCount)
  }

  // let activeClassName = `card ${type} active`

  return (
    <>
      <div className={`card ${type}`}>
        <div className="card-image">
          <img src={imgRealSrc} alt="" />
        </div>
        <div className="button-group">
          <div
            className="minus-button"
            onClick={() => {
              minusDishCount(id)
            }}
          ></div>
          <input type="number" value={dishCount[id] ? dishCount[id] : 0} />
          <div
            className="plus-button"
            onClick={() => {
              addDishCount(id)
            }}
          ></div>
        </div>
        <span>{`${name} $${price}`}</span>
      </div>
    </>
  )
}

export default MealCard
