import React from 'react'

function CommentCard(props) {
  let { name, singer, title, nickname, img, likes } = props
  // 星星數 = star * likes

  let star = (
    <li>
      <img src="http://localhost:3000/images/home/star.png" alt="" />
    </li>
  )
  let starArr = []
  for (let i = 0; i < likes; i++) {
    starArr.push(star)
  }

  let path = 'http://localhost:3000/images/home/user/'
  let fullPath = path + img

  //
  let card = (
    <li className="card-li">
      <div className="commentCard">
        <div className="user">
          <div className="userImg">
            <img src={fullPath} alt="" />
          </div>
          <p>{name}</p>
          <p className="alignSelfEnd">{singer}</p>
        </div>
        <hr />
        <div className="stars">
          <ul>{starArr}</ul>
        </div>
        <div className="comment">
          <p>{title}</p>
        </div>
      </div>
    </li>
  )
  return <>{card}</>
}

export default CommentCard
