import React, { useEffect } from 'react'
import axios from 'axios'
import ChooseDate from './ChooseDate'
import ChooseSeat from './ChooseSeat'
import ChooseMeal from './ChooseMeal'
import CheckList from './CheckList'

function Main() {
  useEffect(() => {
    axios
      .get('http://localhost:3001/reservation/2021-07-17', {
        params: {
          ID: 12345,
        },
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }, [])
  return (
    <>
      <main>
        <div class="container-big">
          <article class="main-article">
            <ChooseDate />
            <ChooseSeat />
            <ChooseMeal />
          </article>
          <aside class="aside-list">
            <CheckList />
          </aside>
        </div>
      </main>
      <div class="table-bg"></div>
    </>
  )
}

export default Main
