
import { setSuggestedUsers } from "@/redux/authSllice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get('https://logo-social-media.onrender.com/api/v1/user/suggested', { withCredentials: true });
                console.log(res);
                if (res.data.success) { 

                    dispatch(setSuggestedUsers(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSuggestedUsers();
    }, []);
};
export default useGetSuggestedUsers;