import React from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderBig from './HeaderBig'
import HeaderSmall from './HeaderSmall/'

function Header() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return (
    <>
      <header>{isTabletOrMobile ? <HeaderSmall /> : <HeaderBig />}</header>
    </>
  )
}
export default Header
