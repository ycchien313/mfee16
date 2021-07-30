import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/comment/view.scss'

function View(props) {
  const { boom2, setBoom2, article, setArticle, boomArticle, setBoomArticle } =
    props
  const [message, setMessage] = useState([])
  const [insertMessage, setInsertMessage] = useState({
    message: '',
    member_id: 1,
    article_id: boomArticle.article_id,
  })
  console.log(boomArticle)
  function insertMessagefn() {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3001/comment/createmessage',
      data: {
        insertMessage: insertMessage,
      },
    })
  }
  function cleanMessage() {
    let newMessage = { ...insertMessage }
    newMessage.message = ''
    setInsertMessage(newMessage)
  }
  function setMessagefn(e) {
    let newMessage = { ...insertMessage }
    newMessage.message = e.target.value
    setInsertMessage(newMessage)
  }
  function getMessage() {
    axios
      .get(`http://127.0.0.1:3001/comment/article/${boomArticle.article_id}`)
      .then((result) => {
        setMessage(result.data)
        console.log(result.data)
      })
  }
  useEffect(() => {
    getMessage()
  }, [message])
  return (
    <>
      <div class="sticky">
        <div class="view">
          <div class="inview">
            <div class="close1">
              <img
                class="cursor"
                src="http://localhost:3000/images/comment/close.svg"
                alt=""
                onClick={() => {
                  setBoom2(false)
                }}
              ></img>
            </div>
            <div class="titlegroup">
              <div class="titleleft">
                <div class="memberimg">
                  <img
                    src="http://localhost:3000/images/comment/Logo.png"
                    alt=""
                  ></img>
                </div>
                <div class="articletitle">
                  <h4>{boomArticle.title}</h4>
                  <span>－ {boomArticle.author}</span>
                </div>
              </div>
              <div class="outpoint">
                <div class="point">
                  推薦指數:
                  <img
                    src="http://localhost:3000/images/comment/star.svg"
                    alt=""
                  ></img>
                </div>
                <div class="time">{boomArticle.create_time}</div>
              </div>
            </div>
            <p class="articlep">{boomArticle.content}</p>
            <div class="time1">{boomArticle.create_time}</div>
            <div class="point1">
              推薦指數:
              <img
                src="http://localhost:3000/images/comment/star.svg"
                alt=""
              ></img>
            </div>
            <div class="articleimg">
              <img
                src="http://localhost:3000/images/comment/back.png"
                alt=""
              ></img>
            </div>
            <div class="sharegroup">
              <img
                class="cursor"
                src="http://localhost:3000/images/comment/share.svg"
                alt=""
              ></img>

              <img
                class="cursor"
                src="http://localhost:3000/images/comment/message.svg"
                alt=""
              ></img>
              <img
                class="cursor"
                src="http://localhost:3000/images/comment/heart.svg"
                alt=""
              ></img>
            </div>
          </div>
          <div class="peoplesay1">
            <div class="sayimg2">
              <img
                src="http://localhost:3000/images/comment/Logo.png"
                alt=""
              ></img>
            </div>
            <div class="whatusay">
              <input
                class="input"
                type="text"
                placeholder="寫下你的留言"
                value={insertMessage.message}
                onChange={(e) => {
                  setMessagefn(e)
                  
                }}
              ></input>
              <button
                class="send cursor"
                onClick={() => {
                  insertMessagefn()
                  getMessage()
                  cleanMessage()
                }}
              ></button>
            </div>
          </div>
          {message.length > 0 &&
            message.map((v, i) => {
              return (
                <div class="peoplesay">
                  <div class="sayimg">
                    <img
                      src="http://localhost:3000/images/comment/Logo.png"
                      alt=""
                    ></img>
                  </div>
                  <div class="whatusay1">
                    <div class="rwdsay">
                      <div class="sayimg1">
                        <img
                          src="http://localhost:3000/images/comment/Logo.png"
                          alt=""
                        ></img>
                      </div>
                      <div class="time">
                        <h4>{v.name}</h4>
                        <span>{v.create_time}</span>
                      </div>
                    </div>
                    <p>{v.message}</p>
                  </div>
                </div>
              )
            })}

          <div class="keep">
            <img
              src="http://localhost:3000/images/comment/draw.svg"
              alt=""
              class="cursor"
            ></img>
          </div>
        </div>
      </div>
    </>
  )
}
export default View
