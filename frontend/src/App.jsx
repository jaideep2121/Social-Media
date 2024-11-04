import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Button } from "./components/ui/button"
import Mainlayout from "./pages/Mainlayout"
import Profile from "./Componentss/Mainlayout/Profile"

import { useEffect, useState } from "react"
import Home from "./Componentss/Mainlayout/Home"
import Editprofile from "./Componentss/Editprofile/Editprofile"
import Chatpage from "./pages/Chatpage"
import Explore from "./pages/Explore"
import {io} from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { setSocket } from "./redux/SocketSlice"
import { setOnlineUsers } from "./redux/chatSlice"
import { setLikeNotification } from "./redux/rtnSlice"
import ProtectedRoutes from "./Componentss/common/ProtectedRoute"







function App() {
  const{user}= useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const{socket}=useSelector(store=>store.socketio)


  useEffect(() => {
    if (user) {
      const socketio = io('https://logo-media-i3uh.onrender.com', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);







  return (
<div>

{/* <Login></Login> */}
{/* <Signup></Signup> */}
<Routes>

<Route path="/" element=  <ProtectedRoutes><Mainlayout></Mainlayout></ProtectedRoutes>>
<Route path="/" element= <ProtectedRoutes> <Home></Home></ProtectedRoutes>></Route>
  <Route path="/profile/:id" element= <ProtectedRoutes><Profile></Profile></ProtectedRoutes>></Route>
  <Route path="/account/edit" element={<Editprofile></Editprofile>}></Route>
  <Route path="/chat" element={<Chatpage></Chatpage>}></Route>
</Route>

  <Route path="/signup" element={<Signup></Signup>}></Route>
  <Route path="/login" element={<Login></Login>}></Route>
  <Route path="/explore"  element={<Explore></Explore>}></Route>
</Routes>
</div>
  )
}

export default App
