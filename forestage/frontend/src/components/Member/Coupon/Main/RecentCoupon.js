import React from 'react'

function RecentCoupon() {
  return (
    <>
      {/* 電腦版優惠券 */}
      <div className="recent-content">
        <div className="content-container">
          <div className="coupon-row">
            <div className="coupon-box">
              <div className="coupon-left">
                <i className="fas fa-vote-yea"></i>
              </div>
              <div className="coupon-middle"></div>
              <div className="coupon-right">
                <div className="msg-box">
                  <h4 className="title">參予歌手投票獎勵</h4>
                  <div className="sub-title">
                    <p>使用期限 2021.07.05</p>
                    <p>低消金額 1000 元</p>
                  </div>
                </div>
                <h3 className="discount">-100 元</h3>
                <div className="hole"></div>
              </div>
            </div>

            <div className="coupon-box">
              <div className="coupon-left">
                <i className="fas fa-gamepad"></i>
              </div>
              <div className="coupon-middle"></div>
              <div className="coupon-right">
                <div className="msg-box">
                  <h4 className="title">參予小遊戲獎勵</h4>
                  <div className="sub-title">
                    <p>使用期限 2021.07.05</p>
                    <p>低消金額 500 元</p>
                  </div>
                </div>
                <h3 className="discount">-50 元</h3>
                <div className="hole"></div>
              </div>
            </div>
          </div>

          <div className="coupon-row">
            <div className="coupon-box">
              <div className="coupon-left">
                <i className="fas fa-pen"></i>
              </div>
              <div className="coupon-middle"></div>
              <div className="coupon-right">
                <div className="msg-box">
                  <h4 className="title">發表評論獎勵</h4>
                  <div className="sub-title">
                    <p>使用期限 2021.07.05</p>
                    <p>低消金額 1000 元</p>
                  </div>
                </div>
                <h3 className="discount">-200 元</h3>
                <div className="hole"></div>
              </div>
            </div>
            <div className="coupon-box empty">
              <div className="coupon-left"></div>
              <div className="coupon-middle empty"></div>
              <div className="coupon-right">
                <div className="hole"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 手機版優惠券 */}
      <div className="recent-content-md">
        <div className="coupon-row">
          <div className="coupon-box">
            <div className="coupon-left">
              <i className="fas fa-vote-yea"></i>
            </div>
            <div className="coupon-middle"></div>
            <div className="coupon-right">
              <div className="msg-box">
                <h4 className="title">參予歌手投票獎勵</h4>
                <div className="sub-title">
                  <p>使用期限 2021.07.05</p>
                  <p>低消金額 1000 元</p>
                </div>
              </div>
              <h3 className="discount">-100 元</h3>
              <div className="hole"></div>
            </div>
          </div>
        </div>
        <div className="coupon-row">
          <div className="coupon-box">
            <div className="coupon-left">
              <i className="fas fa-gamepad"></i>
            </div>
            <div className="coupon-middle"></div>
            <div className="coupon-right">
              <div className="msg-box">
                <h4 className="title">參予小遊戲獎勵</h4>
                <div className="sub-title">
                  <p>使用期限 2021.07.05</p>
                  <p>低消金額 500 元</p>
                </div>
              </div>
              <h3 className="discount">-50 元</h3>
              <div className="hole"></div>
            </div>
          </div>
        </div>
        <div className="coupon-row">
          <div className="coupon-box">
            <div className="coupon-left">
              <i className="fas fa-pen"></i>
            </div>
            <div className="coupon-middle"></div>
            <div className="coupon-right">
              <div className="msg-box">
                <h4 className="title">發表評論獎勵</h4>
                <div className="sub-title">
                  <p>使用期限 2021.07.05</p>
                  <p>低消金額 1000 元</p>
                </div>
              </div>
              <h3 className="discount">-200 元</h3>
              <div className="hole"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentCoupon
