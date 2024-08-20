import React, { Suspense, useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { GIFImageType, GifType } from '../utils/GIF';
import { useModal } from '../context/modalContext';

function CardComponent({ data }: { data: GIFImageType }) {
  const { showModal } = useModal()

  const handleOpenModal = () => {
    showModal(data)
  }
  
  return (
    <Suspense fallback={<p>Loading</p>}>
      <CardActionArea onClick={handleOpenModal}>
        <CardMedia
          component="img"
          height={data.images.original.height}
          width={data.images.original.width}
          className='justify-center items-center'
          image={data.images.original.url}
          alt={data.title}
        />
      </CardActionArea>
    </Suspense>
  )
}

export default CardComponent