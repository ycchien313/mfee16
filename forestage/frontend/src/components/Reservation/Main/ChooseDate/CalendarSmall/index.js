import React from 'react'
import '../../../../../styles/reservation/res/reservation-date-RWD.scss'
function CalendarSmall() {
  return (
    <>
      <div class="week-tags">
        <div class="this-week active h3">本周</div>
        <div class="next-week h3">下周</div>
      </div>
      <div class="week">
        <div class="day active">
          <div class="singer-pic"></div>
          <span class="h4 name">劉德華</span>
          <span class="h4 date">8/10</span>
        </div>
        <div class="day">
          <div class="singer-pic"></div>
          <span class="h4 name">劉德華</span>
          <span class="h4 date">8/10</span>
        </div>
        <div class="day">
          <div class="singer-pic"></div>
          <span class="h4 name">劉德華</span>
          <span class="h4 date">8/10</span>
        </div>
        <div class="day">
          <div class="singer-pic"></div>
          <span class="h4 name">劉德華</span>
          <span class="h4 date">8/10</span>
        </div>
        <div class="day">
          <div class="singer-pic"></div>
          <span class="h4 name">劉德華</span>
          <span class="h4 date">8/10</span>
        </div>
      </div>
    </>
  )
}

export default CalendarSmall
