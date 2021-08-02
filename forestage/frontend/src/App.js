import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import AuthContext from './components/Auth/AuthContext'
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

  const setContextMember = async () => {
    const token = localStorage.getItem('authToken')

    try {
      const response = await axios.get('http://localhost:3001/auth/me', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${token}`,
        },
      })
      const data = response.data
      const member = { memberId: data.memberId }

      setMember(member)
    } catch (err) {
      localStorage.removeItem('authToken')
      // console.log('設定 localStorage 失敗: ', err)
    }
  }

  useEffect(() => {
    localStorage.getItem('authToken') && setContextMember()
  }, [])

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
          <Route path="/home">
            <Home />
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
