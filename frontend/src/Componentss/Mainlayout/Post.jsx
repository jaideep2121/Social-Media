import React from 'react'
import Pos from './Pos'
import { useSelector } from 'react-redux'

const Post = () => {
  const {posts}=useSelector(store=>store.rost);
  return (
    <div>
        {
          posts.map((post,index)=>{
            return <Pos key={post._id} post={post}></Pos>
          })
        }
    </div>
  )
}

export default Post