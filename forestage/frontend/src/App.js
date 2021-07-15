import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import Auth from './pages/Auth'
import Comment from './pages/Comment'
import Delivery from './pages/Delivery'
import Dish from './pages/Dish'
import Game from './pages/Game'
import Home from './pages/Home'
import Member from './pages/Member'
import Reservation from './pages/Reservation'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth/">
          <Auth />
        </Route>
        <Route path="/comment/">
          <Comment />
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
  )
}

export default App
