import React, { useState, useEffect } from 'react'
// import View from './view'
import axios from 'axios'

function MapArticle(props) {
  //   const [likesIn, setLikesIn] = useState(true)
  const [likes, setLikes] = useState(true)
  const [likeCount, setLikeCount] = useState(0)
  const {
    article1,
    article,
    setArticle,
    // likes,
    normallike,
    likeClass,
    // setLikes,
    // setArticleLikesId,
    // getLikes,
    boom2,
    setBoom2,
    setBoomArticle,
    boomArticle,
    // addLikes,
    // minusLikes,
  } = props
  //   const [articleLikesId, setArticleLikesId] = useState(article1.likes)

  function addLikes(articleId) {
    axios({
      method: 'put',
      url: 'http://127.0.0.1:3001/comment/articleGood',
      data: {
        article_id: articleId,
      },
    }).then(() => {})
    setLikeCount(likeCount + 1)
  }
  function minusLikes(articleId) {
    axios({
      method: 'put',
      url: 'http://127.0.0.1:3001/comment/articleNotGood',
      data: {
        article_id: articleId,
      },
    }).then(() => {})
    setLikeCount(likeCount - 1)
  }

  // console.log(likeCount)

  useEffect(() => {
    setLikeCount(article1.likes)
  }, [])
  return (
    <>
      <div
        class="commentbox"
        onClick={() => {
          setBoom2(!boom2)
          setBoomArticle(article1)
        }}
      >
        <figrue class="articleimgsize">
          <img
            class="commentimg"
            src="http://localhost:3000/images/comment/back.png"
            alt=""
          ></img>
        </figrue>
        <div class="article">
          <h4>{article1.title}</h4>
          <span>{article1.author}</span>
          <p>{article1.content}</p>
        </div>
        <div class="star">
        <div class="starsize">

          <div class="star-ratings-sprite">
            <span
              class="star-ratings-sprite-rating"
              style={{
                width: `${(article1.recommendation_index / 5) * 100}%`,
              }}
            ></span>
          </div>
        </div>

          <div class="share">
            <img
              src="http://localhost:3000/images/comment/share.svg"
              alt=""
            ></img>
            <img
              src="http://localhost:3000/images/comment/message.svg"
              alt=""
            ></img>
            {/* <div>{message.length}</div> */}
            <i
              className={likes ? normallike : likeClass}
              src="http://localhost:3000/images/comment/heart.svg"
              alt=""
              onClick={(e) => {
                e.stopPropagation()
                // setArticleLikesId(article1.article_id)
                setLikes(!likes)
                // getLikes(article1.article_id)
                likes
                  ? addLikes(article1.article_id)
                  : minusLikes(article1.article_id)
                // addLikes(v.article_id)
              }}
            ></i>
            {/* <div class="likesnum">{likeCount!==undefined?likeCount:article1.likes}</div> */}
            <div class="likesnum">{likeCount}</div>
          </div>
        </div>
      </div>
      
    </>
  )
}
export default MapArticle
