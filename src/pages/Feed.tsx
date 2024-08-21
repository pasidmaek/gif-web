import React, { Suspense, useEffect, useState } from 'react'
import { useAlert } from '../context/alertContext';
import { GIFImageType } from '../utils/GIF';
import { fetchGifTrending } from '../services/fetchGifImage';
import SavedContextProvider from '../context/savedContext';
import CardComponent from '../component/CardComponent';

function Feed() {

  const { showAlert } = useAlert()
  const [page, setPage] = useState(1);
  const [lists, setLists] = useState<GIFImageType[]>([])

  const fetchData = async () => {
    try {
      const result = await fetchGifTrending()
      setLists(result.data)
    } catch (e) {
      showAlert({ message: "Loading error", type: "error" })
    }
  }

  useEffect(() => {
    fetchData()
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

export default Feed