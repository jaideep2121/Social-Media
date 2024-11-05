import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import React, { useState } from "react";
import Commentdialog from "./Commentdialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

import { Badge } from "@/components/ui/badge";
import { GoBookmark } from "react-icons/go";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { GoBookmarkFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { setPosts ,setSelectedPost} from "@/redux/rost.Slice";

const Pos = ({ post }) => {
  const [text, settext] = useState("");
  const [open, setopen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.rost);
  const dispatch = useDispatch();
  const [liked, setliked] = useState(post.likes.includes(user?._id) || false);
  const [postlike, setpostlike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const [marked, setmarked] = useState(false);

  function changehandler(e) {
    const inputtext = e.target.value;
    if (inputtext.trim()) {
      settext(inputtext);
    } else {
      settext("");
    }
  }

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `https://logo-social-media.onrender.com/api/v1/post/delete/${post?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatedPostData));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messsage);
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
        const action = liked ? 'dislike' : 'like';
        const res = await axios.get(`https://logo-social-media.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
        console.log(res.data);
        if (res.data.success) {
            const updatedLikes = liked ? postlike - 1 : postlike + 1;
            setpostlike(updatedLikes);
            setliked(!liked);

            // apne post ko update krunga
            const updatedPostData = posts.map(p =>
                p._id === post._id ? {
                    ...p,
                    likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                } : p
            );
            dispatch(setPosts(updatedPostData));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}
  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `https://logo-social-media.onrender.com/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        settext("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `https://logo-social-media.onrender.com/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setmarked(!marked)
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
       
       <Link to={`/profile/${post?.author?._id}`}>
        
       <Avatar>
            <AvatarImage
              src={post?.author?.profilePicture}
              alt="post"
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
       </Link>
       <Link to={`/profile/${post?.author?._id}`}>
          <h1>{post?.author?.username}</h1>
          {user?._id === post?.author?._id && (
            <Badge variant="secondary">Author</Badge>
          )}
          </Link>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer"></MoreHorizontal>
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to favorites
            </Button>
            {user && user?._id === post?.author?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit "
                onClick={deletePostHandler}
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="postimage"
      ></img>

      <div className="">
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            {liked ? (
              <FaHeart
                size={"22px"}
                onClick={likeOrDislikeHandler}
                className="cursor-pointer text-red-600"
              ></FaHeart>
            ) : (
              <FaRegHeart
                size={"22px"}
                onClick={likeOrDislikeHandler}
                className="cursor-pointer hover:text-gray-600"
              ></FaRegHeart>
            )}
            <MessageCircle
              className="cursor-pointer hover:text-gray-600"
              onClick={() => {
                dispatch(setSelectedPost(post));
                setopen(true);
              }}
            ></MessageCircle>
            <Send className="cursor-pointer hover:text-gray-600"></Send>
          </div>
          {marked ? (
            <GoBookmarkFill
              size={"28px"}
              className="cursor-pointer "
              onClick={bookmarkHandler}
            ></GoBookmarkFill>
          ) : (
            <GoBookmark
              size={"28px"}
              className="cursor-pointer hover:text-gray-600 "
              onClick={bookmarkHandler}
            ></GoBookmark>
          )}
        </div>
      </div>
      <span className="font-medium block mb-2 ">{postlike} likes</span>
      <p className="">
        <span className="font-medium mr-2 ">{post?.author?.username}</span>
        {post.caption}
      </p>
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setopen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          view all {comment.length} comment
        </span>
      )}
      <Commentdialog open={open} setopen={setopen}></Commentdialog>
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment... "
          className="outline-none text-sm w-full"
          value={text}
          onChange={changehandler}
        ></input>
        {text && (
          <span
            className="text-[#3BADF8] cursor-pointer"
            onClick={commentHandler}
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Pos;
