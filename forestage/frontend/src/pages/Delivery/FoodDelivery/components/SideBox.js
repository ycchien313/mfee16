import React from 'react'

function SideBox(props) {
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
          />
          <input
            type="button"
            defaultValue=""
            className="plus"
            field="quantity"
            onClick={() => {
              let newCounts = [...counts]
              newCounts[index] = newCounts[index] + 1
              setCounts(newCounts)
              let newDishes = dishes
              newDishes[name] = newCounts[index]
              setDishes(newDishes)
              console.log(newDishes)
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
