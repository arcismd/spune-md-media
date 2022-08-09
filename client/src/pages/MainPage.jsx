import React from 'react'
import { date, month } from '../components/Date'

export const MainPage = () => {
  return (
    <div className='main-page-grid'>
      <h4><div className='flex-date-main-page'><span className='news-dot'>&#10256;</span>{date} {month}</div></h4>
      <div className='main-page-news'>
      </div>
      <div className='kek1'></div>
      <div className='kek'>
        <h3>Comunitati</h3>
        <h3>Taguri</h3>
      </div>
    </div>
  )
}
