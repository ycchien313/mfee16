import React, { useEffect, useState } from 'react'

function Dish(props) {
  let domain = 'http://localhost:3000/images/dish/'
  const [count, setCount] = useState(1)
  let { name, price, image_realistic, className, all, setAll, item, setItem } =
    props
  const [productState, setProductState] = useState()
  const [countState, setCountState] = useState(1)
  const [localCart, setLocalCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState([])
  // useEffect(() => {
  //   let result = JSON.parse(localStorage.getItem('cart'))
  //   localStorage.setItem('newCart', JSON.stringify(result))
  // }, [])

  // useEffect(() => {
  //   if (item != false) {
  //     localStorage.setItem('cart', JSON.stringify(item))
  //   }
  // }, [item])

  useEffect(() => {
    if (item.length > 0) {
      let target = JSON.stringify(item)
      // let getItemCart = JSON.parse(localStorage.getItem('cart'))
      // let result = [getItemCart].push(target)
      // console.log('result:', result)
      // console.log('didUpdate:', getItemCart)
      const { name, price, img, count } = item[0]
      console.log('item[0]:', item[0])
      let dishesCount = []
      let newState = {}
      console.log('state:', state)
      // console.log(Object.values(state))
      Object.values(state).forEach(function (value, index) {
        let newCount = value.count

        if (value.name === name) {
          newCount = value.count + count
          dishesCount.push(newCount)
        }
        newState = {
          ...newState,
          name: value.name,
          price: value.price,
          img: value.img,
          count: newCount,
        }
      })
      console.log(newState)
      let stateClone = { ...state }
      setState(stateClone)
      console.log(stateClone)
      localStorage.setItem('cart', JSON.stringify(stateClone))
    }
  }, [item])
  useEffect(() => {
    let getStorage = JSON.parse(localStorage.getItem('cart'))
    if (getStorage != null) {
      // Json轉陣列
      // Object.keys(getStorage).map(function (_) {
      //   return getStorage[_]
      // })
      console.log('didMount:', getStorage)
      setState(getStorage)
    }
  }, [])

  function push() {
    let newObj = {}
    newObj.name = name
    newObj.price = price
    newObj.img = image_realistic
    let itemClone = [...item]
    // newObj.count = 0
    if (item.length == 0) {
      newObj.count = 0
      itemClone.push(newObj)

      setItem(itemClone)
    }

    if (item !== []) {
      let foundFood = itemClone.find((value) => {
        return value.name === name
      })
      if (foundFood !== undefined) {
        foundFood.count += 1
        newObj.count = foundFood.count
      } else {
        newObj.count = 1
        itemClone.push(newObj)
      }
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
