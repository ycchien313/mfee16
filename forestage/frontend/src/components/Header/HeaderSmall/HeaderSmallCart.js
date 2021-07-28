import React from 'react'

function HeaderSmallCart(props) {
  let { name, price, count, img } = props
  let domain = 'http://localhost:3000/images/dish/'
  let content = (
    <div className="cart-small-content">
      <figure>
        <img src={domain + img} alt="" />
      </figure>
      <div className="cart-small-info">
        <h4>{name}</h4>
        <h4>{price}</h4>
        <h4>{count}</h4>
      </div>
    </div>
  )
  return <>{content}</>
}

export default HeaderSmallCart
