import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderBig from './HeaderBig'
import HeaderSmall from './HeaderSmall/'
function Header(props) {
  const [cartList, setCartList] = useState([])
  const [loading, setLoading] = useState(false)
  let { item } = props

  //
  useEffect(() => {
    if (loading === true) {
      if (item.length > 0) {
        console.log('item in header:', item)
        localStorage.setItem('cart', JSON.stringify(item))
        setCartList(JSON.parse(localStorage.getItem('cart')))
      }
    }
  }, [item])

  // 得到localstorage內的資料，於didMount
  useEffect(() => {
    setLoading(true)
    if (Boolean(localStorage.getItem('cart'))) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      setCartList(cart)
    }
  }, [])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return (
    <>
      <header>
        {isTabletOrMobile ? (
          <HeaderSmall cartList={cartList} />
        ) : (
          <HeaderBig cartList={cartList} />
        )}
      </header>
    </>
  )
}
export default Header
