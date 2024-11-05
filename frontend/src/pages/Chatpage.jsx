import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Messages from '@/Componentss/Chat/Messages';
import { setSelectedUser } from '@/redux/authSllice';
import { setMessages } from '@/redux/chatSlice';
import axios from 'axios';
import { MessageCircleCode } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Chatpage = () => {
    const { user, suggestedUsers,selectedUser } = useSelector(store => store.auth);
  
    const dispatch=useDispatch();
    const{onlineUsers}=useSelector(store=>store.chat);
    const[text,settext]=useState("");
    const{messages}=useSelector(store=>store.chat);

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);

    async function sendhandler(receiverId){
        try{
            const res=await axios.post(`https://logo-social-media.onrender.com/api/v1/message/send/${receiverId}`,{text},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setMessages([...messages,res?.data?.newMessage]));
                settext("");
               
            }

        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        return()=>{
            dispatch(setSelectedUser(null));
        }
    },[])

  return (
    <div className='flex ml-[16%] h-screen'>
    <section className='w-full md:w-1/4 my-8'>
        <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
        <hr className='mb-4 border-gray-300' />
        <div className='overflow-y-auto h-[80vh]'>
            {
                suggestedUsers.map((suggestedUser,index) => {

                    const isOnline=onlineUsers.includes(suggestedUser?._id)
                 
                    return (
                        <div onClick={() => dispatch(setSelectedUser(suggestedUser))} key={index} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                            <Avatar className='w-14 h-14'>
                                <AvatarImage src={suggestedUser?.profilePicture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span className='font-medium'>{suggestedUser?.username}</span>
                                <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>{isOnline ? 'online' : 'offline'}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </section>
    {
    selectedUser ? (
            <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                    <Avatar>
                        <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span>{selectedUser?.username}</span>
                    </div>
                </div>
              <Messages selectedUser={selectedUser}></Messages>
                <div className='flex items-center p-4 border-t border-t-gray-300'>
                    <Input  type="text" onChange={(e)=>settext(e.target.value)} className='flex-1 mr-2 focus-visible:ring-transparent'  value={text}  placeholder="Messages..." />
                    <Button onClick={()=>sendhandler(selectedUser?._id)}>Send</Button>
                </div>
            </section>
        ) : (
            <div className='flex flex-col items-center justify-center mx-auto'>
                <MessageCircleCode className='w-32 h-32 my-4' />
                <h1 className='text-center font-bold text-xl'>LOGO<sub className='text-xs font-light'>made by jaideep</sub></h1>
                <span>Send a message to start a chat...</span>
            </div>
        )
    }
</div>
)
  
}

export default Chatpage