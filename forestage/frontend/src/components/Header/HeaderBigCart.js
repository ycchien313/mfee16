import React from 'react'

function HeaderBigCart(props) {
  let { name, price, count, img } = props
  let domain = 'http://localhost:3000/images/dish/'
  let content = (
    <div className="cart-detail">
      <figure>
        <img src={domain + img} alt="" />
      </figure>
      <div className="cart-info">
        <h4 className="cart-info-name">{name}</h4>
        <h4 className="cart-info-price">{price}</h4>
        <h4 className="cart-info-count">{count}</h4>
      </div>
    </div>
  )

  return <>{content}</>
}

export default HeaderBigCart
