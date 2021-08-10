/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

function Card(props) {
  let { name, singer, img, title } = props
  return (
    <>
      <li className="card-li">
        <div className="comment-text">
          <div className="user-com">
            <div className="user">
              <img className="userhead" src={`http://localhost:3001${img}`} />
              <p>{name}</p>
            </div>
            <div className="com-singer">
              <div className="hr-line"></div>
              <p>{singer}</p>
            </div>
            <div className="star">
              <div className="empty_star">★★★★★</div>
              <div className="full_star">★★★★★</div>
            </div>
            <div className="com-text">
              <div className="h5 com-content">{title}</div>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
export default Card
