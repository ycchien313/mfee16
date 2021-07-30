import React, { useState, useEffect, Component } from 'react'
import '../../styles/comment/create.scss'
import Draft from './create/draft'
import $ from 'jquery'
import axios from 'axios'
function Create(props) {
  const { boom, setBoom, tag, selectTag, setSelectTag, getTagName } = props
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
  function insertArticlefn() {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3001/comment/createarticle',
      data: {
        insertArticle: insertArticle,
      },
    })
  }
  function setArticleTag(tagId) {
    let newArticle = { ...insertArticle }
    newArticle.tag_id = tagId
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
  function setContent(e) {
    let newArticle = { ...insertArticle }
    newArticle.content = e.target.value
    setInsertArticle(newArticle)
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
            class="title"
            type="text"
            value={insertArticle.title}
            onChange={(e) => {
              setTitle(e)
            }}
          ></input>
          <h4>匿名名稱：</h4>
          <input
            class="title"
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
                <div class="bb click">爵士</div>
                <ul class="aa click">
                  <li class="click">
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
                  <li class="click">
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
                <div class="bb">搖滾</div>
                <ul class="aa">
                  <li class="click">
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
                  <li class="click">
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
                  <li class="click">
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
                  <li class="click">
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
                <div class="bb">主餐</div>
                <ul class="aa">
                  <li class="click">
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
                  <li class="click">
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
                  <li class="click">
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
                <div class="bb">附餐</div>
                <ul class="aa">
                  <li class="click">
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
                  <li class="click">
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
                  <li class="click">
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
                <div class="bb">甜點</div>
                <ul class="aa">
                  <li class="click">
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
                  <li class="click">
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
                  <li class="click">
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

          <h4 class="point">
            推薦指數：
            <img
              src="http://localhost:3000/images/comment/star.svg"
              alt=""
            ></img>
          </h4>
          <h4>文章內容：</h4>
        </div>

        {/* 所見及所得 */}
        <div class="draft">
          <Draft
            value={insertArticle.content}
            onChange={(e) => {
              setContent(e)
            }}
            // insertArticle={insertArticle}
            // setInsertArticle={setInsertArticle}
          />
        </div>

        {/* <所見及所得 結束 */}
        <div class="buttongroup">
          <button class="green-guide-button buttontext2">
            預覽
            <img
              src="http://localhost:3000/images/comment/view.svg"
              alt=""
            ></img>
          </button>
          <button
            class="orange-guide-button buttontext"
            onClick={insertArticlefn()}
          >
            送出
            <img
              src="http://localhost:3000/images/comment/send2.svg"
              alt=""
            ></img>
          </button>
        </div>
      </div>
    </>
  )
}
export default Create
