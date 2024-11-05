import { setAuthUser } from '@/redux/authSllice';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, Sidebar, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

import { FcPortraitMode } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import CreatePost from '../postcreate/CreatePost';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';




// const logoutHandler=async()=>{
//     try{
//         const res=await axios.get("http://localhost:4000/api/v1/user/logout",{withCredentials:true});
//         if(res.data.success){
// navigate("/signup");
// toast.success(res.data.message);
//         }


//     }catch(error){
// toast.error(error.res.data.message)
//     }
// }







const Leftsidebar = () => {

    const[open,setopen]=useState(false);

    const{user}=useSelector(store=>store.auth);
    const{likeNotification}=useSelector(store=>store.realTimeNotification);
    console.log(user);
    const dispatch=useDispatch();

    const navigate= useNavigate();

   

    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://logo-social-media.onrender.com/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
            
                navigate("/signup");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    
    
    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        }
      else  if(textType==="Create"){
        setopen(true);
      }else if(textType==="Profile"){
        navigate(`/profile/${user._id}`)
      }else if(textType==="Home"){
        navigate("/")
      }else if(textType==="Messages"){
        navigate("/chat")
      }else if(textType==="Explore"){
        navigate("/explore")
      }
        
    }


    
const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
        icon: (
            <Avatar className='w-6 h-6'>
                <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                <AvatarFallback></AvatarFallback>
            </Avatar>
        ),
        text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },
   
  
]
  return (
    <div className='fixed top-0 z-10 left-0 px-4  border-r border-gray-300 w-[16%] h-screen'>
 <div className='flex flex-col '>
 <h1 className='text-center font-bold text-xl'>LOGO<sub className='text-xs font-light'>made by jaideep</sub></h1>
 <div>
 {
            sidebarItems.map((item,index)=>{
                return(<div onClick={()=>sidebarHandler(item.text)} key={index} className='flex items-center gap-3  relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
          {item.icon}
          <span>{item.text}</span>
         
                </div>)
            })
        }


   
</div>
 </div>
 <CreatePost open={open} setopen={setopen}></CreatePost>
       
    </div>
  )
}

export default Leftsidebar