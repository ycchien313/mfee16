import React, { useState, useContext } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ReactDelay from 'react-delay'
import Profile from '../../components/Member/Profile/'
import Reservation from '../../components/Member/Reservation/'
import Delivery from '../../components/Member/Delivery/'
import Coupon from '../../components/Member/Coupon/'
import AuthContext from '../../components/Auth/AuthContext'
import Auth from '../../components/Auth'

function Member(props) {
  const { member } = useContext(AuthContext)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const url = props.match.url

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <ReactDelay wait={500}>
        {member !== null ? (
          <Switch>
            <Route path={`${url}/coupon`}>
              <Coupon pagename="折價券" />
            </Route>
            <Route path={`${url}/delivery`}>
              <Delivery pagename="外送訂單" />
            </Route>
            <Route path={`${url}/reservation`}>
              <Reservation pagename="我的訂位" />
            </Route>
            <Route path={`${url}/profile`}>
              <Profile pagename="會員資料" />
            </Route>
            <Route exact path={`${url}`}>
              <Profile pagename="會員資料" />
            </Route>
          </Switch>
        ) : (
          <Auth
            showAuthModal={showAuthModal}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </ReactDelay>
    </>
  )
}

export default withRouter(Member)
