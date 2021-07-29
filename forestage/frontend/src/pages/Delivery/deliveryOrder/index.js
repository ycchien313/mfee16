import React, { useState } from 'react'
import '../../../styles/delivery/deliveryOrder/takeout_check.scss'
import DeliveryOrder from './components/DeliveryOrder'
import Header from '../../../components/Header'

function Index(props) {
  // no.1
  const [memberId, setMemberId] = useState(1)

  return (
    <>
      <Header />
      <DeliveryOrder orderAll={props.location.state} memberId={memberId} />
    </>
  )
}

export default Index
