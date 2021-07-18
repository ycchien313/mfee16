import React from 'react'

function PersonalInfo() {
  return (
    <>
      <div className="personal-info-container">
        {/* <!--照片 --> */}
        <div className="avatar-container">
          <button className="edit-btn orange-guide-button">
            <i className="edit-pen fas fa-pen"></i>
          </button>
          <button className="cancel-edit-btn orange-guide-button d-none">
            <i className="cancel-edit fas fa-times"></i>
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
                <input type="text" value="elfin" readOnly />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">性別</div>
              <div className="info-col">
                <input
                  type="text"
                  value="男"
                  placeholder="男"
                  pattern="[男|女]{1}"
                  readOnly
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">生日</div>
              <div className="info-col">
                <input
                  type="text"
                  value="1990.01.01"
                  placeholder="1990.01.01"
                  pattern="[0-9]{4}\.(0[1-9]|1[012])\.(0[1-9]|1[0-9]|2[0-9]|3[01])"
                  readOnly
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">手機號碼</div>
              <div className="info-col">
                <input
                  type="tel"
                  value="0912345678"
                  placeholder="0911222333"
                  pattern="([0-9]{4}-[0-9]{3}-[0-9]{3})|([0-9]{4}[0-9]{3}[0-9]{3})"
                  readOnly
                />
              </div>
            </div>
            <div className="info-row">
              <div className="info-col">地址</div>
              <div className="info-col textarea-container readOnly">
                <textarea
                  className="textarea"
                  defaultValue="桃園市中壢區中大路100號"
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="save-btn-container">
          <button className="save-btn pink-guide-button d-none">儲存</button>
        </div>
      </div>
    </>
  )
}

export default PersonalInfo
