import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../../../styles/member/member_customer_service.scss'
import DialogBoxCustomer from './ChatDialogBox/DialogBoxCustomer'
import DialogBoxAdmin from './ChatDialogBox/DialogBoxAdmin'
import ChatButton from './ChatButton'

function CustomerService() {
  const [isShowDialogBox, setIsShowDialogBox] = useState(false)
  const [ws, setWs] = useState(null)
  const [didMount, setDidMount] = useState(true)
  const [memberId, setMemberId] = useState(null)
  const [memberEmail, setMemberEmail] = useState(null)
  const [memberAvatar, setMemberAvatar] = useState(null)
  const employees = ['ycchien313@gmail.com', 'chien313jay@gmail.com']

  const fetchMemberId = async () => {
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

  const fetchMemberEmail = async () => {
    const response = await axios.get(
      `http://localhost:3001/member/email/${memberId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    )
    const data = response.data
    const resMemberEmail = data.data[0].email
    setMemberEmail(resMemberEmail)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchMemberId()
    }

    fetchData()
    setDidMount(false)
  }, [])

  useEffect(() => {
    if (didMount === false) {
      const fetchData = async () => {
        await fetchMemberEmail()
      }

      fetchData()
    }
  }, [memberId])

  return (
    <>
      <div className="member-customer-service">
        {/* 線上客服對話框 */}
        {employees.includes(memberEmail) ? (
          <DialogBoxAdmin
            isShowDialogBox={isShowDialogBox}
            ws={ws}
            memberAvatar={memberAvatar}
          />
        ) : (
          <DialogBoxCustomer
            isShowDialogBox={isShowDialogBox}
            ws={ws}
            memberId={memberId}
            memberEmail={memberEmail}
            memberAvatar={memberAvatar}
            setMemberAvatar={setMemberAvatar}
            employees={employees}
          />
        )}

        {/* 線上客服按鈕 */}
        <ChatButton
          isShowDialogBox={isShowDialogBox}
          setIsShowDialogBox={setIsShowDialogBox}
          ws={ws}
          setWs={setWs}
        />
      </div>
    </>
  )
}

export default CustomerService
