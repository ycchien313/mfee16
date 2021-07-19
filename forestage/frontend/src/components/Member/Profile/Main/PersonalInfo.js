import React, { useState } from 'react'

function PersonalInfo() {
  const [taValue, setTaValue] = useState('桃園市中壢區中大路100號')
  const [taContainerValue, setTaContainerValue] =
    useState('桃園市中壢區中大路100號')
  const [toggleBtn, setToggleBtn] = useState(true)
  const [toggleInput, setToggleInput] = useState(true)
  const [toggleTextarea, setToggleTextarea] = useState(true)

  return (
    <>
      <div className="personal-info-container">
        {/* <!--照片 --> */}
        <div className="avatar-container">
          <button
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
          </button>
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
                  defaultValue="elfin"
                  {...(toggleInput
                    ? { className: '', disabled: true }
                    : { className: 'active', disabled: false })}
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">性別</div>
              <div className="info-col">
                <input
                  type="text"
                  defaultValue="男"
                  placeholder="男"
                  pattern="[男|女]{1}"
                  required
                  {...(toggleInput
                    ? { className: '', disabled: true }
                    : { className: 'active', disabled: false })}
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
                ></textarea>
              </div>
            </div>
          </div>
        </div>

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
            }}
          >
            儲存
          </button>
        </div>
      </div>
    </>
  )
}

export default PersonalInfo
