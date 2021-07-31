import React, { useState, useEffect, useContext, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import AuthContext from '../../../Auth/AuthContext'

function PersonalInfo(props) {
  // const { member } = useContext(AuthContext)
  // const { memberId } = member

  const { dbRequest } = props
  const [memberId, setMemberId] = useState('')
  const [toggleBtn, setToggleBtn] = useState(true)
  const [toggleInput, setToggleInput] = useState(true)
  const [toggleTextarea, setToggleTextarea] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)
  const [didMount, setDidMount] = useState(true)
  const [profile, setProfile] = useState({
    avatar: process.env.PUBLIC_URL + '/images/member/default-user.png',
    name: '',
    gender: '',
    birthday: '',
    mobile: '',
    address: '',
  })
  // 取消修改後，復原用狀態
  const [restoreProfile, setRestoreProfile] = useState({
    avatar: '',
    name: '',
    gender: '',
    birthday: '',
    mobile: '',
    address: '',
  })
  // const nodeRef = useRef(null)

  // 取得 memberId (解 token)
  const getMember = async () => {
    const token = localStorage.getItem('authToken')
    const response = await axios.get('http://localhost:3001/auth/me', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
    const data = response.data
    const resMemberId = data.memberId

    setMemberId(resMemberId)
  }

  // 取得來自 server 的會員資料(GET)
  const getProfileServer = async () => {
    try {
      const response = await dbRequest.get(`profile/${memberId}`)
      const data = response.data
      const status = data.status
      const avatar = () => {
        if (data.data[0].avatar !== null) {
          return data.data[0].avatar.substring(0, 4) === 'http'
            ? data.data[0].avatar
            : `http://127.0.0.1:3001/${data.data[0].avatar}`
        }

        return process.env.PUBLIC_URL + '/images/member/default-user.png'
      }

      const profileFields = {
        avatar: avatar(),
        name: data.data[0].name,
        gender: data.data[0].gender,
        birthday: data.data[0].birthday,
        mobile: data.data[0].mobile,
        address: data.data[0].address,
      }
      console.log(profileFields)
      if (status === '成功') {
        setProfile(profileFields)
        setRestoreProfile(profileFields)
      } else {
        console.log('取得資料失敗')
        new Error(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 更新至 server 的會員資料(PUT)
  const updateProfileServer = (form) => {
    console.log('on PUT')
    try {
      dbRequest.put(`profile/${memberId}`, form)
      // dbRequest.put(`profile/1`, form)
    } catch (error) {
      console.error({ status: '失敗', msg: error })
    }
  }

  // input 編輯後，設定內容至 profile 狀態
  const setProfileFields = (e, fixedValue) => {
    // 將 profile 物件全部給 newProfile，[e.target.name]有修改的部分則會覆蓋
    let newProfile = {
      ...profile,
      [e.target.name]: fixedValue ? fixedValue : e.target.value,
    }
    setProfile(newProfile)
  }

  // 預覽圖片
  const previewImage = (e) => {
    // 取得上傳的檔案
    const file = e.target.files.item(0)

    // 將上傳圖片轉成 URL，方法一
    const newAvatarUrl = URL.createObjectURL(file)

    // 將上傳圖片轉成 URL，方法二
    // const fileReader = new FileReader() // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案

    // fileReader.readAsDataURL(file) // 讀取完檔案後，變成有 URL 物件

    // // 取得新檔案的 URL
    // const newAvatarUrl = await new Promise((resolve, reject) => {
    //   fileReader.addEventListener('load', (e) => {
    //     return resolve(e.target.result)
    //   })
    // })

    // 將修改後的照片設定到 profile 狀態
    setProfileFields(e, newAvatarUrl)
  }

  // 處理 form 表單傳送
  const handleSubmit = (e) => {
    e.preventDefault()

    setToggleBtn(!toggleBtn)
    setToggleInput(!toggleInput)
    setToggleTextarea(!toggleTextarea)

    const form = new FormData(e.target)

    console.log('hamdleSubmit: ', profile)

    // 傳到後端
    updateProfileServer(form)

    // 載入器
    setDataLoading(true)
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }

  // componentDidMount
  useEffect(() => {
    getMember()
    setDidMount(false)
  }, [])

  // componentDidUpdate
  useEffect(() => {
    if (didMount === false) {
      getMember()
      getProfileServer()
    }
  }, [memberId])

  const loading = (
    <>
      <div className="spinner">
        <img
          src={process.env.PUBLIC_URL + '/images/member/spinner.svg'}
          alt=""
        ></img>
      </div>
    </>
  )

  // form 表單的內容
  const showProfile = (
    <>
      {/* <!--照片 --> */}
      <div className="avatar-container">
        <div
          role="button"
          {...(toggleBtn
            ? { className: 'edit-btn orange-guide-button' }
            : { className: 'cancel-btn orange-guide-button' })}
          onClick={() => {
            toggleBtn === false && setProfile(restoreProfile)

            setToggleBtn(!toggleBtn)
            setToggleInput(!toggleInput)
            setToggleTextarea(!toggleTextarea)
          }}
        >
          <i
            {...(toggleBtn
              ? { className: 'edit-pen fas fa-pen' }
              : { className: 'cancel-edit fas fa-times' })}
          ></i>
        </div>
        <div className="photo-box">
          <img src={profile.avatar} alt="" className="photo mouse-enter" />
          <div className="photo-mask"></div>
          {!toggleBtn && (
            <label>
              <input
                name="avatar"
                type="file"
                className="d-none"
                // value={profile.avatar}
                accept=".png,.jpg,jpeg,.svg"
                onChange={(e) => {
                  // 預覽圖片
                  previewImage(e)
                }}
              />
              <i
                className="far fa-image"
                // 設定大頭貼遮罩顯示時機
                onMouseEnter={() => {
                  document.querySelector('.photo-mask').classList.toggle('fade')
                }}
                onMouseLeave={() => {
                  document.querySelector('.photo-mask').classList.toggle('fade')
                }}
              ></i>
            </label>
          )}
        </div>

        <div className="name-box">
          <h3 className="name">{profile.name}</h3>
        </div>
      </div>

      {/* <!-- 個人資料 --> */}
      <CSSTransition
        in={toggleBtn}
        // nodeRef={nodeRef}
        timeout={300}
        classNames="fade"
      >
        <div className="data-container">
          <div className="table-container">
            <div className="info-row">
              <div className="info-col h4">個人資料</div>
            </div>
            <div className="info-row">
              <div className="info-col">使用者名稱</div>
              <div className="info-col">
                <input
                  name="name"
                  type="text"
                  value={profile.name}
                  {...(toggleInput
                    ? { className: '', disabled: true }
                    : { className: 'active', disabled: false })}
                  onChange={(e) => {
                    setProfileFields(e)
                  }}
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">性別</div>
              <div className="info-col">
                <input
                  name="gender"
                  type="text"
                  value={profile.gender}
                  placeholder="ex. 男"
                  pattern="[男|女]{1}"
                  required
                  {...(toggleInput
                    ? { className: '', disabled: true }
                    : { className: 'active', disabled: false })}
                  onChange={(e) => {
                    setProfileFields(e)
                  }}
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">生日</div>
              <div className="info-col">
                <input
                  name="birthday"
                  type="text"
                  value={profile.birthday}
                  placeholder="ex. 1990.01.01"
                  pattern="[0-9]{4}\.(0[1-9]|1[012])\.(0[1-9]|1[0-9]|2[0-9]|3[01])"
                  required
                  {...(toggleInput
                    ? { className: '', disabled: true }
                    : { className: 'active', disabled: false })}
                  onChange={(e) => {
                    setProfileFields(e)
                  }}
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">手機號碼</div>
              <div className="info-col">
                <input
                  name="mobile"
                  type="tel"
                  value={profile.mobile}
                  placeholder="ex. 0911222333"
                  pattern="([0-9]{4}-[0-9]{3}-[0-9]{3})|([0-9]{4}[0-9]{3}[0-9]{3})"
                  required
                  {...(toggleInput
                    ? { className: '', disabled: true }
                    : { className: 'active', disabled: false })}
                  onChange={(e) => {
                    setProfileFields(e)
                  }}
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">地址</div>
              <div className="info-col textarea-container">
                {/* 從 textarea 設定 textarea-container 的文字 */}
                {profile.address}
                <textarea
                  name="address"
                  className="textarea"
                  value={profile.address}
                  pattern="(?\D+?[縣市])(?\D+?(市區|鎮區|鎮市|[鄉鎮市區]))?(?\D+?[村里])?(?\d+[鄰])?(?\D+?(村路|[路街道段]))?(?\D?段)?(?\d+巷)?(?\d+弄)?(?\d+號?)?(?-\d+?(號))?(?\d+樓)?(?.+)?"
                  required
                  {...(toggleTextarea
                    ? { className: 'textarea', disabled: true }
                    : { className: 'textarea active', disabled: false })}
                  onChange={(e) => {
                    setProfileFields(e)
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )

  return (
    <>
      <div className="personal-info-container">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          action="/contact/save"
        >
          {/* 個人檔案 */}
          <CSSTransition in={dataLoading} timeout={300} classNames="fade">
            {dataLoading ? loading : showProfile}
          </CSSTransition>

          {/* 儲存按鈕 */}
          <div className="save-btn-container">
            <button
              type="submit"
              {...(!toggleBtn
                ? { className: 'save-btn pink-guide-button' }
                : { className: 'd-none' })}
            >
              儲存
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PersonalInfo
