import React from 'react'
import '../../../../styles/member/member_customer_service.scss'

function CustomerService() {
  return (
    <>
      {/* <div class="target hide">
        <div class="content">
          <button class="close">
            <i class="fas fa-times"></i>
          </button>
          <div class="mine">
            <div class="avatar">
              <figure>
                <img src="./img/苦主.png" alt="" />
              </figure>
            </div>
            <div class="message">拎喇阿勒</div>
          </div>
          <div class="admin">
            <div class="avatar">
              <figure>
                <img src="./img/admin.png" alt="" />
              </figure>
            </div>
            <div class="message">?</div>
          </div>
          <div class="mine">
            <div class="avatar">
              <figure>
                <img src="./img/苦主.png" alt="" />
              </figure>
            </div>
            <div class="message">Lorem, ipsum dolor.</div>
          </div>
          <div class="mine">
            <div class="avatar">
              <figure>
                <img src="./img/苦主.png" alt="" />
              </figure>
            </div>
            <div class="message">Lorem, ipsum dolor.</div>
          </div>
        </div>
        <div class="inputSide">
          <div class="input">
            <input type="text" placeholder="寫點什麼..." />
          </div>
          <button class="submit">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
      
       */}

      <div className="member-customer-service">
        {/* 線上客服對話框 */}
        <div className="chat-dialog-box-container">
          <div className="dialog-box">
            <div className="admin-row ">
              <div className="avatar-box">
                <img
                  className="avatar"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/customer_service_btn.png'
                  }
                  alt=""
                ></img>
                {/* <span className="name">管理員</span> */}
              </div>
              <div className="message-box">
                <div className="content-box">
                  <span className="content">
                    您好，請問有什麼需要服務的嗎?您好，請問有什麼需要服務的嗎?您好，請問有什麼需要服務的嗎?
                  </span>
                </div>
                <span className="time">12:10:50</span>
              </div>
            </div>
            <div className="customer-row">
              <div className="message-box">
                <div className="content-box">
                  <span className="content">請問餐廳的營業時間是甚麼時候?</span>
                </div>
                <span className="time">12:11:30</span>
              </div>
              <div className="avatar-box">
                <img
                  className="avatar"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/customer_service_btn.png'
                  }
                  alt=""
                ></img>
                {/* <span className="name">鄒安琪</span> */}
              </div>
            </div>
          </div>
          <div className="reply-box">
            <div class="content-box">
              <input class="content" type="text" placeholder="寫點什麼..." />
            </div>
            <button class="submit orange-guide-button">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

        {/* 線上客服按鈕 */}
        <div className="chat-button-container">
          <figure className="chat-button">
            <img
              src={
                process.env.PUBLIC_URL +
                '/images/member/customer_service_btn.png'
              }
              alt=""
            />
          </figure>
        </div>
      </div>
    </>
  )
}

export default CustomerService
