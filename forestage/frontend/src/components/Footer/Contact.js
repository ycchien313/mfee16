import React from 'react'

function Contact() {
  return (
    <>
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
    </>
  )
}

export default Contact
