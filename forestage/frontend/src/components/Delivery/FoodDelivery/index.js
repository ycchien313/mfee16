import React from 'react'
import '../../styles/delivery/foodDelivery/order.scss'
import '../../styles/delivery/foodDelivery/banner.scss'
import Delivery from './FoodDelivery/components/Delivery'
import Header from '../../components/Header/'


function index(props) {
  return (
    <>
      <Header />
      <Delivery />
    </>
  )
}

export default index
