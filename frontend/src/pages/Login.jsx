import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { toast } from 'sonner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSllice';

const Login = () => {

    const dispatch = useDispatch();
    const[off,seton]=useState(true);
    const[loading,setloading]= useState(false);
    const{user}=useSelector(store=>store.auth);

    const [input,setInput]=useState({
      
        email:"",
        password:"",
    });

    function handler3(e){
        setInput({...input,[e.target.name]:e.target.value})
    }

    const navigate=useNavigate();


    useEffect(()=>{
if(user){
    navigate("/")
}
    },[])



const Loginhandler = async (e) => {
    e.preventDefault();
    try {
        setloading(true);
        
        const res = await axios.post('http://localhost:4000/api/v1/user/login', input, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log(res);
        if (res?.data.success) {
            dispatch(setAuthUser(res?.data.user))
            navigate("/");
           
            toast.success(res?.data.message);
            setInput({
                username: "",
                email: "",
                password: ""
            });
        }
    } catch (error) {
        console.log(error);
        toast.error("failed to Login")
    } finally{
        setloading(false);
    }
}
    console.log(input);
  
  return (
    <div className='flex items-center justify-center h-screen w-screen '>
    <form onSubmit={Loginhandler} className='shadow-xl flex flex-col gap-5 p-8'>
        <div>
        <h1 className='text-center font-bold text-xl'>LOGO<sub className='text-xs font-light'>made by jaideep</sub></h1>
        <p className='text-sm text-center'>Signup to see Photos and Videos from your Friend</p>

        </div>
   
        <div>
            <Label className=" font-medium">Email</Label>
            <Input type="text" name="email"  className=" focus-visible:ring-transparent my-2" 
            value={input.email} onChange={handler3}>

            </Input>
        </div>
        <div className='relative'>
            <Label className=" font-medium ">Password</Label>
            <Input type={
                off?("password"):("text")
            } name="password" className=" focus-visible:ring-transparent my-2" value={input.password} onChange={handler3}></Input>
            <span onClick={()=>seton((prev)=>!prev)}  className=" absolute top-11 right-2">
                {
                    off?(<IoEyeOff></IoEyeOff>):(<IoEye></IoEye>)
                }
            </span>
        </div>

   
        {
            loading?(<Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'>Please Wait</Loader2>
            </Button>):(     <Button type='submit' >Login</Button>)
        }

        <Link to="/signup" >
<span className='text-center mr-1'>Don't have Account?</span>
<span className='text-blue-600'> Signup</span>
</Link>
      
    </form>

    </div>

  )
}

export default Login