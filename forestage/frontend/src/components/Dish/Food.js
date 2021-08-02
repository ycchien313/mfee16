import React from 'react'

function Food(props) {
  let { name, price, introduction, image_realistic } = props
  let defaulDomain = 'http://localhost:3000/images/dish/'
  return (
    <>
      <div className="pizza food-m">
        <div className="introduction">
          <div className="imgb">
            <img className="img" src={defaulDomain + image_realistic} alt="" />
          </div>
          <div className="introduction-text">
            <div className="introduction-title">
              <div className="h3">{name}</div>
              <div className="assess h4">
                <div className="star">
                  <div className="empty_star">★★★★★</div>
                  <div className="full_star">★★★★★</div>
                </div>
                <div className="h4">(222)</div>
              </div>
            </div>
            <div className="link-top"></div>
            <div className="price h4">${price}元</div>
            <div className="introduction-content h5">{introduction}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Food
