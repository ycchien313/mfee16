import React, { useState } from 'react'

function Dish(props) {
  let domain = 'http://localhost:3001/images/home'
  const [count, setCount] = useState(1)
  let { name, price, img_realistic, className, setCart } = props
  const [productState, setProductState] = useState()
  let content = (
    <li>
      <div className={`delivery-item ${className}`}>
        <figure>
          <img src={domain + img_realistic} alt="" />
        </figure>
        <h4>{name}</h4>
        <h4>$ {price}</h4>
        <button
          className="button-orange-s"
          onClick={() => {
            setCart({
              name: name,
              price: price,
              count: 1,
            })
          }}
        >
          <h4 className="btn-innerText-s">加入</h4>
          <i className="fas fa-cart-plus"></i>
        </button>
      </div>
    </li>
  )
  return <>{content}</>
}

export default Dish
