import React from 'react'

function EightScreen(props) {
  let content = (
    <div id="eighthScreen">
      <h2>外送訂餐</h2>
      <div className="delivery">
        <ul>
          <li>
            <div className="delivery-item">
              <figure>
                <img src="./image/dish/菜單-瑪格莉特大pizza.jpg" alt="" />
              </figure>
              <h4>瑪格莉特大披薩</h4>
              <h4>$ 300</h4>
              <button className="button-orange-s">
                <h4 className="btn-innerText-s">加入</h4>
                <i className="fas fa-cart-plus"></i>
              </button>
            </div>
          </li>
          <li>
            <div className="delivery-item">
              <figure>
                <img src="./image/dish/菜單-墨西哥雞肉捲.jpg" alt="" />
              </figure>
              <h4>墨西哥雞肉捲</h4>
              <h4>$ 300</h4>
              <button className="button-orange-s">
                <h4 className="btn-innerText-s">加入</h4>
                <i className="fas fa-cart-plus"></i>
              </button>
            </div>
          </li>
          <li>
            <div className="delivery-item">
              <figure>
                <img src="./image/dish/菜單-碳烤豬肋排.jpg" alt="" />
              </figure>
              <h4>碳烤豬肋排</h4>
              <h4>$ 500</h4>
              <button className="button-orange-s">
                <h4 className="btn-innerText-s">加入</h4>
                <i className="fas fa-cart-plus"></i>
              </button>
            </div>
          </li>
        </ul>
        <button className="button-red bot-button">
          <h4 className="btn-innerText">去訂餐</h4>
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  )
  return <>{content}</>
}

export default EightScreen
