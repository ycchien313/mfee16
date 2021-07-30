import React, { useEffect, useState } from 'react'
import $ from 'jquery'
function Dish(props) {
  let domain = 'http://localhost:3000/images/dish/'
  const [count, setCount] = useState(1)
  let { name, price, image_realistic, className, all, setAll, item, setItem } =
    props
  const [productState, setProductState] = useState()
  const [countState, setCountState] = useState(1)
  const [localCart, setLocalCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [itemClone, setItemClone] = useState('')
  const [didMount, setDidMount] = useState(true)
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
    let cartStorage = JSON.parse(localStorage.getItem('cart'))
    console.log('didMount cart:', cartStorage)
    // setCart(cartStorage)
    if (Boolean(localStorage.getItem('cart'))) {
      setItem(cartStorage)
    }
    $('.button-orange-s').on('click', function () {
      console.log('button-click')
      $('.cart-big').removeClass('disabled')
      $('.cart-small').removeClass('disabled')
    })
    // setDidMount(false)
  }, [])

  // useEffect(() => {
  //   if (didMount === false) {
  //     console.log('didUpdate cart:', cart)
  //     console.log('didUpdate item:', item)
  //     console.log('didUpdate itemClone:', itemClone)

  //     // localStorage cart 有資料的時候才跑
  //     if (cart !== null) {
  //       // 複製的 item 還沒有資料時(點加入鈕第一次時)
  //       if (itemClone.length === 0) {
  //         console.log('一')

  //         let newCart = [...cart]

  //         // 找相同名稱的餐點，數量+1
  //         cart.some((v, i) => {
  //           if (v.name === item[item.length - 1].name) {
  //             newCart[i].count = parseInt(newCart[i].count) + 1
  //             return true

  //             // 在 cart 都沒有該餐點存在時
  //           } else if (i === cart.length - 1) {
  //             console.log('六')
  //             newCart.push({
  //               name: item[item.length - 1].name,
  //               price: item[item.length - 1].price,
  //               img: item[item.length - 1].img,
  //               count: 1,
  //             })
  //           }
  //         })
  //         console.log('itemClone:', itemClone)
  //         console.log('item:', item)
  //         setItemClone(JSON.parse(JSON.stringify(item)))
  //         setCart(newCart)
  //         localStorage.setItem('cart', JSON.stringify(newCart))

  //         // 複製的 item 有資料時(點加入鈕第二次以後)
  //       } else {
  //         console.log('二')
  //         console.log('itemClone:', itemClone)
  //         console.log('item:', item)
  //         let newCart = [...cart]
  //         item.forEach((itemV, i) => {
  //           if (itemClone[i] === undefined) {
  //             console.log('三')

  //             cart.some((cartV, i) => {
  //               // 找相同名稱的餐點，數量+1
  //               if (cartV.name === itemV.name) {
  //                 console.log('五')
  //                 newCart[i].count = parseInt(newCart[i].count) + 1
  //                 return true

  //                 // 在 cart 都沒有該餐點存在時
  //               } else if (i === cart.length - 1) {
  //                 console.log('六')
  //                 newCart.push({
  //                   name: itemV.name,
  //                   price: itemV.price,
  //                   img: itemV.img,
  //                   count: 1,
  //                 })
  //               }
  //             })

  //             // item 有新的物件時
  //           } else if (itemV.count - itemClone[i].count === 1) {
  //             console.log('四')

  //             // 找相同名稱的餐點，數量+1
  //             cart.forEach((cartV, i) => {
  //               if (cartV.name === itemV.name) {
  //                 newCart[i].count = parseInt(newCart[i].count) + 1
  //               }
  //             })
  //           }
  //         })

  //         setItemClone(JSON.parse(JSON.stringify(item)))
  //         setCart(newCart)
  //         localStorage.setItem('cart', JSON.stringify(newCart))
  //       }

  //       // 沒有 cart 存在的時候
  //     } else {
  //       localStorage.setItem('cart', JSON.stringify(item))
  //     }
  //   }
  // }, [item])

  // useEffect(() => {
  //   if (item.length > 0) {
  //     // let target = JSON.stringify(item)
  //     console.log('item[0]:', item[0])
  //     console.log('item:', item)
  //     console.log('state:', state)

  //     const { name, price, img, count } = item[0]
  //     let dishesCount = [] //存放 localstorage 的所有餐點數量
  //     let newState = {} // 存放原本 state 的狀態

  //     // 跑 state 所有的物件
  //     Object.values(state).forEach(function (value, index) {
  //       let newCount = value.count

  //       if (value.name === name) {
  //         newCount = value.count + count
  //         dishesCount.push(newCount)
  //       }
  //       newState = {
  //         ...newState,
  //         name: value.name,
  //         price: value.price,
  //         img: value.img,
  //         count: newCount,
  //       }
  //     })

  //     console.log('newState:', newState)
  //     let stateClone = { ...state }
  //     setState(stateClone)
  //     console.log('stateClone:', stateClone)
  //     localStorage.setItem('cart', JSON.stringify(stateClone))
  //   }
  // }, [item])

  function push() {
    // 餐點資訊組合成物件形式
    let newObj = {}
    newObj.name = name
    newObj.price = price
    newObj.img = image_realistic
    // 複製
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
