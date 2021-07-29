import React, { useEffect, useState, useRef } from 'react'
import VoteCandidates from '../../../components/Home/VoteCandidates'
import $ from 'jquery'
import Swal from 'sweetalert2'
//

function FourthScreen(props) {
  const [loading, setLoading] = useState(false)

  // 判斷是否投過票
  const [voteState, setVoteState] = useState(false)
  // 透過子元件得到候選人
  const [candidateId, setCandidateId] = useState([])
  const [candidateName, setCandidateName] = useState()
  useEffect(() => {
    setLoading(true)
  }, [])
  // 請求歌手與票數
  const [counts, setCounts] = useState([])
  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/home/vote_count',
      method: 'GET',
      dataType: 'json',
    }).then(function (result) {
      // console.log(result)
      setCounts(result)
    })
  }, [])

  // 投票函式
  function UpdateCandidateCounts() {
    $.ajax({
      url: `http://localhost:3001/home/update_candidate/${candidateId}`,
      method: 'POST',
      dataType: 'json',
    })
  }
  // 即時同步投票結果
  function VoteCountUpdate() {
    let countsClone = [...counts]
    countsClone.forEach(function (value) {
      if (value.id === candidateId) {
        value.count++
      }
      console.log(countsClone)
      setCounts(countsClone)
    })
  }
  let fourthScreen = (
    <div id="fourthScreen">
      <div className="titleArea">
        <figure className="titleElfin">
          <img src="http://localhost:3000/images/home/elfin-green.png" alt="" />
        </figure>
        <h2 className="h2">誰來表演?</h2>
        <h3 className="h3">用你的一票決定下次的表演歌手</h3>
      </div>
      {/* Candidates */}
      <div className="voteArea">
        <div className="voteBG">
          <ul>
            {counts.map(function (value, index) {
              return (
                <VoteCandidates
                  key={value.id}
                  name={value.name}
                  counts={value.count}
                  picture={value.picture}
                  setCandidateId={setCandidateId}
                  setCandidateName={setCandidateName}
                  id={value.id}
                />
              )
            })}
          </ul>
        </div>
      </div>
      <div className="mobile-vote-area">
        <ul className="mobile-vote-ul">
          <li className="mobile-vote-li">
            <div className="mobile-vote-li-candidate">
              <figure>
                <img src="./image/歌手/林肯公園.jpg" alt="" />
              </figure>
              <h4>林肯公園</h4>
            </div>
            <h4 className="mobile-vote-li-counts">285票</h4>
          </li>
          <li className="mobile-vote-li">
            <div className="mobile-vote-li-candidate">
              <figure>
                <img src="./image/歌手/maroon5.jpg" alt="" />
              </figure>
              <h4>馬倫five</h4>
            </div>
            <h4 className="mobile-vote-li-counts">333票</h4>
          </li>
          <li className="mobile-vote-li">
            <div className="mobile-vote-li-candidate">
              <figure>
                <img src="./image/歌手/楊丞琳.jpg" alt="" />
              </figure>
              <h4>楊丞琳</h4>
            </div>
            <h4 className="mobile-vote-li-counts">288票</h4>
          </li>
          <li className="mobile-vote-li">
            <div className="mobile-vote-li-candidate">
              <figure>
                <img src="./image/歌手/蕭敬騰.jpg" alt="" />
              </figure>
              <h4>蕭敬騰</h4>
            </div>
            <h4 className="mobile-vote-li-counts">197票</h4>
          </li>
          <li className="mobile-vote-li">
            <div className="mobile-vote-li-candidate">
              <figure>
                <img src="./image/歌手/劉德華.jpg" alt="" />
              </figure>
              <h4>劉德華</h4>
            </div>
            <h4 className="mobile-vote-li-counts">300票</h4>
          </li>
        </ul>
      </div>
      {/*  */}
      {voteState === false ? (
        <button
          className="button-orange"
          onClick={() => {
            UpdateCandidateCounts()
            VoteCountUpdate()
            Swal.fire('投票成功', '即將更新票數', 'success')
            setVoteState(true)
          }}
        >
          <h4 className="btn-innerText">投票</h4>
          <i className="fas fa-vote-yea"></i>
        </button>
      ) : (
        <button className="button-orange disabled" disabled>
          <h4 className="btn-innerText">本週已投票</h4>
        </button>
      )}
    </div>
  )
  return <>{fourthScreen}</>
}

export default FourthScreen
