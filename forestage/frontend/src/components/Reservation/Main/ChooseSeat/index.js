import React from 'react'
function ChooseSeat() {
  return (
    <>
      <section class="choose-seat">
        <div class="steps">
          <h3 class="step one">選擇日期</h3>
          <div class="arrow"></div>
          <div class="active">
            <h3 class="step two">選擇座位</h3>
            <img
              src="http://localhost:3000/images/reservation/active-title.png"
              alt=""
            />
          </div>
          <div class="arrow"></div>
          <h3 class="step three">選擇餐點</h3>
        </div>
        <div class="seats-background">
          <div class="stage h4">舞台區</div>
          <div class="rock row active">
            <div class="seat-row">
              <div class="tables">
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="seat-info">
              <h3>搖滾區</h3>
              <span>低銷金額 $ 1000</span>
              <div class="button-group">
                <div class="minus-button"></div>
                <input type="number" min="0" value="0" />
                <div class="plus-button"></div>
              </div>
            </div>
          </div>
          <div class="middle row">
            <div class="seat-row">
              <div class="tables">
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="seat-info">
              <h3>中區&nbsp;</h3>
              <span>低銷金額 &nbsp;$ 600</span>
              <div class="button-group">
                <div class="minus-button"></div>
                <input type="number" min="0" value="0" />
                <div class="plus-button"></div>
              </div>
            </div>
          </div>
          <div class="back row">
            <div class="seat-row">
              <div class="tables">
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
                <img
                  src="http://localhost:3000/images/reservation/table.svg"
                  alt=""
                />
              </div>
            </div>
            <div class="seat-info">
              <h3>後區&nbsp;</h3>
              <span>低銷金額 &nbsp;$ 400</span>
              <div class="button-group">
                <div class="minus-button"></div>
                <input type="number" min="0" value="0" />
                <div class="plus-button"></div>
              </div>
            </div>
          </div>
          <div class="bar-info under">
            <span class="title">剩餘座位</span>
            <div class="rock">
              <div class="circle"></div>
              <p>
                搖滾區 <span>5</span> 席
              </p>
            </div>
            <div class="middle">
              <div class="circle"></div>
              <p>
                中區 <span>5</span> 席
              </p>
            </div>
            <div class="back">
              <div class="circle"></div>
              <p>
                後區 <span>5</span> 席
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 滑鼠滾輪 */}
      <div class="center-con">
        <div class="cta">
          <div class="down-arrow primera next "></div>
          <div class="down-arrow segunda next "></div>
        </div>
      </div>
    </>
  )
}

export default ChooseSeat
