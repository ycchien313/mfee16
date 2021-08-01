import React from 'react'
function CheckList() {
  return (
    <>
      <div class="clipboard">
        <div class="content">
          <div class="title">
            <h4>訂位資料</h4>
            <i class="fas fa-clipboard-list"></i>
          </div>
          <ul>
            <li>
              <div class="name">
                <i class="fas fa-check-circle active"></i>
                <span>日期</span>
              </div>
              <span class="detail">10/17 (四)</span>
            </li>
            <li>
              <div class="name">
                <i class="fas fa-check-circle active"></i>
                <span>歌手</span>
              </div>
              <span class="detail">蕭敬騰</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i class="fas fa-check-circle"></i>
                <span>座位區</span>
              </div>
              <span class="detail">搖滾區</span>
            </li>
            <li>
              <div class="name">
                <i class="fas fa-check-circle"></i>
                <span>訂位數量</span>
              </div>
              <span class="detail">3</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i class="fas fa-check-circle"></i>
                <span>低消金額</span>
              </div>
              <span class="detail">3000</span>
            </li>
            <li>
              <div class="name">
                <i class="fas fa-check-circle"></i>
                <span>目前金額</span>
              </div>
              <span class="detail"></span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i class="fas fa-check-circle"></i>
                <span>已選擇餐點</span>
              </div>
            </li>
            <li>瑪格麗特</li>
            <li>瑪格麗特</li>
            <li>瑪格麗特</li>
            <li>瑪格麗特</li>
            <li>瑪格麗特</li>
            <li>瑪格麗特</li>
          </ul>
        </div>
        <img
          src="http://localhost:3000/images/reservation/board-top.svg"
          alt=""
        />
        <button class="pink-guide-button">
          送出訂位
          <img
            src="http://localhost:3000/images/reservation/arrow-circle-right-solid.svg"
            alt=""
          />
        </button>
      </div>
    </>
  )
}
export default CheckList
