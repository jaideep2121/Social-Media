import Leftsidebar from '@/Componentss/common/Leftsidebar'
import React from 'react'
import { Outlet } from 'react-router'

const Mainlayout = () => {
  return (
    <div>
  <Leftsidebar></Leftsidebar>
 <div>
  <Outlet></Outlet>
 </div>
    </div>
  )
}

export default Mainlayout