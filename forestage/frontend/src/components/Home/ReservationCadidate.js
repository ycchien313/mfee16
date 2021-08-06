import React, { useEffect, useRef } from 'react'
import $ from 'jquery'
function ReservationCandidate(props) {
  let { name, date, setSelect, getDate } = props
  let candidate = useRef()
  useEffect(() => {
    $(candidate.current).on('click', function () {
      $(this).find('figure').addClass('active')
      $(this).closest('.target').siblings().find('figure').removeClass('active')
      $(this).closest('ul').siblings().find('figure').removeClass('active')
    })
  }, [])

  let dateClone = [...date]
  let result = dateClone.slice(5).join('').replace(/-/g, '/')
  let content = (
    <div className="target">
      <li
        className="reservation-li"
        onClick={() => {
          setSelect({ singer: name, date: date })
          getDate(date)
        }}
        ref={candidate}
      >
        <div className="reservation-candidate">
          <h4 className="h4">{result.length > 0 && result}</h4>
          <figure>
            <img
              src={`http://localhost:3000/images/common/${name}.jpg`}
              alt=""
            />
          </figure>
        </div>
      </li>
    </div>
  )
  return <>{content}</>
}

export default ReservationCandidate
