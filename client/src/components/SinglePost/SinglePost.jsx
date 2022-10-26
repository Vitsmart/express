import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../context/Context';
import './SinglePost.css'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})

  const pf = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [isloading, setIsloading] = useState(false)


  useEffect(()=>{
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    };
    getPost()
  },[path])
  
  const handleDelete = async () =>{
    try {
      setIsloading(true)
    await axios.delete(`/posts/${post._id}` ,{data: {username: user.username},
  })
    window.location.replace("/");
    }catch(err) {}
    setIsloading(false)
  }
  const handleUpdate = async () => {
    try {
      setIsloading(true)
      await axios.put(`/posts/${post._id}`,{username: user.username, title, desc},
    )
      //window.location.reload();
      setUpdateMode(false)
      
      }catch(err) {}
      setIsloading(false)
  };



  return (
    <>
    {isloading ? <LoadingSpinner /> : 
    <div className='singlePost'>
        <div className="singlePostWrapper">
          {post.photo && (
            <img src={pf + post.photo}
            alt='' 
            className='singlePostImg' />
            )}
            {updateMode ? (
              <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)}/>
            ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
            <div className="singlePostEdit">
            <i className="singlePostIcon fa-sharp fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
            <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
             </div> 
             )}    
            </h1>
            )};
            
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author: 
                <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
                </Link>
              
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
              <textarea className='singlePostDescInput' value={desc} onChange = {(e) => setDesc(e.target.value)}
              />
            ) : (
              <p className='singlePostDesc'>
              {desc}
              </p>
            )}
            {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate} disabled={isloading}>Update</button>
            )}
        
        </div>
            
    </div>
}
    </>
  )
            
}
