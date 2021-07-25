import React, { useState } from 'react'
import Auth from '../../components/Auth/'

function Member() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          setShowAuthModal(!showAuthModal)
        }}
      >
        123
      </button>
      {showAuthModal && (
        <Auth
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      )}
    </>
  )
}

export default Member
