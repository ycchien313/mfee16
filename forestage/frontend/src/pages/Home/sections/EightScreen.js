import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Dish from '../../../components/Home/Dish'
import { Link } from 'react-router-dom'
function EightScreen(props) {
  // 預設狀態
  const [dish, setDish] = useState()
  const [dishState, setDishState] = useState('')
  // map出的目標
  const [targetDish, setTargetDish] = useState([])
  const [text, setText] = useState()
  // 購物車用
  let { all, setAll, item, setItem } = props
  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/home/dish',
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setDish(result)
      setTargetDish([result[0], result[1], result[2]])
      console.log('current State:', dishState)
    })

    $('.dish-title').on('click', function () {
      $(this).addClass('active')
      $(this).closest('li').siblings().find('.dish-title').removeClass('active')
    })
  }, [])
  // 設定欲顯示之餐點
  useEffect(() => {
    console.log('current State:', dishState)
    // 將state內的狀態存進複製陣列
    if (dish) {
      let dishClone = [...dish]
      console.log('Before dishClone:', dishClone)
      // 將複製陣列內篩選過後的狀態再次存進新陣列
      let newDishClone = dishClone.filter(function (value, index) {
        return value.type === dishState
      })
      // 配置class
      for (let i = 0; i < newDishClone.length; i++) {
        switch (dishState) {
          case '主餐':
            newDishClone[i].class = 'main'
            break
          case '附餐':
            newDishClone[i].class = 'sub'
            break
          case '甜點':
            newDishClone[i].class = 'dessert'
            break
          default:
            newDishClone[i].class = 'main'
        }
      }
      console.log('After dishClone:', newDishClone)
      // 將class給到後的新複製陣列存回state
      setTargetDish(newDishClone)
    }
  }, [dishState])

  let content = (
    <div id="eighthScreen">
      <h2>外送訂餐</h2>
      <div className="change-dish-type active">
        <ul>
          <li>
            <button
              className="dish-title main active"
              onClick={() => {
                setDishState('主餐')
              }}
            >
              <h4>主餐</h4>
            </button>
          </li>
          <li>
            <button
              className="dish-title sub"
              onClick={() => {
                setDishState('附餐')
              }}
            >
              <h4>附餐</h4>
            </button>
          </li>
          <li>
            <button
              className="dish-title dessert"
              onClick={() => {
                setDishState('甜點')
              }}
            >
              <h4>甜點</h4>
            </button>
          </li>
        </ul>
      </div>
      <div className="delivery">
        <ul>
          {console.log('targetDish:', targetDish)}
          {targetDish.length > 0 &&
            targetDish.map(function (value, index) {
              return (
                <Dish
                  key={value.dish_id}
                  name={value.name}
                  price={value.price}
                  image_realistic={value.image_realistic}
                  className={value.class}
                  all={all}
                  setAll={setAll}
                  item={item}
                  setItem={setItem}
                />
              )
            })}
        </ul>
        <Link to={{ pathname: '/delivery' }}>
          <button className="button-red bot-button">
            <h4 className="btn-innerText">去訂餐</h4>
            <i className="fas fa-arrow-circle-right"></i>
          </button>
        </Link>
      </div>
    </div>
  )
  return <>{content}</>
}

export default EightScreen
