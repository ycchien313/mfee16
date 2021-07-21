import React from 'react'

function Map(props) {
  const { dist, inputDist, rd, inputRd } = props

  return (
    <>
      <div className="top-wave">
        <h1 className="h1 title">外送頁面</h1>
        <div className="mobile-takeout">
          <div className="takeoutDiv">
            <h3>請輸入您要外送的地址</h3>
            <div className="Area">
              <input
                type="text"
                defaultValue="桃園市"
                className="input-disable"
                disabled
              />
              <input
                type="text"
                className="takeoutInput add"
                defaultValue={dist}
                onChange={(event) => {
                  inputDist(event.target.value)
                }}
              />
            </div>
            <input
              type="text"
              className="takeoutInput add-r"
              defaultValue={rd}
              onChange={(event) => {
                inputRd(event.target.value)
              }}
            />
            <div className="Shipping">
              <p>免運門檻: 300 元</p>
              <p>運費: 60 元</p>
            </div>
          </div>
        </div>
        <img
          className="wave-1"
          src={
            'http://localhost:3000/images/delivery/FoodDelivery/top-wave.svg'
          }
          alt=""
        />
        <img
          className="elfin"
          src={
            'http://localhost:3000/images/delivery/FoodDelivery/YellowElfin.png'
          }
          alt=""
        />
        <img
          className="path"
          src={'http://localhost:3000/images/delivery/FoodDelivery/Path .png'}
          alt=""
        />
      </div>
      <div className="left-div">
        <div className="map">
          <div className="banner-DialogBox">
            <h3 className="banner-text">請選擇你的位置 !</h3>
          </div>
          <img
            src={
              'http://localhost:3000/images/delivery/FoodDelivery/Taoyuan.png'
            }
            alt=""
            className="Taoyuan"
          />
          <img
            src={'http://localhost:3000/images/delivery/FoodDelivery/pin.png'}
            alt=""
            className="pin"
          />
        </div>
      </div>
      <div className="right-div">
        <img
          className="pinkElfin"
          src={
            'http://localhost:3000/images/delivery/FoodDelivery/PinkElfin.png'
          }
          alt=""
        />
        <div className="takeout">
          <div className="takeoutDiv">
            <h3>請輸入您要外送的地址</h3>
            <div className="Area">
              <input
                type="text"
                defaultValue="桃園市"
                className="input-disable"
                disabled
              />
              <input
                type="text"
                defaultValue="中壢區"
                className="takeoutInput add"
              />
            </div>
            <input
              type="text"
              defaultValue="中大路100號"
              className="takeoutInput add-r"
            />
            <div className="Shipping">
              <p>免運門檻: 300 元</p>
              <p>運費: 60 元</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Map
