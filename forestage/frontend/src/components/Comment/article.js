import React from 'react'

function Article() {
  return (
    <>
      {/* 討論區 開始 */}
      <div class="commentstar">
        <h2>蕭敬騰</h2>
        <select name="" id="">
          <option value="">所有文章</option>
          <option value="" disabled>
            ---歌手評論---
          </option>
          <option value="">蕭敬騰</option>
          <option value="">劉德華</option>
          <option value="">馬輪FIVE</option>
          <option value="">林啃公園</option>
          <option value="">羊沉琳</option>
          <option value="">李瀧號</option>
          <option value="" disabled>
            ---餐點評論---
          </option>
          <option value="">瑪格麗特大披薩</option>
          <option value="">總匯潛艇堡</option>
          <option value="">碳烤豬肋排</option>
          <option value="">凱薩沙拉</option>
          <option value="">甜椒封肉</option>
          <option value="">墨西哥雞肉捲</option>
          <option value="">爆米花</option>
          <option value="">巧克力聖代</option>
          <option value="">草莓蛋糕</option>
        </select>
        <div class="morebox">
          <div class="commentbox">
            <figrue class="articleimgsize">
              <img
                class="commentimg"
                src="http://localhost:3000/images/comment/back.png"
                alt=""
              ></img>
            </figrue>
            <div class="article">
              <h4>蕭敬騰的歌真不錯</h4>
              <span>-愛聽音樂的小花</span>
              <p>
                有時候會感覺敬騰唱歌唱的真不錯，除了要求華麗高音或者特別技巧的部分以外，就是把平凡的phrase唱的很富有感覺的時候。有時候會感覺敬騰唱歌唱的真不錯，除了要求華麗高音或者特別技巧的部分以外，就是把平凡的phrase唱的很富有感覺的時候。
              </p>
            </div>
            <div class="star">
              <img
                class="starss"
                src="http://localhost:3000/images/comment/star.svg"
                alt=""
              ></img>
              <div class="share">
                <a href="#" alt="">
                  <img
                    src="http://localhost:3000/images/comment/share.svg"
                    alt=""
                  ></img>
                </a>
                <img
                  src="http://localhost:3000/images/comment/message.svg"
                  alt=""
                ></img>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21.86"
                  height="20"
                  viewBox="0 0 21.86 20"
                >
                  <path
                    id="Path_857"
                    data-name="Path 857"
                    d="M10.93,20C5.053,16.007,1.971,12.374.707,9.333-2.68,1.185,6.993-2.711,10.93,2.1c3.937-4.81,13.61-.913,10.224,7.235C19.89,12.374,16.807,16.007,10.93,20Z"
                    fill="#fc5c75"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 討論區 結束 */}
    </>
  )
}
export default Article
