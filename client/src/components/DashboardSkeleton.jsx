import React from 'react'

const DashboardSkeleton = () => {
  return (
    <div className='grid md:grid-cols-2 gap-4 mt-10'>
        <div className='w-full h-[20rem] bg-gray-300 animate-pulse rounded-md'></div>
        <div className='w-full h-[20rem] bg-gray-300 animate-pulse rounded-md'></div>
        <div className='w-full h-[20rem] bg-gray-300 animate-pulse rounded-md'></div>
        <div className='w-full h-[20rem] bg-gray-300 animate-pulse rounded-md'></div>
    </div>
  )
}

export default DashboardSkeleton