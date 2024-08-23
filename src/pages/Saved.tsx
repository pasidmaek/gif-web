import React, { useEffect, useState } from 'react'
import CardComponent from '../component/CardComponent'
import { GIFImageType } from '../utils/GIF'
import { Skeleton } from '@mui/material'

function Saved() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  const handleUnsave = () => {
    fetchSaveGif()
  }

  const fetchSaveGif = () => {
    const result = localStorage.getItem('saveList')
    if (result) {
      setLists(JSON.parse(result))
    } else {
      setLists([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSaveGif()
  }, [localStorage.getItem('saveList')])

  return (
    <div className='p-6 flex justify-center'>
      <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-rows gap-8'>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="190px" height={140} />
          ))
        ) : lists.length !== 0 ? (
          lists.map((data: GIFImageType) => (<CardComponent data={data} key={data.id} onUnSave={handleUnsave} />))
        ) : (
          <span className='text-3xl font-bold w-full h-full col-span-full'>
            No GIF was saved
          </span>
        )
        }
      </div>
    </div>
  )
}

export default Saved