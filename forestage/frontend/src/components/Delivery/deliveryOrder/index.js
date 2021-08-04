import React, { useState, useEffect } from 'react'
import '../../../styles/delivery/deliveryOrder/takeout_check.scss'
import DeliveryOrder from './components/DeliveryOrder'
import Header from '../../../components/Header'
import $ from 'jquery'

function Index(props) {
  // no.1
  const [authToken, setAuthToken] = useState()
  const [memberId, setMemberId] = useState(0)
  // const [memberId, setMemberId] = useState(1)
  // console.log(memberId)
  const [orderAll, setOrderAll] = useState({
    address: {},
    counts: [],
    fulltime: '',
    img: [],
    name: [],
    subTotal: [],
    dishList: [],
  })

  useEffect(() => {
    let token = localStorage.getItem('authToken')
    console.log('辨識:', token)
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
      console.log(result)
      setMemberId(result.memberId)
    })
  }, [])

  // console.log(props.location.state, 'locstate')
  useEffect(() => {
    // console.log(props)
    let newObj = {}
    newObj.address = props.location.state.address
    newObj.counts = props.location.state.counts
    newObj.fulltime = props.location.state.fulltime
    newObj.img = props.location.state.img
    newObj.name = props.location.state.name
    newObj.subTotal = props.location.state.subTotal
    newObj.dishList = props.location.state.dishList
    setOrderAll(newObj)
  }, [])

  return (
    <>
      <Header />
      <DeliveryOrder
        orderAll={orderAll}
        memberId={memberId}
        authToken={authToken}
      />
    </>
  )
}

export default Index
