import React, { useState, useEffect } from 'react'
import '../../../styles/delivery/deliveryOrder/takeout_check.scss'
import DeliveryOrder from './components/DeliveryOrder'
import Header from '../../../components/Header'

function Index(props) {
  // no.1
  const [memberId, setMemberId] = useState(1)
  const [orderAll, setOrderAll] = useState({
    address: {},
    counts: [],
    fulltime: '',
    img: [],
    name: [],
    subTotal: [],
  })

  console.log(props.location.state, 'locstate')
  useEffect(() => {
    // console.log(props)
    let newObj = {}
    newObj.address = props.location.state.address
    newObj.counts = props.location.state.counts
    newObj.fulltime = props.location.state.fulltime
    newObj.img = props.location.state.img
    newObj.name = props.location.state.name
    newObj.subTotal = props.location.state.subTotal
    setOrderAll(newObj)
  }, [])

  return (
    <>
      <Header />
      {/* <DeliveryOrder orderAll={props.location.state} memberId={memberId} /> */}
      <DeliveryOrder orderAll={orderAll} memberId={memberId} />
    </>
  )
}

export default Index
