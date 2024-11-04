import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import UseGetUserProfile from '@/hook/UseGetUserProfile'
import axios from 'axios'
import { AtSign, Heart, MessageCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const Profile = () => {
  const params=useParams();
  const userId=params.id;
  UseGetUserProfile(userId);

  const{userProfile,user}=useSelector(state=>state.auth);
  console.log(user);
 
  const isLoggedInUserProfile = user?._id===userProfile?._id;
  const following=user?.followers.includes(params.id)
  console.log(following);
  
  const[active,setactive]=useState('posts');

  function handlechange(tab){
setactive(tab);
  }

  const displayedPost=active==='posts'?userProfile?.posts:userProfile?.bookmarks;

 async function followunfollow(){
  try{
    const res = await axios.get(
      `https://logo-media-i3uh.onrender.com/api/v1/user/followorunfollow/${params.id}`,
     
     {
        withCredentials: true,
     }
    );
    if(res.data.success){
      toast.success(res?.data?.message);
    }

  }catch(error){
    console.log(error);

  }
 }

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8 ">
        <div className="grid grid-cols-2 ">
          <section className="flex justify-center items-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={userProfile?.profilePicture}></AvatarImage>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5 ">
              <div className="flex gap-2  items-center">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit profile
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      View archive
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      Ad tools
                    </Button>
                  </>
                ) : following ? (
                  <>
                    <Button variant="secondary" className="h-8 text-black" onClick={followunfollow}>
                      follow
                    </Button>
                    <Link to="/chat">
                    <Button className="h-8 bg-[#0095F6] hover:bg-[#3192d2]">
                      Message
                    </Button>
                    </Link>
                   
                  </>
                ) : (
                  <>
                  <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8 " onClick={followunfollow}>
                    follow
                  </Button>
                  <Link to="/chat">
                    <Button className="h-8 bg-[#0095F6] hover:bg-[#3192d2]">
                      Message
                    </Button>
                    </Link>

                  </>
                )}
              </div>
              <div className='flex items-center gap-4'>
              <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                <Badge className='w-fit' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
                
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
        <div className='flex items-center justify-center gap-10 test-sm'>
        <span className={`py-3 cursor-pointer ${active==='posts'?'font-bold':''}`} onClick={()=>handlechange('posts')}>POSTS</span>
        <span className={`py-3 cursor-pointer ${active==='saved'?'font-bold':''}`} onClick={()=>handlechange('saved')}>SAVED</span>
        <span className={`py-3 cursor-pointer ${active==='reels'?'font-bold':''}`} onClick={()=>handlechange('reels')}>REELS</span>
        <span className={`py-3 cursor-pointer ${active==='tag'?'font-bold':''}`} onClick={()=>handlechange('tag')}>TAGS</span>

        </div>
        <div className='grid grid-cols-3 gap-1'>
            {
              displayedPost?.map((post) => {
                return (
                  <div key={post?._id} className='relative group cursor-pointer'>
                    <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center text-white space-x-4'>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <Heart />
                          <span>{post?.likes?.length}</span>
                        </button>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <MessageCircle />
                          <span>{post?.comments?.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile