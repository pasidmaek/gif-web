import React, { Suspense, useEffect, useState } from 'react'
import SavedContextProvider from '../context/savedContext'
import CardComponent from '../component/CardComponent'
import { GIFImageType } from '../utils/GIF'

function Saved() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const result = localStorage.getItem('saveList')
    if (result) {
      setLists(JSON.parse(result))
    }

  }, [])
  return (
    <div className='grid grid-rows-12 md:grid-rows-5 sm:grid-rows-12 grid-flow-col gap-4 p-6'>
      {lists ?
        lists.map((data: GIFImageType) => {
          return (
            <SavedContextProvider>
              <Suspense fallback={<p>Loading...</p>} key={data.id}>
                <CardComponent data={data} />
              </Suspense>
            </SavedContextProvider>
          )
        }) :
        <p>No data</p>
      }
    </div>
  )
}

export default Saved