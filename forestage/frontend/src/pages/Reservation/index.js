import React, { useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
// import Header from '../../components/Header'
import ReservationPage from '../../../src/components/Reservation/ReservationPage'
import CheckoutPage from '../../../src/components/Reservation/CheckoutPage'

function Reservation(props) {


  const url = props.match.url
  return (
    <>
      <Switch>
        <Route path={`${url}/checkout`} component={CheckoutPage}></Route>
        <Route path={`${url}`} component={ReservationPage}></Route>
      </Switch>
    </>
  )
}

export default withRouter(Reservation)
