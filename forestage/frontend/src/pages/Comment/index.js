import React from 'react'
import '../../styles/comment/Comment.scss'
import Hero from '../../components/Comment/Hero'
import Comment from '../../components/Comment/Comment'
import Header from '../../components/Header'
// import Footer from '../../components/Footer'

function Commentarea() {
  return (
    <>
    
      <Header />
      <div className="allComment">
      <Hero />
      <Comment />
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Commentarea