import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAlert } from '../context/alertContext';
import { GIFImageType } from '../utils/GIF';
import { fetchGifSearch, fetchGifTrending } from '../services/fetchGifImage';
import { Skeleton, TextField } from '@mui/material';
import CardComponent from '../component/CardComponent';
import useDebounce from '../hook/debounceHook';

function Feed() {

  const { showAlert } = useAlert()
  const [lists, setLists] = useState<GIFImageType[]>([])
  const [searchWord, setSearchWord] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const debouncedSearch = useDebounce(searchWord, 500);


  const fetchData = async (word?: string) => {
    try {
      const result = word ? await fetchGifSearch(word) : await fetchGifTrending();
      if (result.status === 200) {
        setLists(result.data);
      } else {
        showAlert({ message: result.message, type: "error" });
      }
    } catch (e) {
      showAlert({ message: "Loading error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const searchData = useCallback((word: string) => {
    setSearchWord(word);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData(debouncedSearch);
  }, [debouncedSearch]);

  const memoizedList = useMemo(() => lists, [lists]);

  return (
    <div className='p-6'>
      <TextField
        id="search-gif"
        fullWidth
        placeholder="Search"
        variant="outlined"
        sx={{ borderRadius: 20, marginBottom: 4 }}
        value={searchWord}
        onChange={(e) => searchData(e.target.value)}
      />
      <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-flow-rows gap-4'>
        {loading ? (
          Array.from(new Array(25)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="190px" height={140} />
          ))
        ) : (
          memoizedList.map((data: GIFImageType) => (
            <CardComponent data={data} key={data.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Feed