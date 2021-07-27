import React from 'react'

function Dish(props) {
  let domain = 'http://localhost:3001/images/home'
  let { name, price, img_realistic } = props
  let content = (
    <li>
      <div className="delivery-item">
        <figure>
          <img src={domain + img_realistic} alt="" />
        </figure>
        <h4>{name}</h4>
        <h4>$ {price}</h4>
        <button className="button-orange-s">
          <h4 className="btn-innerText-s">加入</h4>
          <i className="fas fa-cart-plus"></i>
        </button>
      </div>
    </li>
  )
  return <>{content}</>
}

export default Dish
