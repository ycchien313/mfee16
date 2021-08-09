import React, { useState, useEffect } from 'react'
import '../../styles/comment/create.scss'
// import Draft from './create/draft'
// import Draft2 from './draft2'
import $ from 'jquery'
import axios from 'axios'
import Createview from './createView'
// import Test from './test'
function Create(props) {
  const [imageName, setImageName] = useState('')
  const {
    boom,
    setBoom,
    boom2,
    setBoom2,
    tag,
    selectTag,
    setSelectTag,
    getTagName,
    article,
    setArticle,
    asideTag,
    alreadyinsert,
    setAlreadyinsert,
    insertArticle,
    setInsertArticle,
    // articleTag
  } = props
  const [boom3, setBoom3] = useState(false)
  // const [content, setContent] = useState('123')
  // const [star, setStar] = useState(0)
  // const [insertArticle, setInsertArticle] = useState({
  //   title: '',
  //   author: '',
  //   content: '',
  //   image: '',
  //   recommendation_index: 0,
  //   likes: 0,
  //   member_id: 0,
  //   tag_id: 0,
  // })

  // function alignModal() {
  //   var createeditor = $(this).find('.createeditor')
  //   createeditor.css(
  //     'margin-top',
  //     Math.max(0, ($(window).height() - createeditor.height()) / 2)
  //   )
  // }
  // // $('.modal').on('shown.bs.modal', alignModal)
  // /* Resizing the modal according the screen size */
  //上傳圖片

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0]
    const reader = new FileReader()

    reader.onload = function () {
      // reader.results当完成onload后会将图片转为base64
      // 后端只要解析base64对应的字符串即可
      const result = this.result
      console.log(result)
      setImage(result)
    }

    reader.readAsDataURL(file) // 得到经过base64编码的图片信息
    console.log(file)
  }

  //圖片結束

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
  function setImage(imageUrl) {
    let newArticle = { ...insertArticle }
    // console.log(e)
    // let imageFile = e.target.files.item(0)
    // let imageUrl = URL.createObjectURL(imageFile)
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
    $('#imageupdate').on('change', function () {
      $(this).closest('form').find('.selectimg').removeClass('selectimg')
      $(this).closest('form').find('.unselectimg').addClass('selectimg')
    })

    // $('.titleee').on('change',function(){
    //   console.log($(this))
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
      <div class="createjsscss">
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
              maxlength="50"
              value={insertArticle.title}
              onChange={(e) => {
                setTitle(e)
              }}
            ></input>
            <div>字數限制{insertArticle.title.length}/50</div>
            <h4>匿名名稱：</h4>
            <input
              placeholder="請輸入您的匿名名稱"
              class="titleee"
              type="text"
              maxlength="30"
              value={insertArticle.author}
              onChange={(e) => {
                setAuthor(e)
              }}
            ></input>
            <div>字數限制{insertArticle.author.length}/30</div>

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
            <div>字數限制{insertArticle.content.length}/1000</div>

            <h4>上傳圖片：</h4>

            <form
              id="imgform"
              onSubmit={insertArticlefn}
              encType="multipart/form-data"
              action="/contact/save"
            >
              <label class="imagelabel">
                <p>請選擇檔案</p>
                <p></p>
                <input
                  id="imageupdate"
                  name="image"
                  class="titleee"
                  type="file"
                  // value={insertArticle.image}
                  onChange={handleFileChange}
                ></input>
              </label>
              <div class="firstimg">
                {/* <img class="imggg" src="http://fakeimg.pl/800x350/b2d297/a1957d/?text=Elfin"></img> */}
                <img
                  class="unselectimg"
                  src="http://fakeimg.pl/440x300/CCC/fded82/?text=Elfin"
                  alt="這裡將顯示您圖片"
                ></img>
                <img
                  class="selectimg"
                  src={insertArticle.image}
                  alt="這裡將顯示您圖片"
                ></img>
              </div>
              <div>{insertArticle.image.length}</div>
            </form>

            {/* <button type="submit">123</button> */}
            <div class="buttongroup">
              <button
                class="green-guide-button buttontext2"
                onClick={() => {
                  // setBoom(false)
                  setBoom3(true)
                }}
              >
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
                  setAlreadyinsert(true)

                  setBoom(false)
                }}
              >
                送出
                <img
                  src="http://localhost:3000/images/comment/send2.svg"
                  alt=""
                ></img>
              </button>
            </div>
            {/* </form> */}
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
      </div>
      {boom3 && (
        <Createview
          id="vieww"
          // className="vieww"
          boom3={boom3}
          setBoom3={setBoom3}
          article={article}
          setArticle={setArticle}
          // boomArticle={boomArticle}
          // setBoomArticle={setBoomArticle}

          setInsertArticle={setInsertArticle}
          insertArticle={insertArticle}
          // setArticleLikesId={setArticleLikesId}
          // likes={likes}
          // setLikes={setLikes}
          // getLikes={getLikes}
          // addLikes={addLikes}
          // minusLikes={minusLikes}
        />
      )}
    </>
  )
}
export default Create
