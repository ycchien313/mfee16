import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import HeaderBig from './HeaderBig'
import HeaderSmall from './HeaderSmall/'

function Header(props) {
  let { cartName, cartPrice, cartCount, cartImg, all } = props
  // useEffect(() => {
  //   if (all !== {} && item === []) {
  //     console.log(all, item)
  //     let itemClone = [...item]
  //     itemClone.push(all)
  //     console.log('up')
  //     setItem(itemClone)
  //   }
  //   if (item !== []) {
  //     item.forEach(function (value) {
  //       if (value.name === all.name) {
  //         value.count++
  //       } else {
  //         let itemClone = [...item]
  //         itemClone.push(all)
  //         console.log('down')
  //         setItem(itemClone)
  //       }
  //     })
  //   }
  // }, [all])

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  return (
    <>
      <header>
        {isTabletOrMobile ? (
          <HeaderSmall />
        ) : (
          <HeaderBig
            cartName={cartName}
            cartPrice={cartPrice}
            cartCount={cartCount}
            cartImg={cartImg}
          />
        )}
      </header>
    </>
  )
}
export default Header
