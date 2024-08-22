import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSavedList } from '../context/savedContext'

function Header() {
  const { state } = useSavedList()

  return (
    <header className="App-header">
      <Link to="/">GIF Searcher</Link>
      <div className='flex gap-4'>
        <Button variant="contained">
          Search
        </Button>
        <Button variant="contained">
          <Link to="/save">{`Saved(${state.save_list.length})`}</Link>
        </Button>
      </div>
    </header >
  )
}

export default Header