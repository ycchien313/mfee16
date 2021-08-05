import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import '../../styles/dish/dish.scss'
import Food from '../../components/Dish/Food'
import FoodMiddle from '../../components/Dish/FoodMiddle'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

function Dish() {
  // 存取api
  const [dishState, setDishState] = useState('主餐')
  const [content, setContent] = useState([])
  const [main, setMain] = useState([])
  const [sub, setSub] = useState([])
  const [dessert, setDessert] = useState([])
  useEffect(function () {
    $.ajax({
      url: `http://localhost:3001/dish/data`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setSub(result)
      setContent(result)
      console.log(result)
    })
  }, [])

  let mainContent = []
  let subContent = []
  let dessertContent = []
  if (content.length > 0) {
    for (let i = 0; i < content.length; i++) {
      if (content[i].type === '主餐') {
        mainContent.push(content[i])
      } else if (content[i].type === '附餐') {
        subContent.push(content[i])
      } else {
        dessertContent.push(content[i])
      }
    }
  }

  console.log('main:', mainContent)
  console.log('sub:', subContent)
  console.log('dessert:', dessertContent)
  let mapArr = []
  switch (dishState) {
    case '主餐':
      mapArr = mainContent
      break
    case '附餐':
      mapArr = subContent
      break
    case '甜點':
      mapArr = dessertContent
      break
    default:
      break
  }

  // 給勳哥思考如何使用
  // mainContent : subContent : dessertContent

  useEffect(function () {}, [dishState])
  // 將api匯入至state
  useEffect(() => {
    $('.dish-tag').on('click', function () {
      $(this).addClass('active')
      $(this).closest('li').siblings().find('.dish-tag').removeClass('active')
    })
  }, [])
  //

  return (
    <>
      <Header />
      <div id="dish">
        <div className="hero-section">
          <div className="top-wave">
            <h1 className="h1 title">餐廳介紹</h1>
            <h3 className="h3 title">餐點介紹</h3>
            <img
              className="wave-1"
              src="http://localhost:3000/images/dish/top-wave.svg"
              alt=""
            />
            <img
              className="elfin"
              src="http://localhost:3000/images/dish/elfin-green.png"
              alt=""
            />
          </div>
          <div className="slogan">
            <div className="bottom-wave"></div>
            <div className="h2 title">預約一個音樂ｘ美食ｘ森林的美好夜晚。</div>
          </div>
        </div>
        <main>
          <div className="food">
            <div className="tag">
              <ul className="tag-ul">
                <li>
                  <div
                    className="main-dish dish-tag active"
                    onClick={() => {
                      setDishState('主餐')
                    }}
                  >
                    <img
                      className="main-tag"
                      src="http://localhost:3000/images/dish/rock.svg"
                      alt=""
                    ></img>
                    <span className="title-text">主餐</span>
                  </div>
                </li>
                <li>
                  <div
                    className="with-dish dish-tag"
                    onClick={() => {
                      setDishState('附餐')
                    }}
                  >
                    <img
                      className="with-tag"
                      src="http://localhost:3000/images/dish/jazz.svg"
                      alt=""
                    ></img>
                    <span className="title-text">附餐</span>
                  </div>
                </li>
                <li>
                  <div
                    className="dessert-dish dish-tag"
                    onClick={() => {
                      setDishState('甜點')
                    }}
                  >
                    <img
                      className="dessert-tag"
                      src="http://localhost:3000/images/dish/lyrical.svg"
                      alt=""
                    ></img>
                    <span className="title-text">甜點</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="food-title h2">{dishState}</div>
            <div className="introduction-all">
              {mapArr.map(function (value, index) {
                if (index % 2 == 0) {
                  return (
                    <Food
                      key={index}
                      name={value.name}
                      price={value.price}
                      introduction={value.introduction}
                      image_realistic={value.image_realistic}
                    />
                  )
                }
                if (index % 2 != 0) {
                  return (
                    <FoodMiddle
                      key={index}
                      image_realistic={value.image_realistic}
                      name={value.name}
                      price={value.price}
                      introduction={value.introduction}
                    />
                  )
                }
              })}
            </div>
            <div className="btn">
              <div className="guide-button orange">
                線上訂位
                <img
                  src="http://localhost:3000/images/dish/arrow-circle-right-solid.svg"
                  alt=""
                ></img>
              </div>
              <div className="guide-button pink">
                外送訂餐
                <img
                  src="http://localhost:3000/images/dish/arrow-circle-right-solid.svg"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Dish
