import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderBig from './HeaderBig'
import HeaderSmall from './HeaderSmall/'

function Header(props) {
  let { item } = props

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
