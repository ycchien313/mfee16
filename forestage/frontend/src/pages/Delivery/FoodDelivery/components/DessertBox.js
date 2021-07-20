import React, { useState, useEffect } from 'react'

function DessertBox(props) {
  const { name, price, image_realistic } = props
  const [total, setTotal] = useState(0)

  return (
    <>
      <div className="DessertBox">
        <figure className="sub-border">
          <img src={image_realistic} alt="" className="sub" />
        </figure>
        <form id="myform" method="POST" action="#/" className="button-group">
          <input
            type="button"
            value=""
            className="minus"
            field="quantity"
            onClick={() => {
              if (total > 0) setTotal(total - 1)
            }}
          />
          <input
            type="text"
            name="quantity"
            value={total}
            className="num"
            onChange={(e) => {
              setTotal(+e.target.value)
              // setDesertBoxTotal(+e.target.value)
            }}
            //
          />
          <input
            type="button"
            value=""
            className="plus"
            field="quantity"
            onClick={() => {
              setTotal(total + 1)
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

export default DessertBox
