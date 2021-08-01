import React, { useState, useRef, useEffect } from 'react'
import $ from 'jquery'
function MobileVoteCandidate(props) {
  let candidate = useRef()

  useEffect(() => {
    // 投票Jquery提示使用者
    $(candidate.current).on('click', function () {
      $(candidate.current).addClass('active')
      $(candidate.current)
        .closest('.target')
        .siblings()
        .find('.mobile-vote-li')
        .removeClass('active')

      console.log(counts)
      // 設定欲傳回父元件之投票id
      setCandidateId(id)
      setCandidateName(name)
    })
  }, [])

  let path = 'http://localhost:3000/images/home/歌手/'
  const { name, counts, picture, setCandidateId, setCandidateName, id } = props
  let content = (
    <div className="target">
      <li className="mobile-vote-li" ref={candidate}>
        <div className="mobile-vote-li-candidate">
          <figure className="candidates-border">
            <img src={path + picture} alt="" />
          </figure>
          <h4>{name}</h4>
        </div>
        <h4 className="mobile-vote-li-counts">{counts}票</h4>
      </li>
    </div>
  )
  return <>{content}</>
}
export default MobileVoteCandidate
