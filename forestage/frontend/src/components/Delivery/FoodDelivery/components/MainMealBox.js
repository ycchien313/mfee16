import React from 'react'
import { Reveal, Tween } from 'react-gsap'

function MainMealBox(props) {
  const { id, name, price, image_realistic, dishCount, setDishCount } = props

  function minus(id) {
    let newDishCount = { ...dishCount }
    if (newDishCount[id] > 0) {
      newDishCount[id] -= 1
    } else {
      newDishCount[id] = 0
    }
    setDishCount(newDishCount)
  }

  function add(id) {
    let newDishCount = { ...dishCount }
    newDishCount[id] += 1
    setDishCount(newDishCount)
  }
  // console.log(dishCount)
  return (
    <>
      <div className="MainMealBox">
        <figure className="sub-border">
          <img
            src={'http://localhost:3000/images/common/food/' + image_realistic}
            alt=""
            className="sub"
          />
        </figure>
        <form id="myform" method="POST" action="#/" className="button-group">
          <input
            type="button"
            defaultValue=""
            className="minus"
            field="quantity"
            onClick={() => {
              minus(id)
            }}
          />

          <input
            type="number"
            name="quantity"
            defaultValue={dishCount[id]}
            className="num"
          />
          <input
            type="button"
            defaultValue=""
            className="plus"
            field="quantity"
            onClick={() => {
              add(id)
            }}
          />
        </form>
        <p className="food">
          {name}${price}
        </p>
      </div>
    </>
  )
}

export default MainMealBox
