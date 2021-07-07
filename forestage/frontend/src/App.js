import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import React from 'react'
// import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <Home /> */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
