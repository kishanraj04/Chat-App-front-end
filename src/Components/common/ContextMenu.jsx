import React from 'react'

function CustomContextMenu() {
  return (
    <div className='h-[10rem] w-[10rem] bg-amber-300'>
        <div className='flex flex-col overflow-y-scroll'>
            {
                [1,2,3,4,5].map((data)=><p>{data}</p>)
            }
        </div>
    </div>
  )
}

export default CustomContextMenu