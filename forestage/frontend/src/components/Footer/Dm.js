import React, { useState } from 'react'

function Dm() {
  const [email, setEmail] = useState('')
  const [tip, setTip] = useState('')
  const handleSumbit = (e) => {
    e.preventDefault()
    setTip('感謝您的訂閱！')

    setTimeout(() => {
      setEmail('')
      setTip('')
    }, 2000)
  }

  return (
    <>
      <form onSubmit={handleSumbit}>
        <div className="dm-container">
          <div className="dm-title-box">
            <div className="dm-title h4">訂閱電子報</div>
            <div className="dm-tip">{tip}</div>
          </div>
          <div className="dm-input-box">
            <input
              type="email"
              value={email}
              placeholder="  | 請輸入 email"
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <button className="orange-guide-button send-btn">送出</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Dm
