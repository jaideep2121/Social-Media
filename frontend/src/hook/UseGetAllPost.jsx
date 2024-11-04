import { setPosts } from "@/redux/PostSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseGetAllPost = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const Fetchalpost = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/post/all", {
          withCredentials: true,
        });
        if (res.data.success) {
            console.log(res.data.posts);
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    Fetchalpost();
  }, []);
};

export default UseGetAllPost;
