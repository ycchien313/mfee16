import React, { useEffect, useState } from 'react'
import Map from './maparticle'
// import View from './view'
function Article(props) {
  const {
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
  return (
    <>
      {article.length > 0 &&
        article.map((v, i) => {
          return (
            <>
              <Map
                key={v.article_id}
                article1={v}
                avatar={v.avatar}
                article={article}
                setArticle={setArticle}
                normallike={normallike}
                likeClass={likeClass}
                // setArticleLikesId={setArticleLikesId}
                // getLikes={getLikes}
                boom2={boom2}
                setBoom2={setBoom2}
                setBoomArticle={setBoomArticle}
                boomArticle={boomArticle}
                // addLikes={addLikes}
                // minusLikes={minusLikes}
              />
            </>
          )
        })}
       
    </>
  )
}
export default Article
