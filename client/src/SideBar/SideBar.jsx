import React, { useEffect, useState } from 'react'
import './SideBar.css'
import profileImg from '../assets/profile.jpg'

import { Link } from 'react-router-dom';
import { axiosInstance } from '../components/config';


export default function SideBar() {

const [cats, setCats] = useState([]);

useEffect(()=>{
    const getCats = async () =>
    {
        const res = await axiosInstance.get("/categories")
        setCats(res.data)
    }
    getCats()
},[])

  return (
    <>
    <div className="sideBar">
    <div className='side-article'>
      <h2 className='articl'>Post an article</h2>
      <button className='btn-article'><a href='/write'>Post</a></button>
      </div>
        <div className="sideBarItem">
            <span className="sideBarTitle">ABOUT ME</span>
        
        <img
        src={profileImg}
        alt='profile'
        />
        <p>
            Lorem ipsum dolor sit praesentium! Vero illo fugiat, commodi eaque esse dolore iste officia rem dolorem sit dolores modi ex non impedit nisi!
        </p>
    </div>
    <div className="sideBarItem">
        <span className="sideBarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className='sideBarListItem'>{c.name}</li>
            </Link>
          ))}
        </ul>
    </div>
    <div className="sideBarItem">
        <span className="sideBarTitle">FOLLOW US</span>
        <div className="sideBarSocial">
        <i className="sideBarIcon fa-brands fa-facebook"></i>
            <i className="sideBarIcon fab fa-instagram"></i>
            <i className="sideBarIcon fab fa-twitter-square"></i>
        </div>
    </div>
    </div>
    </>
  )
}
