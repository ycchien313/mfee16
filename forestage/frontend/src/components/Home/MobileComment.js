import React from 'react'

function MobileComment(props) {
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

  let path = 'http://localhost:3001'
  let fullPath = null
  if (img.includes('http')) {
    fullPath = img
  } else {
    fullPath = path + img
  }
  return (
    <>
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
    </>
  )
}

export default MobileComment
