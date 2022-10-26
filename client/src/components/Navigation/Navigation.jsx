import React, { useContext, useState } from 'react'
import './Navigation.css'
import faceImg from '../../assets/face.jpg'
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import userImg from '../../assets/profile.jpg'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


export default function Navigation() {
const [isloading,setIsloading] = useState(false)


    const {user, dispatch} = useContext(Context);
const handleLogout = () =>{
    try {
    setIsloading(true)
    dispatch({type:"LOGOUT"})
    window.location.replace("/login");
   // const pf = "http://localhost:5000/images/";
} catch (err){}
setIsloading(false)

}
  return (
    <>
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fa-brands fa-facebook"></i>
            <i className="topIcon fab fa-instagram"></i>
            <i className="topIcon fab fa-twitter-square"></i>
        </div>
        {isloading ? <LoadingSpinner /> : (
        <div className="topCenter">
                
                {user &&
            <ul className="topList">
            <li className="topListItem"><Link className='link' to='/'>Home</Link></li>
            <li className="topListItem">Contact</li>
            <li className="topListItem">About</li>
            <li className="topListItem"><Link className='link' to='/write'>Write</Link></li>
            <li className="topListItem" onClick={handleLogout} >
                {user && "Logout"}</li>
            </ul>
              } 
              
        </div>
        )}
        <div className="topRight">
            { 
            user ? (
                <Link to="/settings">
                <img 
            className='topImg'
            src={user.profilePic ? user.profilePic : userImg}
            alt='user'
            />
            <p className='profile'>Profile</p>
                </Link>
            
            ) : (
                <ul className='topList'>
                    <li className='topListItem'>
                    <Link className='link' to='/login'>Login</Link>
                    </li>
                <li className='topListItem'>
                <Link className='link' to='/register'>Register</Link>

                </li>
                </ul>
            )
            }
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>

        </div>
        </>
  )
}
