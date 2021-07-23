import React from 'react'
import '../../styles/footer/footer.scss'

function footer() {
  return (
    <>
      <footer className="footer">
        {/* <!-- 手機版電子報 --> */}
        <div className="phone-dm">
          <div className="phone-dm-container">
            <div className="dm-title h3">訂閱電子報</div>
            <div className="dm-input-box">
              <input type="email" placeholder="  | 請輸入 email" required />
              <button className="guide-button orange">送出</button>
            </div>
          </div>
        </div>

        <div className="footer-container">
          <div className="footer-wave-outside">
            <div className="col">
              <figure className="figure-elfin">
                <img
                  className="elfin"
                  src={
                    process.env.PUBLIC_URL + '/images/footer/elfin-green.png'
                  }
                  alt=""
                />
              </figure>
              <figure className="figure-logo">
                <img
                  className="logo"
                  src={process.env.PUBLIC_URL + '/images/footer/logo-brown.png'}
                  alt=""
                />
              </figure>
            </div>
          </div>
          <div className="footer-wave-inside">
            <div className="col">
              <nav className="nav h4">
                <ul>
                  <li>線上訂位</li>
                </ul>
                <ul>
                  <li>歌手介紹</li>
                  <li>餐點介紹</li>
                </ul>
                <ul>
                  <li>撰寫評論</li>
                </ul>
                <ul>
                  <li>Live直播</li>
                  <li>歌手投票</li>
                  <li>小遊戲</li>
                </ul>
                <ul>
                  <li>會員資料</li>
                  <li>我的訂位</li>
                  <li>外送訂單</li>
                  <li>折價券</li>
                </ul>
                <ul>
                  <li>外送訂餐</li>
                </ul>
              </nav>
            </div>
            <div className="col">
              <div className="social">
                <div className="social-title h4">Follow Us</div>
                <div className="social-brand">
                  <i className="fab fa-facebook-square"></i>
                  <i className="fab fa-instagram-square"></i>
                  <i className="fab fa-line"></i>
                </div>
              </div>
              <form className="dm" action="">
                <div className="dm-title h4">訂閱電子報</div>
                <div className="dm-input-box">
                  <input type="email" placeholder="  | 請輸入 email" required />
                  <button className="send-btn">送出</button>
                </div>
              </form>
            </div>
            <div className="col">
              <div className="contact">
                <div className="contact-title h4">聯絡我們</div>
                <div className="contact-phone">01-2345678</div>
                <div className="contact-email">elfin@elfinbar.com</div>
                <div className="contact-address">桃園市中壢區中央路100號</div>
                <iframe
                  title="elfin address"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.1075566827085!2d121.18830551500488!3d24.962454984006026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682394f84dd34f%3A0x453986a042247e0f!2zMzIw5qGD5ZyS5biC5Lit5aOi5Y2A5Lit5aSu6LevMTAw6Jmf!5e0!3m2!1szh-TW!2stw!4v1624334034527!5m2!1szh-TW!2stw"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default footer
