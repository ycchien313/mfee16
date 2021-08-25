import React, { useState, useEffect } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

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

  // 線上客服拖曳程式
  const chatBtnDrag = (e) => {
    // Math.max 為超出範圍限制用
    let left = Math.max(e.clientX - 45, 10) + 'px'
    let right = Math.max(document.body.clientWidth - e.clientX - 45, 0) + 'px'
    let memberCustomerService = document.querySelector(
      '.member-customer-service'
    )

    // 讓左側對話框不會超出範圍，並更改對話框方向
    if (e.clientX < 560) {
      memberCustomerService.style.flexDirection = 'row-reverse'
      right = 'auto'
    } else {
      memberCustomerService.style.flexDirection = 'row'
      left = 'auto'
    }

    memberCustomerService.style.right = right
    memberCustomerService.style.left = left
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
      <div
        className="member-customer-service"
        onDragEnd={(e) => chatBtnDrag(e)}
      >
        <SwitchTransition>
          <CSSTransition
            key={isShowDialogBox}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false)
            }}
            classNames="slide"
          >
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
          </CSSTransition>
        </SwitchTransition>

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
