import React, { useEffect, useState, useRef } from 'react'
import $ from 'jquery'
function VoteCandidates(props) {
  const { name, counts, picture, setCandidateId, setCandidateName, id } = props
  let candidate = useRef()
  let path = 'http://localhost:3000/images/common/'
  useEffect(() => {
    $(candidate.current).on('click', function () {
      // // console.log(counts)
      // 設定欲傳回父元件之投票id
      setCandidateId(id)
      setCandidateName(name)
      // 投票Jquery提示使用者
      $(candidate.current).find('.candidates-border').addClass('active')
      $(candidate.current)
        .closest('.target')
        .siblings()
        .find('.candidates-border')
        .removeClass('active')
    })
  }, [])
  let fullPath = path + picture
  let content = (
    <div className="target">
      <li>
        <div className="candidates" ref={candidate}>
          <figure className="candidates-border">
            <img src={fullPath} alt="" />
          </figure>
          <div className="candidate-textgroup">
            <h4 className="h4 name">{name}</h4>
            <h4 className="h4 number">{counts}票</h4>
          </div>
        </div>
      </li>
    </div>
  )

  return <>{content}</>
}
export default VoteCandidates
