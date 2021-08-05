import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/comment/Comment.scss'
// import Jquery from 'jquery'
// import Aside from './aside'
import Mymain from './mymain'

function Mycomment() {
  const [tag, setTag] = useState([])
  function getTag() {
    axios.get('http://127.0.0.1:3001/comment/tag').then((result) => {
      setTag(result.data)
    })
  }
  useEffect(() => {
    getTag()
  }, [])

  return (
    <>
      {/* <Aside tag={tag} /> */}
      <Mymain tag={tag} />
      
    </>
  )
}
export default Mycomment
