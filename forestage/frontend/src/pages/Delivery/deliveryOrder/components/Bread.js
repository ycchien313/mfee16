import React from 'react'

function Bread(props) {
  const { name, price } = props

  return (
    <>
      <div className="bread-crumb">
        <a href="#/" className="prev span">
          外送訂餐
        </a>
        &nbsp; / &nbsp;
        <a href="#/" className="active span">
          確認訂單
        </a>
      </div>
    </>
  )
}

export default Bread.js
