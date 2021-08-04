import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/comment/Comment.scss'
// import Jquery from 'jquery'
// import Aside from './aside'
import Main from './main'

function Comment() {
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
      <Main tag={tag} />
      
    </>
  )
}
export default Comment
