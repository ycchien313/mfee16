import React, { useEffect, useState } from 'react'
import MealCard from '../MealsBig/MealCard'

function MealsSmall(props) {
  const {
    dishes,
    showDishes,
    setShowDishes,
    checkList,
    setCheckList,
    dishCount,
    setDishCount,
  } = props
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setDidMount(true)
  }, [])
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
      <div className="category-group">
        <div className="category">
          <h4>主餐</h4>
          <img
            src="http://localhost:3000/images/reservation/maindish-bg.svg"
            alt=""
          />
        </div>
      </div>
      <div className="wrapper">
        <div className="cards">
          {dishes.map((v, i) => {
            if (v.type === '主餐') {
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
            }
          })}
        </div>
      </div>
      <p className="order-info">
        低消金額：<span className="minimum">{checkList.minOrder}</span>{' '}
        元&nbsp;&nbsp;目前金額：
        <span className="total">{checkList.total}</span> 元
      </p>
      <div className="category-group">
        <div className="category">
          <h4>附餐</h4>
          <img
            src="http://localhost:3000/images/reservation/sidedish-bg.svg"
            alt=""
          />
        </div>
      </div>
      <div className="wrapper">
        <div className="cards">
          {dishes.map((v, i) => {
            if (v.type === '附餐') {
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
            }
          })}
        </div>
      </div>
      <p className="order-info">
        低消金額：<span className="minimum">{checkList.minOrder}</span>{' '}
        元&nbsp;&nbsp;目前金額：
        <span className="total">{checkList.total}</span> 元
      </p>
      <div className="category-group">
        <div className="category">
          <h4>甜點</h4>
          <img
            src="http://localhost:3000/images/reservation/dessert-bg.svg"
            alt=""
          />
        </div>
      </div>
      <div className="wrapper">
        <div className="cards">
          {dishes.map((v, i) => {
            if (v.type === '甜點') {
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
            }
          })}
        </div>
      </div>
      <p className="order-info">
        低消金額：<span className="minimum">{checkList.minOrder}</span>{' '}
        元&nbsp;&nbsp;目前金額：
        <span className="total">{checkList.total}</span> 元
      </p>
    </>
  )
}
export default MealsSmall
