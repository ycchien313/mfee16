import React from 'react'
import '../../styles/comment/Comment.scss'
import Hero from '../../components/Comment/Hero'
import Mycomment from '../../components/Comment/myComment'
import Header from '../../components/Header'
// import Footer from '../../components/Footer'

function Commentarea() {
  return (
    <>
      <Header />
      <div className="allComment">
        <Hero />
        <Mycomment />
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Commentarea
