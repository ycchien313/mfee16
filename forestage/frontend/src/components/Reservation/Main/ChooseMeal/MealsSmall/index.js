import React from 'react'
import '../../../../../styles/reservation/res/reservation-meal-RWD.scss'
function MealsSmall() {
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
          <div className="card maindish">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
          <div className="card maindish">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
          <div className="card maindish">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
        </div>
      </div>
      <p className="order-info">
        低消金額：<span className="minimum">3000</span> 元&nbsp;&nbsp;目前金額：
        <span className="total">600</span> 元
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
          <div className="card sidedish">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
          <div className="card sidedish">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
          <div className="card sidedish">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
        </div>
      </div>
      <p className="order-info">
        低消金額：<span className="minimum">3000</span> 元&nbsp;&nbsp;目前金額：
        <span className="total">600</span> 元
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
          <div className="card dessert">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
          <div className="card dessert">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
          <div className="card dessert">
            <div className="card-image"></div>
            <div className="button-group">
              <div className="minus-button"></div>
              <input type="number" min="0" value="0" />
              <div className="plus-button"></div>
            </div>
            <span>瑪格莉特大披薩</span>
          </div>
        </div>
      </div>
      <p className="order-info">
        低消金額：<span className="minimum">3000</span> 元&nbsp;&nbsp;目前金額：
        <span className="total">600</span> 元
      </p>
    </>
  )
}
export default MealsSmall
