import { Button } from '@mui/material'
import React from 'react'

function Header() {
  return (
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
  )
}

export default Header