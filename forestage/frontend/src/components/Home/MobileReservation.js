import React, { useEffect, useRef } from 'react'
import $ from 'jquery'
function MobileReservation(props) {
  useEffect(() => {
    $(mobileCandidate.current).on('click', function () {
      $(this).addClass('active')
      $(mobileCandidate.current)
        .closest('.mobile-vote-target')
        .siblings()
        .find('.mobile-candidate')
        .removeClass('active')
    })
  }, [])
  let mobileCandidate = useRef()
  let { name, date, setSelect, getDate } = props

  let content = (
    <div className="mobile-vote-target">
      <li>
        <div
          className="mobile-candidate"
          ref={mobileCandidate}
          onClick={() => {
            setSelect({ singer: name, date: date })
            getDate(date)
          }}
        >
          <figure>
            <img
              src={`http://localhost:3000/images/home/歌手/${name}.jpg`}
              alt=""
            />
          </figure>
          <h4 className="candidate-name">{name}</h4>
          <h4 className="candidate-date">{date}</h4>
        </div>
      </li>
    </div>
  )
  return <>{content}</>
}

export default MobileReservation
