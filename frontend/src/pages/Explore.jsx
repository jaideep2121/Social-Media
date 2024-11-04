import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Explore = () => {
  return (
<div className='max-w-screen max-h-screen flex justify-center items-center gap-10'>
    <h1 className='font-semibold text-6xl'>Coming Soon...</h1>
    <Link to="/">
    <Button>GO TO HOMEPAGE</Button>
    </Link>
   
</div>
  )
}

export default Explore