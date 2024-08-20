import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { GifType } from '../utils/GIF';
import { useModal } from '../context/modalContext';
import { fetchGIFById } from '../services/fetchData';

export default function CardIDComponent({ id }: { id: string }) {
  // console.log(id)
  const [gifData, setGifData] = useState<GifType | null>(null)

  const fetchData = useCallback(async () => {
    const res = await fetchGIFById(id)
    setGifData(res)
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  // const { showModal } = useModal()

  // const handleOpenModal = () => {
  //   showModal(data.data)
  // }
  return (
    // <CardActionArea onClick={handleOpenModal}>
    //   <CardMedia
    //     component="img"
    //     height={data.data.images.original.height}
    //     width={data.data.images.original.width}
    //     className='justify-center items-center'
    //     image={data.data.images.original.url}
    //     alt={data.data.title}
    //   />
    // </CardActionArea>
    <p>{id}</p>
  )
}
