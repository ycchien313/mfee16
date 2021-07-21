import React, { useState, useEffect } from 'react'
import axios from 'axios'

function PersonalInfo() {
  const [taValue, setTaValue] = useState('桃園市中壢區中大路100號')
  const [taContainerValue, setTaContainerValue] =
    useState('桃園市中壢區中大路100號')
  const [toggleBtn, setToggleBtn] = useState(true)
  const [toggleInput, setToggleInput] = useState(true)
  const [toggleTextarea, setToggleTextarea] = useState(true)

  const [profile, setProfile] = useState({
    avatar: '',
    name: '',
    gender: '',
    birthday: '',
    mobile: '',
    address: '',
    email: '',
  })
  // const [dataLoading, setDataLoading] = useState(true)
  const [didMount, setDidMount] = useState(true)

  const memberId = 1

  // server 端會員資料的請求
  const profileRequest = axios.create({
    baseURL: 'http://127.0.0.1:3001/member/profile/',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'appliaction/json',
    }),
  })

  // 取得來自 server 的會員資料
  const getProfileServer = async () => {
    try {
      const response = await profileRequest.get(`${memberId}`)
      const data = response.data
      const status = data.status
      const profileFields = {
        avatar: data.data[0].avatar,
        name: data.data[0].name,
        gender: data.data[0].gender,
        birthday: data.data[0].birthday,
        mobile: data.data[0].mobile,
        address: data.data[0].address,
        email: data.data[0].email,
      }

      status === '成功' ? setProfile(profileFields) : new Error(data)
    } catch (error) {
      console.error(error)
    }
  }

  // 更新至 server 的會員資料
  // const updateProfileServer = () => {
  //   profile.name
  // }

  // input 編輯後，設定內容至 profile 狀態
  const setProfileFields = (field, value) => {
    let newProfile = profile
    newProfile[field] = value
    setProfile(newProfile)
  }
  // const setProfileFields = (e) => {
  //   let newProfile = { ...profile, [e.target.name]: e.target.value }
  //   setProfile(newProfile)
  // }

  const handelSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    console.log('handelSubmit data.get:', data.get('gender'))
    console.log('handelSubmit profile: ', profile.gender)
  }

  // componentDidMount
  useEffect(() => {
    getProfileServer()
    setDidMount(false)
  }, [])

  // componentDidUpdate
  useEffect(() => {
    if (!didMount) {
      console.log('didUpdate: ', profile)

      // setTimeout(() => {
      //   setDataLoading(false)
      // }, 1000)
    }
  }, [profile])

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
          <img
            src={process.env.PUBLIC_URL + '/images/member/elfin-green.png'}
            className="photo"
            alt=""
          />
        </div>
        <div className="name-box">
          <h3 className="name">elfin</h3>
        </div>
      </div>

      {/* <!-- 個人資料 --> */}
      <div className="data-container">
        <div className="table-container">
          <div className="info-row">
            <div className="info-col h4">個人資料</div>
          </div>
          <div className="info-row">
            <div className="info-col">使用者名稱</div>
            <div className="info-col">
              <input
                type="text"
                defaultValue={profile.name}
                {...(toggleInput
                  ? { className: '', disabled: true }
                  : { className: 'active', disabled: false })}
                onBlur={(e) => {
                  setProfileFields('name', e.target.value)
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
                defaultValue={profile.gender}
                placeholder="男"
                pattern="[男|女]{1}"
                required
                {...(toggleInput
                  ? { className: '', disabled: true }
                  : { className: 'active', disabled: false })}
                onBlur={(e) => {
                  setProfileFields('gender', e.target.value)
                  // setProfileFields(e)
                }}
              />
            </div>
          </div>
          <div className="info-row">
            <div className="info-col">生日</div>
            <div className="info-col">
              <input
                type="text"
                defaultValue="1990.01.01"
                placeholder="1990.01.01"
                pattern="[0-9]{4}\.(0[1-9]|1[012])\.(0[1-9]|1[0-9]|2[0-9]|3[01])"
                required
                {...(toggleInput
                  ? { className: '', disabled: true }
                  : { className: 'active', disabled: false })}
                onBlur={(e) => {
                  setProfileFields('birthday', e.target.value)
                }}
              />
            </div>
          </div>
          <div className="info-row">
            <div className="info-col">手機號碼</div>
            <div className="info-col">
              <input
                type="tel"
                defaultValue="0912345678"
                placeholder="0911222333"
                pattern="([0-9]{4}-[0-9]{3}-[0-9]{3})|([0-9]{4}[0-9]{3}[0-9]{3})"
                required
                {...(toggleInput
                  ? { className: '', disabled: true }
                  : { className: 'active', disabled: false })}
                onBlur={(e) => {
                  setProfileFields('mobile', e.target.value)
                }}
              />
            </div>
          </div>
          <div className="info-row">
            <div className="info-col">地址</div>
            <div className="info-col textarea-container">
              {taContainerValue}
              <textarea
                className="textarea"
                defaultValue={taValue}
                {...(toggleTextarea
                  ? { className: 'textarea', disabled: true }
                  : { className: 'textarea active', disabled: false })}
                onInput={(e) => {
                  //  設定 textarea, textarea-container 的文字
                  setTaValue(e.target.value)
                  setTaContainerValue(e.target.value)
                }}
                onBlur={(e) => {
                  setProfileFields('address', e.target.value)
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="personal-info-container">
        <form onSubmit={handelSubmit}>
          {/* 個人檔案 */}
          {showProfile}

          {/* 儲存按鈕 */}
          <div className="save-btn-container">
            <button
              {...(!toggleBtn
                ? { className: 'save-btn pink-guide-button' }
                : { className: 'd-none' })}
              onClick={() => {
                setToggleBtn(!toggleBtn)
                setToggleInput(!toggleInput)
                setToggleTextarea(!toggleTextarea)

                console.log(profile)
              }}
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
