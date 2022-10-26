import React from 'react'
import Post from '../post/Post'
import './Posts.css'

export default function Posts({posts}) {
  return (
    <div className='posts'>
        {posts.map((p) => (
          <Post post={p} key={p.id}/>
        ))}
    </div>
  )
}
