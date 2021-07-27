import React, { useEffect } from 'react'
import '../../../styles/delivery/deliveryOrder/takeout_check.scss'
import DeliveryOrder from './components/DeliveryOrder'
import Header from '../../../components/Header'

function Index(props) {
  // console.log(props.location.state, 'props')
  return (
    <>
      <Header />
      <DeliveryOrder />
    </>
  )
}

export default Index
