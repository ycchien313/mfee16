import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import Dish from './Components/Dish'
import { Link } from 'react-router-dom'
function EightScreen(props) {
  const [dish, setDish] = useState([])

  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/home/dish/main',
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setDish(result)
    })
  }, [])

  let content = (
    <div id="eighthScreen">
      <h2>外送訂餐</h2>
      <div className="delivery">
        <ul>
          {dish.length > 0 &&
            dish.map(function (value, index) {
              return (
                <Dish
                  key={value.id}
                  name={value.name}
                  price={value.price}
                  img={value.image_realistic}
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
