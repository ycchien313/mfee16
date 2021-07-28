import React, { useEffect, useState } from 'react'

function Dish(props) {
  let domain = 'http://localhost:3000/images/dish/'
  const [count, setCount] = useState(1)
  let { name, price, image_realistic, className, all, setAll, item, setItem } =
    props
  const [productState, setProductState] = useState()
  const [ok, setOk] = useState(false)
  const [countState, setCountState] = useState(1)

  function push() {
    let newObj = {}
    newObj.name = name
    newObj.price = price
    let itemClone = [...item]
    // newObj.count = 0
    if (item.length == 0) {
      newObj.count = 1
      itemClone.push(newObj)

      setItem(itemClone)
    }

    if (item !== []) {
      itemClone.forEach(function (value) {
        if (value.name === name) {
          value.count += 1
        } else {
          newObj.count = 1
          itemClone.push(newObj)
        }
      })
      setItem(itemClone)
    }
  }

  let content = (
    <li>
      <div className={`delivery-item ${className}`}>
        <figure>
          <img src={domain + image_realistic} alt="" />
        </figure>
        <h4>{name}</h4>
        <h4>$ {price}</h4>
        <button
          className="button-orange-s"
          onClick={() => {
            // setAll({
            //   name: name,
            //   price: price,
            //   count: count,
            //   img: domain + image_realistic,
            // })
            push()
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
