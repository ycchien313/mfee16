import axios from 'axios'
import { now } from 'jquery'
import React, { useEffect, useState } from 'react'
import '../../styles/comment/view.scss'

function Createview(props) {
  const [memberavatar, setMemberAvatar] = useState('')

  const {
    boom3,
    setBoom3,
    article,
    setArticle,
    boomArticle,
    setBoomArticle,
    setArticleLikesId,
    insertArticle,
  } = props

  function getMemberId() {
    let authToken = localStorage.getItem('authToken')
    axios
      .get('http://localhost:3001/auth/me', {
        method: 'get',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        axios
          .get(
            `http://localhost:3001/comment/memberavatar/${result.data.memberId}`
          )
          .then((result) => {
            // setMessageNum(result.data.length)
            console.log(result.data)
            setMemberAvatar(result.data[0].avatar)
            // setMemberId(result.data)
          })
      })
  }
  useEffect(() => {
    getMemberId()
    console.log(insertArticle)
  }, [])

  return (
    <>
      <div class="commentvieeew">
        <div class="sticky">
          <div class="view">
            <div class="inview">
              <div class="close1">
                <img
                  class="cursor"
                  src="http://localhost:3000/images/comment/close.svg"
                  alt=""
                  onClick={() => {
                    setBoom3(false)
                  }}
                ></img>
              </div>
              <div class="titlegroup">
                <div class="titleleft">
                  <div class="memberimg">
                    <img
                      src={`http://localhost:3001${memberavatar}`}
                      alt=""
                    ></img>
                  </div>
                  <div class="articletitle">
                    <h4>{insertArticle.title}</h4>
                    <span>－ {insertArticle.author}</span>
                  </div>
                </div>
                <div class="outpoint">
                  <div class="point">
                    推薦指數:
                    <div class="star-ratings-sprite">
                      <span
                        class="star-ratings-sprite-rating"
                        style={{
                          width: `${
                            (insertArticle.recommendation_index / 5) * 100
                          }%`,
                        }}
                      ></span>
                    </div>
                  </div>
                  {/* <div class="time0">{Date.now()}</div> */}
                </div>
              </div>
              <p class="articlep">{insertArticle.content}</p>
              {/* <div class="time1">{Date.now()}</div> */}
              <div class="point1">
                推薦指數:
                <div class="star-ratings-sprite">
                  <span
                    class="star-ratings-sprite-rating"
                    style={{
                      width: `${
                        (insertArticle.recommendation_index / 5) * 100
                      }%`,
                    }}
                  ></span>
                </div>
              </div>
              <div class="articleimg">
                <img src={insertArticle.image} alt=""></img>
              </div>
              <div class="sharegroup">
                <img
                  class="cursor nonedis"
                  src="http://localhost:3000/images/comment/share.svg"
                  alt=""
                ></img>

                <img
                  class="cursor"
                  src="http://localhost:3000/images/comment/message.svg"
                  alt=""
                ></img>

                <i
                  class="fas fa-heart size cursor"
                  src="http://localhost:3000/images/comment/heart.svg"
                  alt=""
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Createview
