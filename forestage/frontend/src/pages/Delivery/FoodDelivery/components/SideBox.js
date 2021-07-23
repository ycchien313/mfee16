import React from 'react'

function SideBox(props) {
  // const {
  //   index,
  //   name,
  //   price,
  //   image_realistic,
  //   counts,
  //   setCounts,
  //   dishes,
  //   setDishes,
  //   dishePrice,
  //   setDishePrice,
  // } = props
  const {
    index,
    id,
    name,
    price,
    image_realistic,
    counts,
    setCounts,
    dishes,
    setDishes,
    dishePrice,
    setDishePrice,
    dishCount,
    setDishCount,
  } = props
  console.log('id', id)
  console.log('dishCount', dishCount)


  function minus(id) {
    let newDishCount = { ...dishCount }
    if (newDishCount[id] > 0) {
      newDishCount[id] -= 1
    } else {
      newDishCount[id] = 0
    }
    setDishCount(newDishCount)
  }

  function add(id){
    let newDishCount = { ...dishCount }
    newDishCount[id] += 1
    setDishCount(newDishCount)

  }

  return (
    <>
      <div className="SideBox">
        <figure className="sub-border">
          <img src={image_realistic} alt="" className="sub" />
        </figure>
        <form id="myform" method="POST" action="#/" className="button-group">
          <input
            type="button"
            defaultValue=""
            className="minus"
            field="quantity"
            onClick={() => {
              // let newCounts = [...counts]
              // if (newCounts[index] > 0) newCounts[index] = newCounts[index] - 1
              // setCounts(newCounts)
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
              // let newCounts = [...counts]
              // newCounts[index] = newCounts[index] + 1
              // setCounts(newCounts)
              // let newDishes = dishes
              // newDishes[name] = newCounts[index]
              // setDishes(newDishes)
              // let newDishePrice = dishePrice
              // newDishePrice[price] = newCounts[index]
              // setDishePrice(newDishePrice)
              // console.log(newDishes)
              // console.log(newDishePrice)
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

export default SideBox
