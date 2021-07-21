import React, { useState, useEffect } from 'react'

function MainMealBox(props) {
  const { index, name, price, image_realistic, counts, setCounts } = props
  // const [counts, setCounts] = useState(0)
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
              newCounts[index] = newCounts[index] - 1
              setCounts(newCounts)
              console.log(newCounts)
            }}
          />
          <input
            type="text"
            name="quantity"
            defaultValue={counts}
            className="num"
            onChange={() => {
              let newCounts = [...counts]
              setCounts(newCounts)
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
              console.log(newCounts)

              // let newCount = counts + 1
              // setCounts(newCount)
              // console.log(counts)
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
