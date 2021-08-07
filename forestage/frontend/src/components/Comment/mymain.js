import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'
import Myview from './myview'
import Create from './create'
import Myarticle from './myArticle'
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
  const [messageNum, setMessageNum] = useState(0)
  const MySwal = withReactContent(Swal)
  const [boomArticle, setBoomArticle] = useState({})
  const [aside, setAside] = useState(true)
  const [aside1, setAside1] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
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
        console.log(result.data, 'ID')
      })
  }
  let iflogin = Boolean(localStorage.getItem('authToken'))
  function getMycomment() {
    // console.log(insertArticle.member_id, '我在getMycomment裡面')
    let authToken = localStorage.getItem('authToken')
    // console.log(authToken)
    console.log(insertArticle.member_id, 'insert,mem_id')
    axios
      .get('http://localhost:3001/comment/mycomment/16', {
        params: {
          member_id: insertArticle.member_id,
        },
      })
      .then((result) => {
        // getMemberId()
        setArticle(result.data)
        // console.log(result.data)
      })
  }

  useEffect(() => {
    //   getTagArticle()
    getMycomment()
  }, [insertArticle])

  function getTagArticle() {
    console.log(insertArticle.member_id, 'test')

    axios
      .get(`http://localhost:3001/comment/mycomment/${selectTag}`, {
        params: {
          member_id: insertArticle.member_id,
        },
      })
      .then((result) => {
        setArticle(result.data)
        console.log(result, '點了之後相關文章')
      })
  }

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

    // getTagArticle()
  }, [aside, aside1])

  useEffect(() => {
    // getNews()
    $('.click').on('click', function () {
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
      $(this).closest('ul').siblings().find('li').removeClass('active')
      $(this).closest('.asidefind').siblings().find('li').removeClass('active')
    })
    $('.clean').on('click', function () {
      $(this).siblings().find('li').removeClass('active')
    })

    // getMycomment()
    // setSelectTag(16)
    getMemberId()
    // getTagArticle()
    // getLikes(articleLikesId)
    setDidmount(true)
  }, [])
  let selectURL = ''

  useEffect(() => {
      selectURL = `http://localhost:3001/comment/mycomment/${selectTag}`
    if (didmount) {
      getTagName()
      getTagArticle()
    }
    // console.log(url)
    // getAsideArticle()
    // let url = ``
    // console.log(tag)
    // tag.forEach((v) => {
    //   console.log(selectTag)
    //   if (v.name === selectTag) {
    //     console.log(v.tag_id)
    //     url = `http://localhost:3001/comment/mycomment/${v.tag_id}`
    //     console.log(url)
    //     setTagId(v.tag_id)
    //   }
    // })
  }, [selectTag])
//   useEffect(()=>{
//     getAsideArticle()
//   },[asideTag])
  useEffect(() => {
    getTagArticle()
  }, [boom])


  function getAsideArticle() {
    axios.get(selectURL).then((result) => {
      console.log(selectURL)
      console.log(result.data)
      setArticle(result.data)
      console.log(result.data)
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
                  //   getTagName()
                  setAsideTag('所有文章')
                  getMycomment()
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
                      getTagArticle()
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
                      getTagArticle()
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
                      getTagArticle()
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
            <div class="mynews"></div>
            {/* 討論區 開始 */}
            <div class="my commentstar">
              {/* 連結aside點擊的tag */}
              {tag !== [] && <h2>我的評論-{asideTag}</h2>}
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
                <Myarticle
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
        <Myview
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
      {showAuth && <Auth />}
    </>
  )
}
export default Main
