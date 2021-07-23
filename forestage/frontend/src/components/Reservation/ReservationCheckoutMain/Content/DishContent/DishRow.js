import React from 'react'
function DishRow(props) {
  const { name, count, subtotal, picture, price } = props
  return (
    <>
      <div className="detail">
        <div className="dish">
          <figure className="dish-pic">
            <img
              src={`http://localhost:3000/images/common/food/${picture}`}
              alt=""
            />
          </figure>
          <span className="dish-name h4">{name}</span>
        </div>
        <span className="h4">{price}</span>
        <span className="h4">{count}</span>
        <span className="h4">{subtotal}</span>
      </div>
    </>
  )
}
export default DishRow
