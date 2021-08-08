import React, { useEffect, useState } from 'react'

import $ from 'jquery'
import { logDOM } from '@testing-library/react'
// import '../../styles/singer/singer.scss'
import axios from 'axios'

function DishInfo(props) {
  let { dishInfo, style, tag } = props
  let defaulDomain = 'http://localhost:3000/images/common/'
  const [loading, setLoading] = useState(false)
  const [likeArray, setLikeArray] = useState([])

  const getLike = async () => {
    const newLikeArray = []
    for (let i = 0; i < tag.length; i++) {
      const response = await axios.get(
        `http://localhost:3001/dish/likes/${tag[i]}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
        }
      )

      newLikeArray.push(response.data[0])
    }

    return newLikeArray
  }

  useEffect(() => {
    setLoading(true)
  }, [])
  useEffect(() => {
    if (loading === true) {
      const getData = async () => {
        const newLikeArray = await getLike()

        setLikeArray(newLikeArray)
      }
      getData()
    }
  }, [style, tag, loading])

  return (
    <>
      <div className="food-title h2">
        {dishInfo.length > 0 && dishInfo[1].type}
      </div>
      <div className="introduction-all">
        <div className="pizza food-m">
          <div className="introduction">
            <div className="imgb">
              <img
                className="img"
                src={
                  dishInfo.length > 0 &&
                  defaulDomain + dishInfo[1].image_realistic
                }
                alt=""
              />
            </div>
            <div className="introduction-text">
              <div className="introduction-title">
                <div className="h3">
                  {dishInfo.length > 0 && dishInfo[1].name}
                </div>
                <div className="assess h4">
                  <div className="star">
                    <div className="empty_star">★★★★★</div>
                    <div
                      className="full_star"
                      style={{
                        width: likeArray.length > 0 && `${likeArray[1].stars}%`,
                      }}
                    >
                      ★★★★★
                    </div>
                  </div>
                  <h4> ({likeArray.length > 0 && likeArray[1].reviewer})</h4>
                </div>
              </div>
              <div className="link-top"></div>
              <div className="price h4">
                ${dishInfo.length > 0 && dishInfo[1].price}元
              </div>
              <div className="introduction-content h5">
                {dishInfo.length > 0 && dishInfo[1].introduction}
              </div>
            </div>
          </div>
        </div>
        <div className="subway food-m">
          <div className="introduction">
            <div className="introduction-text">
              <div className="introduction-title">
                <div className="h3">
                  {dishInfo.length > 0 && dishInfo[0].name}
                </div>
                <div className="assess h4">
                  <div className="star">
                    <div className="empty_star">★★★★★</div>
                    <div
                      className="full_star"
                      style={{
                        width: likeArray.length > 0 && `${likeArray[0].stars}%`,
                      }}
                    >
                      ★★★★★
                    </div>
                  </div>
                  <h4> ({likeArray.length > 0 && likeArray[0].reviewer})</h4>
                </div>
              </div>
              <div className="link-top"></div>
              <div className="price h4">
                {' '}
                ${dishInfo.length > 0 && dishInfo[0].price}元
              </div>
              <div className="introduction-content h5">
                {dishInfo.length > 0 && dishInfo[0].introduction}
              </div>
            </div>
            <div className="imgb">
              <img
                className="img"
                src={
                  dishInfo.length > 0 &&
                  defaulDomain + dishInfo[0].image_realistic
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bbqpork food-m">
          <div className="introduction">
            <div className="imgb">
              <img
                className="img"
                src={
                  dishInfo.length > 0 &&
                  defaulDomain + dishInfo[2].image_realistic
                }
                alt=""
              />
            </div>
            <div className="introduction-text">
              <div className="introduction-title">
                <div className="h3">
                  {dishInfo.length > 0 && dishInfo[2].name}
                </div>
                <div className="assess h4">
                  <div className="star">
                    <div className="empty_star">★★★★★</div>
                    <div
                      className="full_star"
                      style={{
                        width: likeArray.length > 0 && `${likeArray[2].stars}%`,
                      }}
                    >
                      ★★★★★
                    </div>
                  </div>
                  <h4> ({likeArray.length > 0 && likeArray[2].reviewer})</h4>
                </div>
              </div>
              <div className="link-top"></div>
              <div className="price h4">
                {' '}
                ${dishInfo.length > 0 && dishInfo[2].price}元
              </div>
              <div className="introduction-content h5">
                {dishInfo.length > 0 && dishInfo[2].introduction}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DishInfo
