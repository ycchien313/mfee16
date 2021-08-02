import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import '../../../../styles/member/modal.scss'

function ModalPassword(props) {
  const { show, handleClose, dbRequest, memberId } = props
  const [tip, setTip] = useState('')
  const [dataLoading, setDataLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // 密碼欄位更動時，設定至 passwords 狀態
  const setPasswordFields = (e) => {
    const newPasswords = { ...passwords, [e.target.name]: e.target.value }
    setPasswords(newPasswords)
  }

  // 檢查舊密碼是否跟資料庫符合
  const checkPasswordServer = async () => {
    try {
      const response = await dbRequest.post(`password/${memberId}`, {
        data: { oldPassword: passwords.oldPassword },
      })
      const data = response.data
      const status = data.status
      const result = data.data

      if (status === '成功') return result
      else new Error(result)
    } catch (error) {
      // console.error({ status: '失敗', msg: error })
    }
  }

  // 更新密碼至資料庫
  const updatePasswordServer = async () => {
    try {
      const response = await dbRequest.put(`password/${memberId}`, {
        data: { newPassword: passwords.newPassword },
      })
      const data = response.data
      const status = data.status
      const result = data.data

      if (status === '成功') return result
      else new Error(result)
    } catch (error) {
      // console.error({ status: '失敗', msg: error })
    }
  }

  // 處理確認送出後狀況
  const handleSubmit = async () => {
    // 將提示訊息清空
    setTip('')

    // 檢查舊密碼是否輸入正確
    const checkResult = await checkPasswordServer()

    if (checkResult !== '密碼相符') {
      setTip(checkResult)
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      setTip('密碼不一致')
    } else if (
      passwords.newPassword.length < 3 ||
      passwords.confirmPassword.length < 3
    ) {
      setTip('密碼長度過低')
    } else {
      // 呈現 loading
      setDataLoading(true)

      // 更新密碼至資料庫
      updatePasswordServer()

      // 1秒後顯示修改成功，關閉視窗
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: '修改成功',
          showConfirmButton: false,
          timer: 1000,
        })

        handleClose()

        setDataLoading(false)
      }, 1000)
    }
  }

  const loading = (
    <>
      <div className="text-center">
        <img
          src={process.env.PUBLIC_URL + '/images/member/spinner.svg'}
          alt=""
        ></img>
      </div>
    </>
  )

  // 彈出視窗內容
  const showModalBody = (
    <>
      <div className="container">
        <div className="row mb-3">
          <div className="col-6 left-part">請輸入舊密碼</div>
          <div className="col-6 right-part">
            <input
              name="oldPassword"
              className="input-group"
              type="password"
              placeholder="請輸入舊密碼"
              value={passwords.oldPassword}
              onChange={(e) => {
                setPasswordFields(e)
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 left-part">請輸入新密碼</div>
          <div className="col-6 right-part">
            <input
              name="newPassword"
              className="input-group"
              type="password"
              placeholder="請輸入3位數以上密碼"
              value={passwords.newPassword}
              onChange={(e) => {
                setPasswordFields(e)
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6 left-part">再次輸入新密碼</div>
          <div className="col-6 right-part">
            <input
              name="confirmPassword"
              className="input-group"
              type="password"
              placeholder="請再次輸入密碼"
              value={passwords.confirmPassword}
              onChange={(e) => {
                setPasswordFields(e)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Modal className="password" show={show} onHide={handleClose}>
        <Modal.Header className="modal-header">
          <Modal.Title>
            <span className="modal-title h4">重設密碼</span>
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {dataLoading ? loading : showModalBody}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div className="tip">{tip}</div>
          <button
            type="button"
            className="btn btn-secondary close-button"
            onClick={handleClose}
          >
            關閉
          </button>
          <button
            type="button"
            className="btn orange"
            onClick={() => {
              handleSubmit()
            }}
          >
            確認修改
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalPassword
