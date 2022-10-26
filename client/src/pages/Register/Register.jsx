import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { axiosInstance } from '../../components/config'

export default function Register() {
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("");
const [error, setError] = useState(false);
const [isloading, setIsloading] = useState(false)
const handleSubmit = async (e) =>{
  e.preventDefault();
  setError(false);
  try {
setIsloading(true)
  const res = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });
  res.data && window.location.replace("/login");
} catch (err){
  setError(true);
  setIsloading(false)
}
}
  return (
    <>
    {isloading ? <LoadingSpinner /> : (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className='registerInput' 
            type="text" 
            placeholder='Enter your Username...' 
            onChange={e => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input className='registerInput' 
            type="text" 
            placeholder='Enter your Email...'
            onChange={e => setEmail(e.target.value)} 
            />
            <label>Password</label>
            <input className='registerInput' 
            type="password" 
            placeholder='Enter your password...'
            onChange={e => setPassword(e.target.value)}
            />
            <button className="registerButton">Register</button>
        </form>
        <button type="submit" className="registerLoginButton">
        <Link className='link' to='/login'>Login</Link>
        </button>
        { error && <span style={{color: "red", marginTop:"10px"}}>Something went Wrong!</span>}
        </div>
    )}
        </>
  )
}
