import React, { useEffect, useState } from 'react'
import '../../styles/delivery/foodDelivery/order.scss'
import '../../styles/delivery/foodDelivery/banner.scss'
import Delivery from '../../components/Delivery/FoodDelivery/components/Delivery'
import Header from '../../components/Header'
import $ from 'jquery'

function Del() {
  const [authToken, setAuthToken] = useState()
  const [memberId, setMemberId] = useState(0)
  // const [memberId, setMemberId] = useState(1)

  //
  useEffect(() => {
    // memberId get
    // console.log('辨識')
    let token = localStorage.getItem('authToken')
    // console.log(token)
    setAuthToken(token)

    $.ajax({
      url: 'http://localhost:3001/auth/me',
      method: 'GET',
      dataType: 'JSON',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    }).then(function (result) {
      // console.log(result)
      setMemberId(result.memberId)
    })
  }, [])

  return (
    <>
      <Header />
      <Delivery memberId={memberId} authToken={authToken} />
    </>
  )
}

export default Del
