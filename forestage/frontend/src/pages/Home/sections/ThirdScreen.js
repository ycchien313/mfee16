import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import CommentCard from './Components/CommentCard'
function ThirdScreen(props) {
  // 取得評論區資訊之狀態設定
  const [comment, setComment] = useState([])
  const [targetId, setTargetId] = useState(10)

  // 取得歌手詳情之狀態設定
  const [singerId, setSingerId] = useState(1)
  const [singerName, setSingerName] = useState()
  const [singerInfo, setSingerInfo] = useState()
  const [singerImg, setSingerImg] = useState()
  // 取得歌手詳情
  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/home/singer/${singerId}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      console.log(result)
      setSingerName(result.name)
      setSingerInfo(result.introduction)
      setSingerImg(result.picture)
    })
  }, [singerId])

  // 取得評論區顯示所需資料
  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/home/comment/${targetId}`,
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      setComment(result)
    })
  }, [targetId])

  //主要頁面
  let ThirdScreen = (
    <div id="thirdScreen">
      <div className="green-bg-right">
        <img src="./image/green-background-right.svg" alt="" />
      </div>
      <a className="liveIcon" href="#">
        <img src="./image/liveIcon.svg" alt="" className="liveIconImg" />
        <div className="iconAside">
          <h3 className="h3">直播中</h3>
          <img src="./image/iconPlay.png" alt="" className="iconPlay" />
        </div>
      </a>
      <h2 className="h2">駐唱歌手</h2>
      <div className="singerInfo">
        <figure className="singerPageFigure">
          <img src={singerImg} alt="" />
        </figure>
        <div className="singerPageInfo">
          <div className="info">
            <h3>{singerName}</h3>
            <p>{singerInfo}</p>
            <button className="button-orange">
              <h4 className="btn-innerText">看更多</h4>
              <i className="fas fa-arrow-circle-right"></i>
            </button>
          </div>
          <div className="singerSelect">
            <ul>
              <li>
                <div
                  className="selectBlock" //楊丞琳
                  onClick={() => {
                    setTargetId(10)
                    setSingerId(5)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //李榮浩
                  onClick={() => {
                    setTargetId(11)
                    setSingerId(3)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //劉德華
                  onClick={() => {
                    setTargetId(12)
                    setSingerId(4)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //聯合公園
                  onClick={() => {
                    setTargetId(13)
                    setSingerId(6)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //蕭敬騰
                  onClick={() => {
                    setTargetId(14)
                    setSingerId(2)
                  }}
                ></div>
              </li>
              <li>
                <div
                  className="selectBlock" //Maroon 5
                  onClick={() => {
                    setTargetId(15)
                    setSingerId(1)
                  }}
                ></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="audienceComment">
        <h2 className="h2">客戶好評</h2>
        <div className="commentSide">
          <ul className="card-ul">
            {comment.map(function (v, i) {
              return (
                <CommentCard
                  key={v.article_id}
                  name={v.name}
                  singer={v.singer}
                  title={v.title}
                  nickname={v.nickname}
                  img={v.img}
                />
              )
            })}
          </ul>
        </div>
        <button className="button-orange seeMore">
          <h4 className="btn-innerText">撰寫評論</h4>
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  )
  // console.log(comment)
  return <>{ThirdScreen}</>
}

export default ThirdScreen
