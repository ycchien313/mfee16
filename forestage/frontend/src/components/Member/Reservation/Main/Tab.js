import React from 'react'

function Tab(props) {
  const { isRecent, setIsRecent } = props

  return (
    <>
      <div class="tab">
        <div class="tab-container">
          <div
            className={isRecent ? 'tab-item active' : 'tab-item'}
            id="tabRecent"
            onClick={() => {
              setIsRecent(true)
            }}
          >
            <h4>近期訂位</h4>
          </div>
          <div
            className={isRecent ? 'tab-item' : 'tab-item active'}
            id="tabHistory"
            onClick={() => {
              setIsRecent(false)
            }}
          >
            <h4>歷史紀錄</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tab
