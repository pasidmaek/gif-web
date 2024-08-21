import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, IconButton } from '@mui/material';
import { GIFImageType, GifType } from '../utils/GIF';
import { useModal } from '../context/modalContext';
import { Favorite } from '@mui/icons-material';
import { useSavedList } from '../context/savedContext';

function CardComponent({ data }: { data: GIFImageType }) {
  const { showModal } = useModal()
  const { state, dispatch } = useSavedList()
  const [isSave, setIsSave] = useState(false)

  const handleOpenModal = () => {
    showModal(data)
  }

  const handleSaveGif = () => {
    dispatch({ type: isSave ? 'UNSAVED_GIF' : 'SAVED_GIF', payload: data })
  }

  useEffect(() => {
    setIsSave(state.save_list.find((image: GIFImageType) => image.id === data.id))
  }, [data, state])

  return (
    <Card sx={{ height: 'fit-content', position: 'relative' }}>
      <CardActionArea onClick={handleOpenModal} sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="auto"
          width="100%"
          sx={{ objectFit: 'cover' }}
          image={data.images.original.url}
          alt={data.title}
        />
      </CardActionArea>
      <IconButton
        className="absolute bottom-0 right-0 z-50"
        aria-label="Add to favorites"
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        onClick={handleSaveGif}
      >
        <Favorite
          color={isSave ? 'error' : 'disabled'}
          sx={{
            '&:hover': {
              color: '#FFA6A1'
            }
          }}
        />
      </IconButton>
    </Card>
  )
}

export default CardComponent