import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/rost.Slice";

const Commentdialog = ({open,setopen}) => {

  const { user } = useSelector((store) => store.auth);
  const { selectedPost ,posts} = useSelector((store) => store.rost);
    const[text,settext]=useState("");
    const [comment, setComment] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
      if (selectedPost) {
        setComment(selectedPost.comments);
      }
    }, [selectedPost]);

    function changehandler(e){
        const input=e.target.value;
        if(input.trim()){
            settext(input);
        }else{
            settext("")
        }
    }

     

    const sendMessageHandler = async () => {

      try {
        const res = await axios.post(`https://logo-social-media.onrender.com/api/v1/post/${selectedPost?._id}/comment`, { text }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
  
        if (res.data.success) {
          const updatedCommentData = [...comment, res.data.comment];
          setComment(updatedCommentData);
  
          const updatedPostData = posts.map(p =>
            p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
          );
          dispatch(setPosts(updatedPostData));
          toast.success(res.data.message);
          settext("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setopen(false)}
        className="max-w-3xl p-0 flex flex-col"
      >
        <div className="flex flex-1">
          <div className="w-1/2 ">
            <img
              className="h-full w-full object-contain rounded-l-lg"
              src={selectedPost?.image}
              alt="postimage"
            ></img>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} alt="post"></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>

                <div>
                  <Link className="font-semibold text-xs">{selectedPost?.author?.username}</Link>
                  {/* <span className="text-gray-600 text-sm">bio here</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer"></MoreHorizontal>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-end text-center text-sm">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full ">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr></hr>
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
             {
              comment.map((comment)=><Comment key={comment._id} comment={comment}></Comment>)
             }
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="text"
                placeholder="comment..."
                className="w-full outline-none border border-gray-300 p-2 rounded"
                onChange={changehandler}
                value={text}
              ></input>
              <Button onClick={sendMessageHandler} disabled={!text.trim()}>Send</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Commentdialog;
