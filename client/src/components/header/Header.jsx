import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className='headerTitleSm'>Noble Express</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerTitleImg' src='https://wallpaper.dog/large/994212.jpg' alt='' />
    </div>
  )
}
