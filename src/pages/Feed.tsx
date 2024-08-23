import React, { useCallback, useEffect, useState } from 'react'
import { useAlert } from '../context/alertContext';
import { GIFImageType } from '../utils/GIF';
import { fetchGifSearch, fetchGifTrending } from '../services/fetchGifImage';
import { Skeleton } from '@mui/material';
import CardComponent from '../component/CardComponent';
import useDebounce from '../hook/debounceHook';

function Feed() {

  const { showAlert } = useAlert()
  const [lists, setLists] = useState<GIFImageType[]>([])
  const [page, setPage] = useState<number>(0)
  const [searchWord, setSearchWord] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const debouncedSearch = useDebounce(searchWord, 500);


  const fetchData = async (word?: string, offset: number = 0) => {
    try {
      const result = word ? await fetchGifSearch(word, offset) : await fetchGifTrending(offset);
      if (result.status === 200) {
        setLists(prev => (offset === 0 ? result.data : [...prev, ...result.data]));
      } else {
        showAlert({ message: result.message, type: "error" });
      }
    } catch (e) {
      showAlert({ message: "Loading error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(debouncedSearch, nextPage);
  };

  const searchData = useCallback((word: string) => {
    setSearchWord(word);
    setPage(0)
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData(debouncedSearch, 0);
  }, [debouncedSearch]);

  return (
    <div className='p-6'>
      <input type="search" id="search-gif" className="hidden w-full p-4 ps-10 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search GIF..." onChange={(e) => searchData(e.target.value)} />
      <div className='flex justify-center'>
        <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8'>
          {loading ? (
            Array.from(new Array(25)).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="190px" height={140} />
            ))
          ) : lists.length !== 0 ? (
            <>
              {
                lists.map((data: GIFImageType, index: number) => (
                  <CardComponent data={data} key={data.id + index} />
                ))
              }
              <button
                onClick={handleFetchMore}
                className='col-span-full mt-4 text-lg font-semibold text-blue-600'>
                See more
              </button>
            </>
          ) : (
            <span className='text-3xl font-bold w-full h-full col-span-full'>
              No data
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed