import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
function MobileSinger(props) {
  const [lastWidth, setLastWidth] = useState(0)
  // 往前
  useEffect(() => {
    function slide() {
      // 移動距離為0減去現計總數*歌手資訊寬
      let slideMove = (0 - sliderIndex) * sliderWidth
      $('.mobile-singer').css('transform', `translateX(${slideMove}px)`)
    }
    // 取得歌手div寬度
    let sliderWidth = $('.mobile-singer').width()
    // 計數預設為0
    let sliderIndex = 0
    // 取得所有歌手合計div
    let sliderCount = $('.mobile-singer').length

    $(next.current).on('click', function () {
      sliderIndex++
      // 若計數累積值等於總數，則將計數重製為0
      if (sliderIndex >= sliderCount) {
        sliderIndex = 0
      }
      slide()
    })
    $(last.current).on('click', function () {
      sliderIndex--
      if (sliderIndex < 0) {
        sliderIndex = sliderCount - 1
      }
      slide()
    })
  }, [])
  // 往後
  useEffect(() => {}, [])

  let next = useRef()
  let last = useRef()
  let slideSide = useRef()
  let { name, introduction, img } = props

  return (
    <>
      <button className="mobile-last change" ref={last}>
        <i class="fas fa-chevron-left"></i>
      </button>
      <button className="mobile-next change" ref={next}>
        <i class="fas fa-chevron-right"></i>
      </button>
      <div className="mobile-singer">
        <div className="mobile-singer-innerborder">
          <figure className="mobile-singer-figure">
            <img src={'http://localhost:3000/images/common/' + img} alt="" />
          </figure>
          <div className="mobile-singer-info">
            <h4 className="name h3">{name}</h4>
            <h4 className="info">{introduction}</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileSinger
