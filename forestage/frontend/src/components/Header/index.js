import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderBig from './HeaderBig'
import HeaderSmall from './HeaderSmall/'

function Header(props) {
  const [item, setItem] = useState([])

  let { cart } = props

  useEffect(() => {
    // 一筆一筆抓取
    if (cart.length !== 0) {
      let itemClone = [...item]
      itemClone.push(cart)
      setItem(itemClone)
    }
    // 整理為購物車所需格式
  }, [cart])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return (
    <>
      <header>
        {isTabletOrMobile ? <HeaderSmall /> : <HeaderBig item={item} />}
      </header>
    </>
  )
}
export default Header
