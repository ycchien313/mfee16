import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

function Aside() {
  function controlSvgColor() {
    document.querySelectorAll('.nav-icon').forEach((item, index) => {
      // 取得 <img> id, class, src
      const img = item
      const imgId = img.id
      const imgClass = img.className
      const imgUrl = img.getAttribute('src')

      // 透過 fetch 取得 svg 原始碼
      fetch(imgUrl, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'text/xml',
        }),
      })
        .then((response) => response.text())
        .then((response) => {
          // svg 原始碼，但為字串，非 DOM 元素
          let svgStr = response

          // 創建 <span>，以利將 svgStr 轉成 DOM
          const span = document.createElement('span')
          span.innerHTML = svgStr

          // 取得 <span> 內的 svg DOM 元素
          const inlineSvg = span.getElementsByTagName('svg')[0]

          // 將原本的 id 設定至新的 svg 元素
          if (typeof imgId !== undefined) {
            inlineSvg.setAttribute('id', imgId)
          }
          // 將原本的 class name 加上 ' replaced-img' 設定至新的 svg 元素
          if (typeof imgClass !== undefined) {
            inlineSvg.setAttribute('class', imgClass + ' replaced-svg')
          }

          // 刪除 svg 的 xmlns 連結
          inlineSvg.removeAttribute('xmlns')

          // 檢查是否有設定 viewport
          // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
          if (
            !inlineSvg.getAttribute('viewBox') &&
            inlineSvg.getAttribute('height') &&
            inlineSvg.getAttribute('width')
          ) {
            inlineSvg.setAttribute(
              'viewBox',
              '0 0 ' +
                inlineSvg.getAttribute('height') +
                ' ' +
                inlineSvg.getAttribute('width')
            )
          }

          // 將新的 svg 取代原本的 img
          img.parentNode.replaceChild(inlineSvg, img)

          // console.log(inlineSvg)
        })
    })
  }

  useEffect(() => {
    controlSvgColor()
  }, [])

  return (
    <>
      <aside className="left-side">
        <nav className="nav">
          <div className="nav-container">
            <div className="nav-row">
              <Link to="/member/profile" className="nav-link active">
                {/* <a href={''} className="active"> */}
                <img
                  className="nav-icon"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/main-aside-icon.svg'
                  }
                  alt=""
                />
                <div className="nav-title-box">
                  <h4 className="nav-title">會員資料</h4>
                </div>
                {/* </a> */}
              </Link>
            </div>
            <div className="nav-row">
              <Link to="/member/profile" className="nav-link">
                {/* <a href={''}> */}
                <img
                  className="nav-icon"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/main-aside-icon.svg'
                  }
                  alt=""
                />
                <div className="nav-title-box">
                  <h4 className="nav-title">我的訂位</h4>
                </div>
                {/* </a> */}
              </Link>
            </div>
            <div className="nav-row">
              <Link to="/member/profile" className="nav-link">
                {/* <a href={''}> */}
                <img
                  className="nav-icon"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/main-aside-icon.svg'
                  }
                  alt=""
                />
                <div className="nav-title-box">
                  <h4 className="nav-title">外送訂單</h4>
                </div>
                {/* </a> */}
              </Link>
            </div>
            <div className="nav-row">
              <Link to="/member/profile" className="nav-link">
                {/* <a href={''}> */}
                <img
                  className="nav-icon"
                  src={
                    process.env.PUBLIC_URL +
                    '/images/member/main-aside-icon.svg'
                  }
                  alt=""
                />
                <div className="nav-title-box">
                  <h4 className="nav-title">折價券</h4>
                </div>
                {/* </a> */}
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* <!-- 手機版導覽列--> */}
      <nav className="nav-md">
        <ul className="container-md">
          <li>
            <Link to={''} className="nav-link">
              <h4 className="active">會員資料</h4>
            </Link>
          </li>
          <li>
            <Link to={''} className="nav-link">
              <h4>我的訂位</h4>
            </Link>
          </li>
          <li>
            <Link to={''} className="nav-link">
              <h4>外送訂單</h4>
            </Link>
          </li>
          <li>
            <Link to={''} className="nav-link">
              <h4>折價券</h4>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Aside)
