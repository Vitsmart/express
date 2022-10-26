import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'

export default function Post({post}) {

  const pf = "https://noble-express.herokuapp.com/images/";
  return (
    <div className='post'>
        {post.photo && (
        <img 
        className='postImg'
        src={pf + post.photo}
        alt='blogimage'
        />
        )}
        <div className="postInfo">
            <div className="postCats">
                {post.categories.map((c) => (
                <span className="postCat">{c.name}</span>
                ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">
                {post.title}
            </span>
            </Link>
            
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">
           {post.desc}
        </p>
    </div>
  )
}
