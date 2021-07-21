import React, { useState, useEffect } from 'react'

function PersonalInfo(props) {
  const { dbRequest, memberId } = props
  const [toggleBtn, setToggleBtn] = useState(true)
  const [toggleInput, setToggleInput] = useState(true)
  const [toggleTextarea, setToggleTextarea] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)
  // const [didMount, setDidMount] = useState(true)
  const [profile, setProfile] = useState({
    avatar: '',
    name: '',
    gender: '',
    birthday: '',
    mobile: '',
    address: '',
  })
  const [restoreProfile, setRestoreProfile] = useState({
    avatar: '',
    name: '',
    gender: '',
    birthday: '',
    mobile: '',
    address: '',
  })

  // 取得來自 server 的會員資料
  const getProfileServer = async () => {
    try {
      const response = await dbRequest.get(`profile/${memberId}`)
      const data = response.data
      const status = data.status
      const profileFields = {
        avatar: data.data[0].avatar,
        name: data.data[0].name,
        gender: data.data[0].gender,
        birthday: data.data[0].birthday,
        mobile: data.data[0].mobile,
        address: data.data[0].address,
      }

      if (status === '成功') {
        setProfile(profileFields)
        setRestoreProfile(profileFields)
      } else {
        new Error(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 更新至 server 的會員資料
  const updateProfileServer = () => {
    try {
      dbRequest.put(`profile/${memberId}`, {
        data: profile,
      })
    } catch (error) {
      console.error({ status: '失敗', msg: error })
    }
  }

  // input 編輯後，設定內容至 profile 狀態
  const setProfileFields = (e) => {
    // 將 profile 物件全部給 newProfile，[e.target.name]有修改的部分則會覆蓋
    let newProfile = { ...profile, [e.target.name]: e.target.value }
    setProfile(newProfile)
  }

  // 處理 form 表單傳送
  const handelSubmit = (e) => {
    e.preventDefault()

    setToggleBtn(!toggleBtn)
    setToggleInput(!toggleInput)
    setToggleTextarea(!toggleTextarea)

    // const formData = new FormData(e.target)

    console.log('hamdleSubmit: ', profile)

    updateProfileServer()

    setDataLoading(true)
    setTimeout(() => {
      setDataLoading(false)
    }, 1000)
  }

  // componentDidMount
  useEffect(() => {
    getProfileServer()
    // setDidMount(false)
  }, [])

  //componentDidUpdate
  // useEffect(() => {
  //   if (!didMount) {
  //   }
  // }, [profile])

  const loading = (
    <>
      <div className="text-center" style={{ width: '27.86vw' }}>
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
    </>
  )

  return (
    <>
      <div className="personal-info-container">
        <form onSubmit={handelSubmit}>
          {/* <form> */}
          {/* 個人檔案 */}
          {dataLoading ? loading : showProfile}

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
