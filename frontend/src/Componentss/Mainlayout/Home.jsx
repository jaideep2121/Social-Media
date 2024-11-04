import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router'
import RightSidebar from '../common/RightSidebar'
import UseGetAllPost from '@/hook/UseGetAllPost'
import useGetSuggestedUsers from '@/hook/UseGetSuggestedUser'

const Home = () => {
  UseGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className='flex'>
    <div className='flex-grow'>
    <Feed></Feed>
    <Outlet></Outlet>
    </div>
    <RightSidebar></RightSidebar>
       
    </div>
  )
}

export default Home