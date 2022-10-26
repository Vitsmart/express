import React, { useContext, useRef, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { Context } from '../../components/context/Context';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { axiosInstance } from '../../components/config';


export default function Login() {
const userRef = useRef();
const passwordRef = useRef();
const { dispatch, isFetching} = useContext(Context);
const [isloading, setIsloading] = useState(false)

const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      setIsloading(true)
      const res = await axiosInstance.post("/auth/login", {
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    }catch (err){
      dispatch({type:"LOGIN_FAILURE"})
      setIsloading(false)
    }
  }

  
  return (
    
          <>
    {isloading ? <LoadingSpinner /> :
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className='loginInput' 
            type="text" 
            placeholder='Enter your username...'
            ref={userRef}/>
            <label>Password</label>
            <input className='loginInput' 
            type="password" 
            placeholder='Enter your password...'
            ref={passwordRef}/>
            <button type='submit' className="loginButton" disabled={isFetching}>Login</button>
            
        </form>
        <button className="loginRegisterButton">
            <Link className='link' to='/register'>Register</Link>
        </button>


        </div>
}
        </>
        
  )
}
