import { createSlice } from "@reduxjs/toolkit";
import reducer from "./authSllice";


const socketSlice=createSlice({
    name:"socket.io",
    initialState:{
        socket:null
    },
   reducers:{
    setSocket:(state,action)=>{
  state.socket=action.payload;
    }
   }
});

export const {setSocket}= socketSlice.actions;
export default socketSlice.reducer;