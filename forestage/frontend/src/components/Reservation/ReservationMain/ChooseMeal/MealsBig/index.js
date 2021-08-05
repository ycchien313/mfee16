import React, { useState, useEffect } from 'react'
import MealCard from './MealCard'
import Spinner from '../../../Spinner'
import { Tween } from 'react-gsap'

// 假餐點資料

function MealsBig(props) {
  const {
    dishes,
    showDishes,
    setShowDishes,
    checkList,
    setCheckList,
    dishCount,
    setDishCount,
  } = props

  const [mealType, setMealType] = useState('main')
  const [didMount, setDidMount] = useState(false)
  const [titleToggle, setTitleToggle] = useState([true, false, false])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])

  // spinner
  function isLoading() {
    setLoading(true)
    setInterval(() => {
      setLoading(false)
    }, 1500)
  }

  // 切換餐點種類
  useEffect(() => {
    if (didMount) {
      let newDishes
      switch (mealType) {
        case 'main':
          newDishes = [...showDishes]
          newDishes = dishes.filter((dish) => {
            return dish.type === '主餐'
          })
          break
        case 'side':
          newDishes = [...showDishes]
          newDishes = dishes.filter((dish) => {
            return dish.type === '附餐'
          })
          break
        case 'dessert':
          newDishes = [...showDishes]
          newDishes = dishes.filter((dish) => {
            return dish.type === '甜點'
          })
          break
        default:
          break
      }
      setShowDishes(newDishes)
    }
  }, [mealType])

  // 計算subtotal
  function getSubtotal(dishId) {
    let subtotal = 0
    let dish = dishes.find((item) => {
      return item.dish_id === dishId
    })
    subtotal = dish.price * dishCount[dishId]
    return subtotal
  }

  // 更新checkList的目前金額
  useEffect(() => {
    if (didMount) {
      let dishIdArr = Object.keys(dishCount)
      let total = 0
      dishIdArr.forEach((dishId) => {
        dishId = parseInt(dishId)
        total += getSubtotal(dishId)
      })
      let newObj = { ...checkList }
      newObj.total = total
      setCheckList(newObj)
    }
  }, [dishCount, setDishCount])

  return (
    <>
      <Tween
        from={{
          x: '-10vw',
        }}
        to={{
          x: '0px',
          scrollTrigger: {
            trigger: '.square',
            start: '2000px center',
            end: '2500px center',
            scrub: 1,
            markers: false,
          },
        }}
      >
        <div className="category-group">
          <div
            className={titleToggle[0] === true ? 'category active' : 'category'}
            // className="category"

            onClick={() => {
              setMealType('main')
              setTitleToggle([true, false, false])
              isLoading()
            }}
          >
            <h4>主餐</h4>
            <img
              src="http://localhost:3000/images/reservation/maindish-bg.svg"
              alt=""
            />
          </div>
          <div
            className={titleToggle[1] === true ? 'category active' : 'category'}
            onClick={() => {
              setMealType('side')
              setTitleToggle([false, true, false])
              isLoading()
            }}
          >
            <h4>附餐</h4>
            <img
              src="http://localhost:3000/images/reservation/sidedish-bg.svg"
              alt=""
            />
          </div>
          <div
            className={titleToggle[2] === true ? 'category active' : 'category'}
            onClick={() => {
              setMealType('dessert')
              setTitleToggle([false, false, true])
              isLoading()
            }}
          >
            <h4>甜點</h4>
            <img
              src="http://localhost:3000/images/reservation/dessert-bg.svg"
              alt=""
            />
          </div>
        </div>

        <div className="cards">
          {dishes.map((v, i) => {
            let imgIlluSrc =
              'http://localhost:3000/images/common/food/' + v.image_illustration
            return (
              <div
                className={
                  dishCount[v.dish_id] > 0 ? 'active illu-image' : 'illu-image'
                }
                id={`food-${v.dish_id}`}
              >
                <img src={imgIlluSrc} alt="" />
              </div>
            )
          })}

          {loading ? (
            <Spinner />
          ) : (
            showDishes.map((v, i) => {
              return (
                <MealCard
                  key={v.dish_id}
                  index={i}
                  id={v.dish_id}
                  imgIllu={v.image_illustration}
                  imgReal={v.image_realistic}
                  name={v.name}
                  type={v.type}
                  dishCount={dishCount}
                  setDishCount={setDishCount}
                  checkList={checkList}
                  setCheckList={setCheckList}
                  price={v.price}
                />
              )
            })
          )}
        </div>
      </Tween>
    </>
  )
}
export default MealsBig
