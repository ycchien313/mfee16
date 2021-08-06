import React, { useState, useEffect } from 'react'
import $, { ajax } from 'jquery'
import '../../styles/dish/dish.scss'
import DishInfo from '../../components/Dish/DishInfo'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
function Dish() {
  // 存取api
  const [style, setStyle] = useState('主餐')
  const [tag, setTag] = useState([2, 1, 3])
  const [dishInfo, setDishInfo] = useState([])
  // 將api匯入至state

  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/dish/data/${style}`,
      method: `get`,
      dataType: `json`,
    }).then(function (result) {
      let dishInfoClone = []
      for (let i = 0; i < result.length; i++) {
        if (result[i].type === style) {
          dishInfoClone.push(result[i])
        }
      }
      setDishInfo(dishInfoClone)
    })
  }, [style])
  useEffect(() => {
    $('.dish-tag').on('click', function () {
      $(this).addClass('active')
      $(this).closest('li').siblings().find('.dish-tag').removeClass('active')
    })
    let newTag = tag
    console.log('newTag : ', newTag)
    setTag(newTag)
  }, [])
  //
  return (
    <>
      <Header />
      <div id="dish">
        <div class="hero-section">
          <div class="top-wave">
            <h1 class="h1 title">餐廳介紹</h1>
            <h3 class="h3 title">餐點介紹</h3>
            <img
              class="wave-1"
              src="http://localhost:3000/images/dish/top-wave.svg"
              alt=""
            />
            <img
              class="elfin"
              src="http://localhost:3000/images/dish/elfin-green.png"
              alt=""
            />
          </div>
          <div class="slogan">
            <div class="bottom-wave"></div>
            <div class="h2 title">預約一個音樂ｘ美食ｘ森林的美好夜晚。</div>
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
                      setStyle('主餐')
                      setTag([2, 1, 3])
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
                      setStyle('附餐')
                      setTag([4, 5, 6])
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
                      setStyle('甜點')
                      setTag([7, 8, 9])
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
            <DishInfo dishInfo={dishInfo} style={style} tag={tag} />
            <div class="btn">
              <div class="guide-button orange">
                去投票
                <img
                  src="http://localhost:3000/images/singer/arrow-circle-right-solid.svg"
                  alt=""
                />
              </div>
              <div class="guide-button pink">
                線上訂位
                <img
                  src="http://localhost:3000/images/singer/arrow-circle-right-solid.svg"
                  alt=""
                />
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
