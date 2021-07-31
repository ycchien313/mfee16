import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useState } from 'react'
import AuthContext from './components/Auth/AuthContext'
// import Auth from './pages/Auth'
import Comment from './pages/Comment'
import Delivery from './pages/Delivery'
import DeliveryOrder from '../src/components/Delivery/deliveryOrder'
import Dish from './pages/Dish'
import Game from './pages/Game'
import Home from './pages/Home'
import Member from './pages/Member'
import Reservation from './pages/Reservation'

function App() {
  const [member, setMember] = useState(null)

  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <Router>
        <Switch>
          <Route path="/comment/">
            <Comment />
          </Route>
          <Route path="/delivery/deliveryOrder/" component={DeliveryOrder}>
            {/* <DeliveryOrder /> */}
          </Route>
          <Route path="/delivery/">
            <Delivery />
          </Route>
          <Route path="/dish/">
            <Dish />
          </Route>
          <Route path="/game/">
            <Game />
          </Route>
          <Route path="/member/">
            <Member />
          </Route>
          <Route path="/reservation/">
            <Reservation />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
