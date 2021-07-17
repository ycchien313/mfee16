import React from 'react'

function CommentCard(props) {
  let { name, singer, title, nickname, img } = props
  let card = (
    <li className="card-li">
      <div className="commentCard">
        <div className="user">
          <div className="userImg">
            <img src={img} alt="" />
          </div>
          <p>{nickname}</p>
          <p className="alignSelfEnd">{singer}</p>
        </div>
        <hr />
        <div className="stars">
          <ul>
            <li>
              <img src="./image/star.png" alt="" />
            </li>
            <li>
              <img src="./image/star.png" alt="" />
            </li>
            <li>
              <img src="./image/star.png" alt="" />
            </li>
            <li>
              <img src="./image/star.png" alt="" />
            </li>
            <li>
              <img src="./image/star.png" alt="" />
            </li>
          </ul>
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
