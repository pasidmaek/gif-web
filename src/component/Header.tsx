import React from 'react'
import { Link } from 'react-router-dom'
import { useSavedList } from '../context/savedContext'

function Header() {
  const { state } = useSavedList()
  const pathname = window.location.pathname;

  const handleOpenSearch = () => {
    const searchBar = document.getElementById("search-gif")
    if (searchBar) {
      if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block'
      } else {
        searchBar.style.display = 'none'
      }
    }
  }

  return (
    <nav className=" border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GIF Searcher</span>
        </Link>
        <div className=" w-full block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {pathname === '/' && (
              <li>
                <button
                  type="button"
                  onClick={handleOpenSearch}
                  className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                  Search
                </button>
              </li>
            )}
            <li>
              <Link to="/save">
                <button
                  type="button"
                  className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                  {`Saved(${state.save_list.length})`}
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header