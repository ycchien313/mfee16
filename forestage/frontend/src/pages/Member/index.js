import React, { useContext, useState } from 'react'
import Auth from '../../components/Auth/'
import AuthContext from '../../components/Auth/AuthContext'

function Member() {
  const { user } = useContext(AuthContext)
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          setShowAuthModal(!showAuthModal)
        }}
      >
        打開登入畫面
      </button>
      <button
        onClick={() => {
          console.log(user)
        }}
      >
        取得 user
      </button>
{/* 
        測試 GSAP
      </button>
      <Tween
        {...(gsapPlay ? { to: { x: '200px' } } : { to: { x: '0px' } })}
        // to={{ x: '200px' }}
        duration={2}
        ease={(x) =>
          x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
        }
      >
        <div style={{ width: '100px', height: '100px', background: '#ccc' }} />
      </Tween> */}

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
