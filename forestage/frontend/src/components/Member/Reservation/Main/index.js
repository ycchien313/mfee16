import React, { useState, useEffect } from 'react'
import Aside from '../../Common/Main/Aside'
import Breadcrumb from '../../Common/Main/Breadcrumb'
import '../../../../styles/member/aside.scss'
import '../../../../styles/member/reservation.scss'

function Main(props) {
  const { pagename } = props
  const [isRecent, setIsRecent] = useState(true)

  return (
    <>
      <div className="reservation">
        <main className="main">
          <div className="main-container">
            {/* <!-- 左側：導覽列 --> */}
            <Aside pagename={pagename} />
            {/* <!-- 右側：麵包屑、內容--> */}
            <div className="right-side">
              {/* <!-- 麵包屑 --> */}
              <Breadcrumb pagename={pagename} />

              {/* <!-- ********** 不同部份開始 ********** --> */}
              {/* <!-- 頁籤 --> */}
              <div class="tab">
                <div class="tab-container">
                  <div
                    className={isRecent ? 'tab-item active' : 'tab-item'}
                    id="tabRecent"
                    onClick={() => {
                      setIsRecent(true)
                    }}
                  >
                    <h4>近期訂單</h4>
                  </div>
                  <div
                    className={isRecent ? 'tab-item' : 'tab-item active'}
                    id="tabHistory"
                    onClick={() => {
                      setIsRecent(false)
                    }}
                  >
                    <h4>歷史紀錄</h4>
                  </div>
                </div>
              </div>

              {/* <!-- 近期訂單 --> */}
              <div class="recent-content active">
                <div class="content-container">
                  <div class="content-head">
                    <h4 class="content-head-title">訂單編號 #202106071111</h4>
                    <div class="detail-container">
                      <i class="fas fa-eye"></i>
                    </div>
                  </div>
                  <div class="content-body">
                    <table class="content-table">
                      <thead>
                        <tr>
                          <th>送餐時間</th>
                          <th>餐點</th>
                          <th>總金額</th>
                          <th>訂購人</th>
                          <th>取餐地址</th>
                          <th>聯絡電話</th>
                          <th>備註</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2021/07/15</td>
                          <td>
                            <p>潛艇堡*1</p>
                          </td>
                          <td>1500</td>
                          <td>王大明</td>
                          <td>桃園市中壢區中央路100號</td>
                          <td>0912345678</td>
                          <td>餐點幫我放門口</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <p>潛艇堡*1</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <p>瑪格莉特大披薩*1</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <!-- 按鈕列 --> */}
                  <div class="content-foot">
                    <div class="btns-container">
                      <button
                        class="
                                            cancel-resv-btn
                                            guide-button
                                        "
                      >
                        取消訂單
                      </button>
                    </div>
                  </div>

                  {/* <!-- 手機版按鈕列 --> */}
                  <div class="content-foot-md">
                    <div class="msgbox-container">
                      <p>共6件餐點</p>
                      <p>合計金額: 2000元</p>
                    </div>
                    <div class="btns-container">
                      <button class="cancel-resv-btn guide-button">
                        取消訂單
                      </button>
                    </div>
                  </div>
                </div>
                <div class="content-container">
                  <div class="content-head">
                    <h4 class="content-head-title">訂單編號 #202106071111</h4>
                    <div class="detail-container">
                      <i class="fas fa-eye"></i>
                    </div>
                  </div>
                  <div class="content-body">
                    <table class="content-table">
                      <thead>
                        <tr>
                          <th>送餐時間</th>
                          <th>餐點</th>
                          <th>總金額</th>
                          <th>訂購人</th>
                          <th>取餐地址</th>
                          <th>聯絡電話</th>
                          <th>備註</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2021/07/15</td>
                          <td>
                            <p>潛艇堡*1</p>
                          </td>
                          <td>1500</td>
                          <td>王大明</td>
                          <td>桃園市中壢區中央路100號</td>
                          <td>0912345678</td>
                          <td>餐點幫我放門口</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <p>潛艇堡*1</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <p>瑪格莉特大披薩*1</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <!-- 按鈕列 --> */}
                  <div class="content-foot">
                    <div class="btns-container">
                      <button
                        class="
                                            cancel-resv-btn
                                            guide-button
                                        "
                      >
                        取消訂單
                      </button>
                    </div>
                  </div>

                  {/* <!-- 手機版按鈕列 --> */}
                  <div class="content-foot-md">
                    <div class="msgbox-container">
                      <p>共6件餐點</p>
                      <p>合計金額: 2000元</p>
                    </div>
                    <div class="btns-container">
                      <button class="cancel-resv-btn guide-button">
                        取消訂單
                      </button>
                    </div>
                  </div>
                </div>
                <div class="content-container">
                  <div class="content-head">
                    <h4 class="content-head-title">訂單編號 #202106071111</h4>
                    <div class="detail-container">
                      <i class="fas fa-eye"></i>
                    </div>
                  </div>
                  <div class="content-body">
                    <table class="content-table">
                      <thead>
                        <tr>
                          <th>送餐時間</th>
                          <th>餐點</th>
                          <th>總金額</th>
                          <th>訂購人</th>
                          <th>取餐地址</th>
                          <th>聯絡電話</th>
                          <th>備註</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2021/07/15</td>
                          <td>
                            <p>潛艇堡*1</p>
                          </td>
                          <td>1500</td>
                          <td>王大明</td>
                          <td>桃園市中壢區中央路100號</td>
                          <td>0912345678</td>
                          <td>餐點幫我放門口</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <p>潛艇堡*1</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <p>瑪格莉特大披薩*1</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <!-- 按鈕列 --> */}
                  <div class="content-foot">
                    <div class="btns-container">
                      <button
                        class="
                                            cancel-resv-btn
                                            guide-button
                                        "
                      >
                        取消訂單
                      </button>
                    </div>
                  </div>

                  {/* <!-- 手機版按鈕列 --> */}
                  <div class="content-foot-md">
                    <div class="msgbox-container">
                      <p>共6件餐點</p>
                      <p>合計金額: 2000元</p>
                    </div>
                    <div class="btns-container">
                      <button class="cancel-resv-btn guide-button">
                        取消訂單
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- 歷史紀錄 --> */}
              <div class="history-content active d-none">
                <div class="content-container">
                  <div class="content-body">
                    <table class="content-table">
                      <thead>
                        <tr>
                          <th>訂單編號</th>
                          <th>日期</th>
                          <th>狀態</th>
                          <th>更多</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>20210620001</td>
                          <td>2021/06/20</td>
                          <td>已完成</td>
                          <td>
                            <i class="fas fa-eye"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>20210630001</td>
                          <td>2021/06/30</td>
                          <td>已完成</td>
                          <td>
                            <i class="fas fa-eye"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>20210715001</td>
                          <td>2021/07/15</td>
                          <td>已取消</td>
                          <td>
                            <i class="fas fa-eye"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>20210718001</td>
                          <td>2021/08/18</td>
                          <td>已取消</td>
                          <td>
                            <i class="fas fa-eye"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div style={{ height: '100vh' }}></div>
    </>
  )
}

export default Main
