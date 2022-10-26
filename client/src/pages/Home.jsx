
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../components/config'
import Header from '../components/header/Header'
import Posts from '../Posts/Posts'
import SideBar from '../SideBar/SideBar'
import './Home.css'

export default function Home() {
const [posts, setPosts] = useState([]);
const {search} = useLocation();

useEffect(() => {
  const fetchPosts = async () =>{
    const res = await axiosInstance.get("/posts"+ search)
    setPosts(res.data)
  }
  fetchPosts()
},[search])

  return (
    <>
        <Header />
    <div className='home'>
     
        <Posts posts={posts} />
        <SideBar />
        </div>
        </>
  )
}
