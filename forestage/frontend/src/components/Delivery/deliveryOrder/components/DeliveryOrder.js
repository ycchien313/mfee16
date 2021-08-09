import React, { useEffect, useState } from 'react'
import Order from './Order'
import OrderList from './OrderList'
import $ from 'jquery'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function DeliveryOrder(props) {
  const [selectedOption, setSelectOption] = useState('')
  const [inputText, setInputText] = useState('')
  const [inputTel, setInputTel] = useState('')
  const [textArea, setTextArea] = useState('')
  const [inputAdd, setInputAdd] = useState('')
  const { orderAll, memberId } = props
  const [coupon, inputCoupon] = useState([])
  const [member, inputMember] = useState([])
  const [allAddress, setAllAddress] = useState('')
  const [money, setMoney] = useState('')
  const [couponId, setCouponId] = useState('')
  const [mcmId, setMcmId] = useState('')

  const data = {
    name: inputText,
    mobile: inputTel,
    address: allAddress,
    delivery_time: orderAll.fulltime,
    total: money,
    note: textArea,
    member_id: memberId,
    mcm_id: mcmId,
    coupon_id: couponId,
    dishList: orderAll.dishList,
  }
  // console.log(data, 'aaa')
  // console.log(memberId, 'memberId')

  function change() {
    axios({
      method: 'post',
      url: 'http://localhost:3001/delivery/order',
      data: {
        data,
      },
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // console.log(money)
    $.ajax({
      url: `http://localhost:3001/delivery/coupon/${memberId}`,
      // url: 'http://localhost:3001/delivery/coupon',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        inputCoupon(result)
        // console.log('result', result)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [memberId])

  useEffect(() => {
    $.ajax({
      url: `http://localhost:3001/delivery/member/${memberId}`,
      // url: 'http://localhost:3001/delivery/member',
      method: 'GET',
      dataType: 'json',
    })
      .then(function (result) {
        inputMember(result)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [])

  //

  return (
    <>
      <div className="DeliveryOrder">
        <div className="hero-section">
          <div className="top-wave">
            <h1 className="h1 title">外送訂餐</h1>
            <h3 className="h3 title">確認訂單</h3>
            <img
              className="wave-1"
              src={
                'http://localhost:3000/images/delivery/deliveryOrder/top-wave.svg'
              }
              alt=""
            />
            <img
              className="elfin"
              src={
                'http://localhost:3000/images/delivery/deliveryOrder/elfin-green.png'
              }
              alt=""
            />
          </div>
        </div>
        <div className="res-check">
          <div className="container-big">
            <div className="bread-crumb">
              <Link
                className="Link-back"
                to={{
                  pathname: '/delivery',
                  state: {
                    counts: orderAll.counts,
                    address: orderAll.address,
                    fulltime: orderAll.fulltime,
                  },
                }}
              >
                <a href="#/" className="prev span">
                  外送訂餐
                </a>
              </Link>
              {'  /  '}
              <a href="#/" className="active span">
                確認訂單
              </a>
            </div>
            <OrderList
              selectedOption={selectedOption}
              setSelectOption={setSelectOption}
              orderAll={orderAll}
              coupon={coupon}
              inputCoupon={inputCoupon}
              setMoney={setMoney}
              setCouponId={setCouponId}
              setMcmId={setMcmId}
            />
            {/* <form> */}
            <Order
              inputText={inputText}
              setInputText={setInputText}
              inputTel={inputTel}
              setInputTel={setInputTel}
              inputAdd={inputAdd}
              setInputAdd={setInputAdd}
              textArea={textArea}
              setTextArea={setTextArea}
              orderAll={orderAll}
              member={member}
              inputMember={inputMember}
              memberId={memberId}
              allAddress={allAddress}
              setAllAddress={setAllAddress}
            />
            <div className="check">
              <span className="info-text">
                本店採現場付款，訂單送出後您將收到 E-Mail 確認信。
              </span>
              <div className="buttons">
                <Link
                  className="Link-back"
                  to={{
                    pathname: '/delivery',
                    state: {
                      counts: orderAll.counts,
                      address: orderAll.address,
                      fulltime: orderAll.fulltime,
                    },
                  }}
                >
                  <button className="guide-button back">
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/arrow-circle-left-solid.svg'
                      }
                      alt=""
                    />
                    修改訂餐
                  </button>
                </Link>
                {(inputText === '') | (inputTel === '') ? (
                  <button
                    className="pink-guide-button"
                    onClick={function () {
                      Swal.fire({
                        icon: 'warning',
                        title: '確認有無遺漏填寫選項',
                        text: '請輸入姓名及電話~',
                      })
                    }}
                  >
                    確認選項
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/arrow-circle-right-solid.svg'
                      }
                      alt=""
                    />
                  </button>
                ) : localStorage.getItem('authToken') === null ? (
                  <button
                    className="pink-guide-button"
                    onClick={function () {
                      Swal.fire({
                        icon: 'warning',
                        title: '確認有無登入',
                        text: '請至上方登入~',
                      })
                    }}
                  >
                    確認登入
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/arrow-circle-right-solid.svg'
                      }
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    className="pink-guide-button"
                    onClick={
                      // change
                      function () {
                        change()
                        Swal.fire({
                          icon: 'success',
                          title: '外送訂購成功',
                          html: '<h5>請至信箱收取您的訂位確認信</h5><div style="display:flex; justify-content:center"><a href="/member/delivery" style="background:#f5b54d; width:120px; height:40px; color:white; display:block; line-height:40px; border-radius:5px; text-decoration: none; margin:5px;">檢視訂單</a><a href="/" style="background:#97bc78; width:120px; height:40px; color:white; display:block; line-height:40px; border-radius:5px; text-decoration: none; margin:5px;">回首頁<a/></div>',
                          showConfirmButton: false,
                          allowEscapeKey: false,
                          allowOutsideClick: false,
                        })
                      }
                    }
                  >
                    確認送出
                    <img
                      src={
                        'http://localhost:3000/images/delivery/deliveryOrder/arrow-circle-right-solid.svg'
                      }
                      alt=""
                    />
                  </button>
                )}
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default DeliveryOrder
