import React, { Suspense, useContext, useEffect, useReducer, useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { useAlert } from './context/alertContext';
import CardComponent from './component/CardComponent';
import { GIFImageType, GifType } from './utils/GIF';
import { fetchGIFTrending } from './services/fetchGIFImage';
import fetchReducer, { fetchInitialState } from './services/fetchReducer';
import savedReducer, { initialSavedState } from './services/savedReducer';

function App() {
  const { showAlert } = useAlert()
  const [lists, setLists] = useState([])
  const [state, dispatch] = useReducer(savedReducer, initialSavedState)
  // const [searchLists, setSearchLists] = useState([])
  // const { dispatch } = useReducer(fetchReducer, fetchInitialState)s
  // const { data } = useContext(SavedContext) ?? { data: [] };
  // console.log(data)
  const fetchData = async () => {
    const result = await fetchGIFTrending()
    setLists(result.data)
    dispatch({ type: 'FETCH_SUCCESS', payload: result.data })

  }

  useEffect(() => {
    fetchData()
    // localStorage.setItem('saved-GIF', JSON.stringify({ data: [] }))
    // showAlert({ type: "success", message: "success" })
  }, [])

  return (
    <>
      <header className="App-header">
        <h1>GIF Searcher</h1>
        <div>
          <Button>
            Search
          </Button>
          <Button>
            {/* {`Save${data.length ? `(${data.length})` : ''}`} */}
            Save
          </Button>
        </div>
      </header>
      <div className='grid grid-rows-12 md:grid-rows-5 sm:grid-rows-12 grid-flow-col gap-4 p-6'>
        {lists ?
          lists.map((data: GIFImageType) => {
            return (
              <Suspense fallback={<p>Loading...</p>} key={data.id}>
                <CardComponent data={data} key={data.id} />
                {/* <CardIDComponent id={data.id} key={data.id}/> */}
              </Suspense>
            )
          }) :
          <p>No data</p>
        }
      </div>
      <Button className='flex w-full items-center justify-center'>See more</Button>
    </>
  );
}

export default App;
