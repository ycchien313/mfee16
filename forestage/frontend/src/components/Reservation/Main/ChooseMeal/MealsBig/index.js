import React, { useState, useEffect } from 'react'
import MealCard from './MealCard'

// 假餐點資料

function MealsBig(props) {
  const { dishes, setDishes, showDishes, setShowDishes } = props
  const [mealCountArr, setMealCountArr] = useState([])
  const [mealType, setMealType] = useState('main')
  const [didMount, setDidMount] = useState(false)
  const [titleToggle, setTitleToggle] = useState([true, false, false])

  useEffect(() => {
    setDidMount(true)
    // 建立一個陣列儲存每筆餐點數量
    let newMealCountArr = new Array(dishes.length).fill(0)
    setMealCountArr(newMealCountArr)
  }, [])

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

  return (
    <>
      <div className="category-group">
        <div
          className={titleToggle[0] === true ? 'category active' : 'category'}
          // className="category"

          onClick={() => {
            setMealType('main')
            setTitleToggle([true, false, false])
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
        {showDishes.map((v, i) => {
          return (
            <MealCard
              key={v.dish_id}
              index={i}
              id={v.dish_id}
              imgIllu={v.image_illustration}
              imgReal={v.image_realistic}
              name={v.name}
              type={v.type}
              setMealCountArr={setMealCountArr}
              mealCountArr={mealCountArr}
            />
          )
        })}
      </div>
    </>
  )
}
export default MealsBig
