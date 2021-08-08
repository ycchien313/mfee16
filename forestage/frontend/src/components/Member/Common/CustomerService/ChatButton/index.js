import React from 'react'
import webSocket from 'socket.io-client'

function ChatButton(props) {
  const { isShowDialogBox, setIsShowDialogBox, setWs } = props

  return (
    <>
      <div className="chat-button-container">
        <h4>線上客服</h4>
        <figure className="chat-button">
          <img
            src={
              process.env.PUBLIC_URL + '/images/member/customer_service_btn.png'
            }
            alt=""
            onClick={() => {
              if (isShowDialogBox === false) {
                setIsShowDialogBox(true)
                setWs(webSocket('http://localhost:3001'))
              } else {
                setIsShowDialogBox(false)
              }
            }}
          />
        </figure>
      </div>
    </>
  )
}

export default ChatButton
