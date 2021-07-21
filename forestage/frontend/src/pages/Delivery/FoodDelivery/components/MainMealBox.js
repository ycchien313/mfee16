import React from 'react'

function MainMealBox(props) {
  const {
    index,
    name,
    price,
    image_realistic,
    counts,
    setCounts,
    dishes,
    setDishes,
  } = props

  return (
    <>
      <div className="MainMealBox">
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
              // if (counts > 0) setCounts(counts - 1)
              let newCounts = [...counts]
              if (newCounts[index] > 0) newCounts[index] = newCounts[index] - 1
              setCounts(newCounts)
            }}
          />
          <input
            type="text"
            name="quantity"
            value={counts[index]}
            className="num"
            onChange={() => {
              // let newCounts = [...counts]
              // setCounts(newCounts)
            }}
            // onChange={(e) => setCounts(+e.target.value)}
            // onChange={() => setCounts(+counts)}
          />
          <input
            type="button"
            defaultValue=""
            className="plus"
            field="quantity"
            onClick={() => {
              // console.log('plus click')
              let newCounts = [...counts]
              newCounts[index] = newCounts[index] + 1
              setCounts(newCounts)
              let newDishes = dishes
              newDishes[name] = newCounts[index]
              setDishes(newDishes)
              console.log(newDishes)
              // let newCount = counts + 1
              // setCounts(newCount)
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
