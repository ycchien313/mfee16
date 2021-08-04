import React, { useState, useEffect } from 'react'
import '../../styles/comment/create.scss'
// import Draft from './create/draft'
// import Draft2 from './draft2'
import $ from 'jquery'
import axios from 'axios'

// import Test from './test'
function Create(props) {
  const {
    boom,
    setBoom,
    tag,
    selectTag,
    setSelectTag,
    getTagName,
    article,
    setArticle,
    asideTag,
    alreadyinsert,
    setAlreadyinsert,
    // articleTag
  } = props
  // const [content, setContent] = useState('123')
  // const [star, setStar] = useState(0)
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

  // function alignModal() {
  //   var createeditor = $(this).find('.createeditor')
  //   createeditor.css(
  //     'margin-top',
  //     Math.max(0, ($(window).height() - createeditor.height()) / 2)
  //   )
  // }
  // // $('.modal').on('shown.bs.modal', alignModal)
  // /* Resizing the modal according the screen size */

  function insertArticlefn() {
    // e.preventDefault()
    // let form = new FormData(e.target)
    // console.log(e.target)
    // console.log(form)
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3001/comment/createarticle',
      data: {
        insertArticle: insertArticle,
        // form: form,
      },
    }).then(() => {
      getAsideArticle()
      //   console.log('bbbbb')
    })
  }
  function setArticleTag(tagId) {
    let newArticle = { ...insertArticle }
    newArticle.tag_id = tagId
    setInsertArticle(newArticle)
  }
  function setImage(e) {
    let newArticle = { ...insertArticle }
    // console.log(e)
    let imageFile = e.target.files.item(0)
    let imageUrl = URL.createObjectURL(imageFile)
    newArticle.image = imageUrl
    setInsertArticle(newArticle)
  }
  function setTitle(e) {
    let newArticle = { ...insertArticle }
    newArticle.title = e.target.value
    setInsertArticle(newArticle)
  }
  function setAuthor(e) {
    let newArticle = { ...insertArticle }
    newArticle.author = e.target.value
    setInsertArticle(newArticle)
  }

  function setRecommendation_index(star) {
    let newArticle = { ...insertArticle }
    newArticle.recommendation_index = star
    setInsertArticle(newArticle)
  }
  function getContent(e) {
    let newArticle = { ...insertArticle }
    newArticle.content = e.target.value
    setInsertArticle(newArticle)
  }
  useEffect(() => {
    $('.fa-star').on('click', function () {
      $(this).addClass('active')
      $(this).prevAll().addClass('active')
      $(this).nextAll().removeClass('active')
    })
    $('.click').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active')
      $(this).closest('.tag').find('.bb').addClass('active')
      $(this).closest('.tag').siblings().find('.bb').removeClass('active')
      $(this)
        .closest('.tag')
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
    // $('.inputimg').on('change', function () {
    //   $(this)
    //     .siblings()
    //     .find('.imggg')
    //     .attr('src', {insertArticle.image})
    // })
  }, [])

  // useEffect(() => {
  //   // console.log('boom')
  //   // console.log('aaaaaa')
  //   getAsideArticle()
  //   // return () => {
  //   //   // setBoom(false)
  //   //   // getAsideArticle()
  //   // }
  // }, [asideTag])
  function getAsideArticle() {
    console.log(insertArticle.tag_id, '122222')
    axios
      .get(`http://127.0.0.1:3001/comment/${insertArticle.tag_id}`)
      .then((result) => {
        setArticle(result.data)
        //   console.log(result.data)
      })
  }
  // console.log(boom)
  // console.log(selectTag)
  // 點擊標籤要active沒成功
  // useEffect(() => {
  //   $('.click').on(
  //     'click',
  //     function () {
  //       $(this).addClass('active')
  //     },
  //     []
  //   )
  // })
  return (
    <>
      <div class="createeditor">
        <img
          class="close"
          src="http://localhost:3000/images/comment/close.svg"
          alt=""
          onClick={() => {
            setBoom(false)
          }}
        ></img>
        <div class="ineditor">
          <h4>文章標題：</h4>
          <input
            placeholder="請輸入您的文章標題"
            class="titleee"
            type="text"
            value={insertArticle.title}
            onChange={(e) => {
              setTitle(e)
            }}
          ></input>
          <h4>匿名名稱：</h4>
          <input
            placeholder="請輸入您的匿名名稱"
            class="titleee"
            type="text"
            value={insertArticle.author}
            onChange={(e) => {
              setAuthor(e)
            }}
          ></input>
          <div>
            <h4>選擇標籤：</h4>
            <select
              class="tagselect"
              name=""
              id=""
              value={selectTag}
              onChange={(e) => {
                setSelectTag(e.target.value)
                setArticleTag(e.target.value)
                getTagName()
              }}
            >
              {tag.length > 0 &&
                tag.map((v, i) => {
                  return <option value={v.tag_id}>{v.name}</option>
                })}
            </select>
            <div class="tagnone">
              <div class="tag">
                <div class="bb point">爵士</div>
                <ul class="aa">
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[3].tag_id)
                          getTagName()
                          setArticleTag(tag[3].tag_id)
                          console.log(selectTag)
                        }}
                      >
                        {tag[3].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[4].tag_id)
                          getTagName()
                          setArticleTag(tag[4].tag_id)
                          console.log(selectTag)
                        }}
                      >
                        {tag[4].name}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div class="tag">
                <div class="bb point">搖滾</div>
                <ul class="aa">
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[1].tag_id)
                          setArticleTag(tag[1].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[1].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[2].tag_id)
                          setArticleTag(tag[2].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[2].name}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div class="tag">
                <div class="bb">抒情</div>
                <ul class="aa">
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[5].tag_id)
                          setArticleTag(tag[5].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[5].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[6].tag_id)
                          setArticleTag(tag[6].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[6].name}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div class="tag">
                <div class="bb point">主餐</div>
                <ul class="aa">
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[13].tag_id)
                          setArticleTag(tag[13].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[13].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[14].tag_id)
                          setArticleTag(tag[14].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[14].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[15].tag_id)
                          setArticleTag(tag[15].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[15].name}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div class="tag">
                <div class="bb point">附餐</div>
                <ul class="aa">
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[10].tag_id)
                          setArticleTag(tag[10].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[10].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[11].tag_id)
                          setArticleTag(tag[11].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[11].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[12].tag_id)
                          setArticleTag(tag[12].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[12].name}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div class="tag">
                <div class="bb point">甜點</div>
                <ul class="aa">
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[7].tag_id)
                          setArticleTag(tag[7].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[7].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[8].tag_id)
                          setArticleTag(tag[8].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[8].name}
                      </span>
                    )}
                  </li>
                  <li class="click point">
                    {tag.length > 0 && (
                      <span
                        onClick={() => {
                          setSelectTag(tag[9].tag_id)
                          setArticleTag(tag[9].tag_id)
                          getTagName()
                        }}
                      >
                        {tag[9].name}
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="rwdpointh4">
            <h4 class="">推薦指數：</h4>
            {/* <Test
            star={}
          /> */}
            <div class="starss" id="stars">
              <i
                id="star1"
                class="fas fa-star"
                onClick={() => {
                  setRecommendation_index(1)
                }}
              ></i>
              <i
                id="star2"
                class="fas fa-star"
                onClick={() => {
                  setRecommendation_index(2)
                }}
              ></i>
              <i
                id="star3"
                class="fas fa-star"
                onClick={() => {
                  setRecommendation_index(3)
                }}
              ></i>
              <i
                id="star4"
                class="fas fa-star"
                onClick={() => {
                  setRecommendation_index(4)
                }}
              ></i>
              <i
                id="star5"
                class="fas fa-star"
                onClick={() => {
                  setRecommendation_index(5)
                }}
              ></i>
            </div>
          </div>
          <h4>文章內容：</h4>
          <textarea
            class="draft"
            value={insertArticle.content}
            onChange={(e) => {
              getContent(e)
            }}
          ></textarea>
          <h4>上傳圖片：</h4>
          <form
            id="imgform"
            onSubmit={insertArticlefn}
            encType="multipart/form-data"
            action="/contact/save"
          >
            <input
              name="image"
              class="titleee inputimg"
              type="file"
              // value={insertArticle.image}
              onChange={(e) => {
                setImage(e)
              }}
            ></input>
            <div class="firstimg">
              {/* <img class="imggg" src="http://fakeimg.pl/800x350/b2d297/a1957d/?text=Elfin"></img> */}
              <img src={insertArticle.image}></img>
            </div>
            {/* <button type="submit">123</button> */}
            <div class="buttongroup">
              <button class="green-guide-button buttontext2">
                預覽
                <img
                  src="http://localhost:3000/images/comment/view.svg"
                  alt=""
                ></img>
              </button>
              <button
                type="submit"
                // form="imgfrom"
                class="orange-guide-button buttontext"
                onClick={() => {
                  insertArticlefn()
                  setBoom(false)
                  setAlreadyinsert(true)
                }}
              >
                送出
                <img
                  src="http://localhost:3000/images/comment/send2.svg"
                  alt=""
                ></img>
              </button>
            </div>
          </form>
          {/* <div class="firstimg">
            <img src={insertArticle.image}></img>
          </div> */}
        </div>
        {/* <div class="buttongroup">
          <button class="green-guide-button buttontext2">
            預覽
            <img
              src="http://localhost:3000/images/comment/view.svg"
              alt=""
            ></img>
          </button>
          <button
            type="submit"
            // form="imgfrom"
            class="orange-guide-button buttontext"
          >
            送出
            <img
              src="http://localhost:3000/images/comment/send2.svg"
              alt=""
              onClick={() => {
                insertArticlefn()
                setBoom(false)
                setAlreadyinsert(true)
              }}
            ></img>
          </button>
        </div> */}
      </div>
    </>
  )
}
export default Create
