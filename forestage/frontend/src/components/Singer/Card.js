import React from 'react'

function Card(props) {
  return (
    <>
      <li className="card-li">
        <div className="comment-text">
          <div className="user-com">
            <div className="user">
              <img
                className="userhead"
                src="http://localhost:3000/images/singer/Group 885.png"
              />
              <p>黃湘婷</p>
            </div>
            <div className="com-singer">
              <div className="hr-line"></div>
              <p>蕭敬騰</p>
            </div>
            <div className="star">
              <div className="empty_star">★★★★★</div>
              <div className="full_star">★★★★★</div>
            </div>
            <div className="com-text">
              <p className="com-content">
                拿破崙相信，世上只有兩種力量：利劍和思想。從長而論，利劍總是敗在思想手下。這段話雖短，卻足以改變人類的歷史。說到楊丞琳，你會想到什麼呢？而這些並不是完全重要，更加重要的問題是，泰戈爾在不經意間這樣說過，生活並不是一條人工開鑿的運河，不能把河水媽限制在一些規定好了的河道內。這激勵了我。回過神才發現，思考楊丞琳的存在意義，已讓我廢寢忘食。需要考慮周詳楊丞琳的影響及因應對策。領悟其中的道理也不是那麼的困難。當你搞懂後就會明白了。培根講過一段耐人尋思的話，狡猾是一種陰險邪惡的聰明。這不禁令我重新仔細的思考。
              </p>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
export default Card
