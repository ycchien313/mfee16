import React, { useEffect, useState } from 'react'
import $ from 'jquery'

function Test() {
  // 設定狀態
  const [data, setdata] = useState()

  useEffect(() => {
    $.ajax({
      url: 'http://localhost:3001/delivery/dish',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        console.log(result)
        // 抓
        setdata(result[0].name)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1>{data}</h1>
    </>
  )
}

export default Test
