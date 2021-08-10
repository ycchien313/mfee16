import React, { useEffect, useState, useLayoutEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import '../../../../styles/member/aside.scss'

function Aside(props) {
  const { pagename, contentIsLoaded, setContentIsLoaded } = props
  const [asideHeight, setAsideHeight] = useState('')
  const linkData = [
    { href: '/member/profile', title: '會員資料' },
    { href: '/member/reservation', title: '我的訂位' },
    { href: '/member/delivery', title: '外送訂單' },
    { href: '/member/coupon', title: '折價券' },
  ]

  // 計算 Aside 高度
  const calcAsideHeight = () => {
    // 瀏覽器高度
    const browserH = document.body.offsetHeight
    const bannerH = document.querySelector('.banner').clientHeight
    const asideH = browserH - bannerH

    setAsideHeight(asideH)

    window.removeEventListener('resize', calcAsideHeight)
  }

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

  useLayoutEffect(() => {
    controlSvgColor()
  }, [])

  useLayoutEffect(() => {
    //畫面 render 後設定高度
    calcAsideHeight()

    //設定瀏覽器改變大小後的高度
    window.addEventListener('resize', calcAsideHeight)

    setContentIsLoaded(false)
  }, [asideHeight, contentIsLoaded])

  useLayoutEffect(() => {
    return () => {
      window.removeEventListener('resize', calcAsideHeight)
    }
  }, [asideHeight, contentIsLoaded])

  return (
    <>
      <div className="aside">
        <aside className="left-side" style={{ height: asideHeight }}>
          {/* <!-- 電腦版導覽列--> */}
          <nav className="nav">
            <div className="nav-container">
              {linkData.map((v, i) => {
                return (
                  <div key={i} className="nav-row">
                    <Link
                      smooth
                      to={`${v.href}#`}
                      className={
                        pagename === v.title
                          ? 'nav-content active'
                          : 'nav-content'
                      }
                    >
                      <img
                        className="nav-icon"
                        src={
                          process.env.PUBLIC_URL +
                          '/images/member/main-aside-icon.svg'
                        }
                        alt=""
                      />
                      <div className="nav-title-box">
                        <h4 className="nav-title">{v.title}</h4>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* <!-- 手機版導覽列--> */}
        <nav className="nav-md">
          <ul className="container-md">
            {linkData.map((v, i) => {
              return (
                <li key={i}>
                  <Link smooth to={`${v.href}#`} className="nav-content">
                    <h4 {...(pagename === v.title && { className: 'active' })}>
                      {v.title}
                    </h4>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default withRouter(Aside)
