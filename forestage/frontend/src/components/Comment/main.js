import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import View from './view'
import Create from './create'
import Article from './article'
import Footer from '../Footer/index'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Auth from '../Auth/'
import { func } from 'prop-types'
function Main(props) {
  const { tag } = props
  const [news, setNews] = useState({})
  const [selectTag, setSelectTag] = useState(0)
  const [article, setArticle] = useState([])
  const [tagId, setTagId] = useState(0)
  const [boom, setBoom] = useState(false)
  const [boom2, setBoom2] = useState(false)
  const [asideTag, setAsideTag] = useState('所有文章')
  const [didmount, setDidmount] = useState(false)
  // const [likes, setLikes] = useState(true)
  // const [articleLikesId, setArticleLikesId] = useState(0)
  const [messageNum, setMessageNum] = useState(0)
  const MySwal = withReactContent(Swal)
  const [boomArticle, setBoomArticle] = useState({})
  const [aside, setAside] = useState(true)
  const [aside1, setAside1] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [insertArticle, setInsertArticle] = useState({
    title: '',
    author: '',
    content: '',
    image: '',
    recommendation_index: 0,
    likes: 0,
    member_id: 0,
    tag_id: 0,
  })
  const [alreadyinsert, setAlreadyinsert] = useState(false)
  let likeClass = 'fas like fa-heart'
  let normallike = 'fas fa-heart'
  let asideClose = 'asideul'
  let asideOpen = 'asideulopen'

  function getMemberId() {
    let authToken = localStorage.getItem('authToken')
    axios
      .get('http://localhost:3001/auth/me', {
        method: 'get',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        let newArticle = { ...insertArticle }
        newArticle.member_id = result.data.memberId
        setInsertArticle(newArticle)
        console.log(result.data)
      })
  }
  let iflogin = Boolean(localStorage.getItem('authToken'))
  // function getBoomArticle() {
  //   axios.get(`http://127.0.0.1:3001/comment/${boomArticle}`).then((result) => {
  //     setBoomArticle(result.data)
  //     console.log(result.data)
  //   })
  // }
  // useEffect(() => {
  //   getBoomArticle()
  // }, [])
  // function addLikes(articleId) {
  //   // axios.put('http://127.0.0.1:3001/comment/articleGood').then((result) => {
  //   //   setLikes(result.data)
  //   // })
  //   axios({
  //     method: 'put',
  //     url: 'http://127.0.0.1:3001/comment/articleGood',
  //     data: {
  //       article_id: articleId,
  //     },
  //   })
  // }
  // function minusLikes(articleId) {
  //   // axios.put('http://127.0.0.1:3001/comment/articleGood').then((result) => {
  //   //   setLikes(result.data)
  //   // })
  //   axios({
  //     method: 'put',
  //     url: 'http://127.0.0.1:3001/comment/articleNotGood',
  //     data: {
  //       article_id: articleId,
  //     },
  //   })
  // }
  function getNews() {
    axios.get('http://127.0.0.1:3001/comment/news').then((result) => {
      setNews(result.data)
    })
  }

  // function setDivCenter() {

  //   var top = ($(window).height() - $('#vieww').height()) / 2
  //   // var left = ($(window).width() - $('.vieww').width()) / 2
  //   var scrollTop = $(document).scrollTop()
  //   // var scrollLeft = $(document).scrollLeft()
  //   // $('.vieww')
  //   //   .css({
  //   //     position: 'absolute',
  //   //     top: top + scrollTop,
  //   //     // left: left + scrollLeft,
  //   //   })
  //     // .show()
  //     let vieww=document.getElementById('vieww')
  //     // vieww.style.top=top+scrollTop+'px'
  //   console.log(vieww)
  // }
  // useEffect(() => {
  // window.onload()=function(){

  //     setDivCenter()
  //   }
  //   // var vieww = $(this).find('.vieww')
  // }, [boom])
  useEffect(() => {
    //asides伸縮
    if (aside == true) {
      $('.down1').on('click', function () {
        $(this).attr('src', 'http://localhost:3000/images/comment/up.svg')
      })
    }
    if (aside1 == true) {
      $('.down2').on('click', function () {
        $(this).attr('src', 'http://localhost:3000/images/comment/up.svg')
      })
    }
    if (aside !== true) {
      $('.down1').on('click', function () {
        $(this).attr('src', 'http://localhost:3000/images/comment/down.svg')
      })
    }
    if (aside1 !== true) {
      $('.down2').on('click', function () {
        $(this).attr('src', 'http://localhost:3000/images/comment/down.svg')
      })
    }
  }, [aside, aside1])

  useEffect(() => {
    getNews()
    $('.click').on('click', function () {
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
      $(this).closest('ul').siblings().find('li').removeClass('active')
      $(this).closest('.asidefind').siblings().find('li').removeClass('active')
    })
    $('.clean').on('click', function () {
      $(this).siblings().find('li').removeClass('active')
    })

    setSelectTag(16)
    getMemberId()
    // getLikes(articleLikesId)
  }, [])
  useEffect(() => {
    let url = ``
    setDidmount(true)
    // console.log(tag)
    tag.forEach((v) => {
      // console.log(selectTag)
      if (v.name === selectTag) {
        console.log(v.tag_id)
        url = `http://localhost:3001/comment/${v.tag_id}`
        console.log(url)
        setTagId(v.tag_id)
      }
    })
    getTagArticle()
  }, [selectTag])

  useEffect(() => {
    if (didmount) {
      getTagName()
    }
  }, [selectTag])
  function getTagArticle() {
    let url = `http://localhost:3001/comment/${selectTag}`
    console.log(selectTag)
    axios.get(url).then((result) => {
      setArticle(result.data)
      // console.log(result.data)
    })
  }
  useEffect(() => {
    getTagArticle()
    // console.log("123")
    // window.addEventListener
    // getAsideArticle()
  }, [boom])
  useEffect(() => {
    if (didmount) {
      MySwal.fire({
        icon: 'success',
        title: '感謝您的評論',
        html: '<h5>請至會員專區查看您的優惠券</h5>',
        buttonsStyling: false,
        didOpen: () => {
          setAlreadyinsert(false)
        },
      })
    }
  }, [alreadyinsert])
  // //取得按讚數
  // function getLikes(articleId) {
  //   axios
  //     .get('http://127.0.0.1:3001/comment/articlelikes', {
  //       params: {
  //         article_id: articleId,
  //       },
  //     })
  //     .then(function (result) {
  //       if (article.length > 0) {
  //         let newarticle = [...article]
  //         let index = newarticle.findIndex((v) => {
  //           return v.article_id === articleId
  //         })
  //         console.log(index, '123')
  //         console.log(result.data, '321')
  //         newarticle[index].likes = result.data[0].likes
  //         setArticle(newarticle)
  //       }
  //       // setArticleLikes(result.data)
  //       // console.log(result)
  //     })
  // }
  // useEffect(() => {
  //   getLikes(articleLikesId)
  // }, [likes, articleLikesId])
  //顯示留言數量
  // console.log(article.article_id)
  // function getMessageNum() {
  //   axios
  //     .get(`http://127.0.0.1:3001/comment/message`)
  //     .then((result) => {
  //       // setMessageNum(result.data.length)
  //       console.log(result.data)
  //     })
  // }
  // useEffect(() => {
  //   getMessageNum()
  // }, [])
  //   aside顯示相關文章
  let selectURL = ''
  useEffect(() => {
    // console.log(tag)
    // console.log(selectTag)
    selectURL = `http://localhost:3001/comment/${selectTag}`
    // console.log(url)
    getAsideArticle()
  }, [selectTag])
  function getAsideArticle() {
    axios.get(selectURL).then((result) => {
      setArticle(result.data)
      //   console.log(result.data)
    })
  }
  function getTagName() {
    if (selectTag !== 16) {
      let foundTag = tag.find((v) => {
        return v.tag_id === selectTag
      })
      if (foundTag) {
        setAsideTag(foundTag.name)
        console.log(foundTag.name)
      }
    }
  }
  //   const [tag, setTag] = useState({})
  //   function getTag() {
  //     axios.get('http://127.0.0.1:3001/comment/tag').then((result) => {
  //       setTag(result.data)
  //     })
  //   }
  // useEffect(() => {
  //   getTag()
  // }, [selectTag])
  return (
    <>
      <div class="outaside">
        <aside class="aside">
          <div class="asidesing clean">
            <img
              src="http://localhost:3000/images/comment/All.svg"
              alt=""
              class="imgseat"
            ></img>
            {tag.length > 0 && (
              <div
                class="singa"
                onClick={() => {
                  setSelectTag(tag[0].tag_id)
                  getTagName()
                  setAsideTag('所有文章')
                  // getAll()
                  // setArticle(all)
                  // console.log(all)
                }}
              >
                {tag[0].name}
              </div>
            )}
            <br></br>
            <img
              class="line"
              src="http://localhost:3000/images/comment/line.svg"
              alt=""
            ></img>
          </div>
          <div class="asidesing asidefind">
            <img
              class="imgseat"
              src="http://localhost:3000/images/comment/singer.svg"
              alt=""
            ></img>
            <div
              class="singa a"
              //   ref={ulRef}
            >
              歌手評論
              <img
                class="down1"
                id=""
                src="http://localhost:3000/images/comment/down.svg"
                alt=""
                onClick={() => {
                  setAside(!aside)
                }}
                //   ref={downRef}
              ></img>
            </div>
            <img
              class="line"
              src="http://localhost:3000/images/comment/line.svg"
              alt=""
            ></img>
            <ul className={aside ? asideClose : asideOpen} class="asideul">
              爵士
              <img
                class="line1"
                src="http://localhost:3000/images/comment/line.svg"
                alt=""
              ></img>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[3].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[3].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[4].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[4].name}
                  </div>
                )}
              </li>
            </ul>
            <ul className={aside ? asideClose : asideOpen} class="asideul">
              搖滾
              <img
                class="line1"
                src="http://localhost:3000/images/comment/line.svg"
                alt=""
              ></img>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[1].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[1].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[2].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[2].name}
                  </div>
                )}
              </li>
            </ul>
            <ul className={aside ? asideClose : asideOpen} class="asideul">
              抒情
              <img
                class="line1"
                src="http://localhost:3000/images/comment/line.svg"
                alt=""
              ></img>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[5].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[5].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[6].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[6].name}
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div class="asideeat asidefind">
            <img
              src="http://localhost:3000/images/comment/pizza.svg"
              alt=""
              class="imgseat"
            ></img>
            <div class="singa b">
              餐點評論
              <img
                class="down2"
                id=""
                src="http://localhost:3000/images/comment/down.svg"
                alt=""
                onClick={() => {
                  setAside1(!aside1)
                }}
              ></img>
            </div>
            <img
              class="line"
              src="http://localhost:3000/images/comment/line.svg"
              alt=""
            ></img>
            <ul className={aside1 ? asideClose : asideOpen} class="asideul">
              主餐
              <img
                class="line1"
                src="http://localhost:3000/images/comment/line.svg"
                alt=""
              ></img>
              <li class="pizza click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[13].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[13].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[14].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[14].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[15].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[15].name}
                  </div>
                )}
              </li>
            </ul>
            <ul className={aside1 ? asideClose : asideOpen} class="asideul">
              附餐
              <img
                class="line1"
                src="http://localhost:3000/images/comment/line.svg"
                alt=""
              ></img>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[10].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[10].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[11].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[11].name}
                  </div>
                )}
              </li>
              <li class="chicken click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[12].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[12].name}
                  </div>
                )}
              </li>
            </ul>
            <ul className={aside1 ? asideClose : asideOpen} class="asideul">
              甜點
              <img
                class="line1"
                src="http://localhost:3000/images/comment/line.svg"
                alt=""
              ></img>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[7].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[7].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[8].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[8].name}
                  </div>
                )}
              </li>
              <li class="click">
                {tag.length > 0 && (
                  <div
                    onClick={() => {
                      setSelectTag(tag[9].tag_id)
                      getTagName()
                    }}
                  >
                    {tag[9].name}
                  </div>
                )}
              </li>
              <br></br>
            </ul>
          </div>
        </aside>
      </div>
      <div class="boom">
        <div class="newsdiv">
          <main>
            <div>
              {/* 討論區 最新消息 開始 */}
              <h2>最新消息</h2>
              <div class="news">
                <div class="innews">
                  <img
                    class="innewsimg1"
                    src="http://localhost:3000/images/comment/DragonBoatFestival.svg"
                    alt=""
                  ></img>
                  <div class="editor">
                    {news.length > 0 && <h4>{news[0].title}</h4>}
                    {/* <h4>{news.title}</h4> */}
                    {news.length > 0 && <p>{news[0].article}</p>}
                  </div>
                  <div class="innewsimg2">
                    <img
                      class=""
                      src="http://localhost:3000/images/comment/Editor.svg"
                      alt=""
                    ></img>
                    <p class="innewsp">精靈小編</p>
                  </div>
                </div>
              </div>
              <button
                class="guide-button pink-guide-button write"
                onClick={() => {
                  iflogin ? setBoom(!boom) : setShowAuthModal(true)
                }}
              >
                寫評論
                <img
                  src="http://localhost:3000/images/comment/writecomment.svg"
                  alt=""
                ></img>
              </button>
            </div>
            {/* <討論區 最新消息 結束 */}
            {/* 討論區 開始 */}
            <div class="commentstar">
              {/* 連結aside點擊的tag */}
              {tag !== [] && <h2>{asideTag}</h2>}
              {/* 用map */}
              <select
                name=""
                id=""
                value={selectTag}
                onChange={(e) => {
                  setSelectTag(e.target.value)
                  getTagName()
                }}
              >
                {tag.length > 0 &&
                  tag.map((v, i) => {
                    return <option value={v.tag_id}>{v.name}</option>
                  })}
              </select>
              <div class="morebox">
                <Article
                  article={article}
                  setArticle={setArticle}
                  // likes={likes}
                  normallike={normallike}
                  likeClass={likeClass}
                  // setLikes={setLikes}
                  // setArticleLikesId={setArticleLikesId}
                  // getLikes={getLikes}
                  boom2={boom2}
                  setBoom2={setBoom2}
                  setBoomArticle={setBoomArticle}
                  boomArticle={boomArticle}
                  // addLikes={addLikes}
                  // minusLikes={minusLikes}
                />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
      {boom && (
        <Create
          asideTag={asideTag}
          boom={boom}
          setBoom={setBoom}
          tag={tag}
          selectTag={selectTag}
          setSelectTag={setSelectTag}
          getTagName={getTagName}
          article={article}
          setArticle={setArticle}
          alreadyinsert={alreadyinsert}
          setAlreadyinsert={setAlreadyinsert}
          insertArticle={insertArticle}
          setInsertArticle={setInsertArticle}
        />
      )}
      {boom2 && (
        <View
          id="vieww"
          // className="vieww"
          boom2={boom2}
          setBoom2={setBoom2}
          article={article}
          setArticle={setArticle}
          boomArticle={boomArticle}
          setBoomArticle={setBoomArticle}
          // setArticleLikesId={setArticleLikesId}
          // likes={likes}
          // setLikes={setLikes}
          // getLikes={getLikes}
          // addLikes={addLikes}
          // minusLikes={minusLikes}
        />
      )}
      <i
        class="fas fa-arrow-circle-up"
        onClick={() => {
          window.scrollTo(0, 500)
        }}
      ></i>
      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
    </>
  )
}
export default Main
