import React, { useContext, useEffect, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
import fetchReducer, { initialState } from './services/fetchData';
import axios from 'axios';
import { SavedContext } from './context/savedContext';
import { useAlert } from './context/alertContext';
import CardComponent from './component/CardComponent';
import { GifType } from './utils/GIF';

function App() {

  //TODO: set reducer for fetch data and add skeleton

  const { showAlert } = useAlert()
  const [lists, setLists] = useState([])
  // const [searchLists, setSearchLists] = useState([])
  // const [state, dispatch] = useReducer(fetchReducer, initialState)
  // const { data } = useContext(SavedContext) ?? { data: [] };
  // console.log(data)
  const fetchData = async () => {
    try {
      const res = await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=3q5pxzLsape8AUyfllbZqHp7mTar7osz&limit=25&offset=0&rating=g&bundle=messaging_non_clips')
      // console.log(res.data)
      setLists(res.data.data)
      // return res
      return null
    } catch (e) {
      console.log(e)
    }
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
          lists.map((data: GifType) => {
            return (
              <CardComponent data={data} key={data.id} />)
          }) :
          <p>No data</p>
        }
      </div>
    </>
  );
}

export default App;
