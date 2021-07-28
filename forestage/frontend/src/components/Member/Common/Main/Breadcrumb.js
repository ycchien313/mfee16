import React from 'react'
import '../../../../styles/member/breadcrumb.scss'

function Breadcrumb(props) {
  const { pagename } = props

  return (
    <>
      <nav className="breadcrumb">
        <div className="breadcrumb-container">
          <ul className="breadcrumb-list">
            <li className="list-item h4">您的位置: 會員專區</li>
            <li className="list-item h4">{pagename}</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Breadcrumb
