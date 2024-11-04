import { setMessages } from '@/redux/chatSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UseGetAllMessage = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.auth);
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/message/all/${selectedUser?._id}`, { withCredentials: true });
                if (res.data.success) {  
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllMessage();
    }, [selectedUser]);
}

export default UseGetAllMessage