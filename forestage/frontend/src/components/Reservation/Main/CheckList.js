import React, { useEffect, useState } from 'react'
function CheckList(props) {
  const { checkList, setCheckList, dishList, setDishList, seatInfo } = props
  // console.log(checkList,"cklist")
  const [didMount, setDidMount] = useState(false)
  // useEffect(() => {
  //   setDidMount(true)
  // }, [])
  // useEffect(() => {
  //   if (didMount) {
  //     let newCheckList = { ...checkList }
  //     console.log(newCheckList, 'newchecklist')
  //     newCheckList.chosenDate = newCheckList.chosenDate
  //       .slice(5)
  //       .join('')
  //       .replace(/-/g, '/')
  //   }
  // }, [checkList, seatInfo])

  let iconClass = 'fas fa-check-circle'
  let activeIconClass = 'fas fa-check-circle active'
  return (
    <>
      <div class="clipboard">
        <div class="content">
          <div class="title">
            <h4>訂位資料</h4>
            <i class="fas fa-clipboard-list"></i>
          </div>
          <ul>
            <li>
              <div class="name">
                <i
                  class={
                    checkList.chosenDate !== '' ? activeIconClass : iconClass
                  }
                ></i>
                <span>日期</span>
              </div>
              <span class="detail">{checkList.chosenDate}</span>
            </li>
            <li>
              <div class="name">
                <i
                  class={checkList.singer !== '' ? activeIconClass : iconClass}
                ></i>
                <span>歌手</span>
              </div>
              <span class="detail">{checkList.singer}</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i
                  class={
                    checkList.seatArea !== '' ? activeIconClass : iconClass
                  }
                ></i>
                <span>座位區</span>
              </div>
              <span class="detail">{checkList.seatArea}</span>
            </li>
            <li>
              <div class="name">
                <i
                  class={checkList.attendance > 0 ? activeIconClass : iconClass}
                ></i>
                <span>訂位數量</span>
              </div>
              <span class="detail">{checkList.attendance}</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i
                  class={
                    checkList.total >= checkList.minOrder &&
                    checkList.total !== 0
                      ? activeIconClass
                      : iconClass
                  }
                ></i>
                <span>低消金額</span>
              </div>
              <span class="detail">{checkList.minOrder}</span>
            </li>
            <li>
              <div class="name">
                <i
                  class="fas fa-check-circle"
                  style={{ visibility: 'hidden' }}
                ></i>
                <span>目前金額</span>
              </div>
              <span class="detail">{checkList.total}</span>
            </li>
            <hr />
            <li>
              <div class="name">
                <i
                  class={
                    checkList.total >= checkList.minOrder &&
                    checkList.total !== 0
                      ? activeIconClass
                      : iconClass
                  }
                ></i>
                <span>已選擇餐點</span>
              </div>
            </li>
            {dishList.map((v, i) => {
              if (v[1] > 0) {
                return (
                  <li>
                    <span>{v[0]}</span>
                    <span>{v[1]}</span>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <img
          src="http://localhost:3000/images/reservation/board-top.svg"
          alt=""
        />
        <button class="pink-guide-button">
          送出訂位
          <img
            src="http://localhost:3000/images/reservation/arrow-circle-right-solid.svg"
            alt=""
          />
        </button>
      </div>
    </>
  )
}
export default CheckList
