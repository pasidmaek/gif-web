import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, IconButton } from '@mui/material';
import { GIFImageType } from '../utils/GIF';
import { useModal } from '../context/modalContext';
import { Favorite } from '@mui/icons-material';
import SavedContextProvider, { useSavedList } from '../context/savedContext';
import { useAlert } from '../context/alertContext';

type CardType = {
  data: GIFImageType
  onUnSave?: () => void
}

function CardComponent({ data, onUnSave }: CardType) {
  const { showModal } = useModal()
  const { showAlert } = useAlert()
  const { state, dispatch } = useSavedList()
  const [isSave, setIsSave] = useState(false)

  const handleOpenModal = () => {
    showModal(data)
  }

  const handleSaveGif = () => {
    dispatch({ type: isSave ? 'UNSAVED_GIF' : 'SAVED_GIF', payload: data })
    isSave ?
      showAlert({ message: `${data.title} was unsaved`, type: 'error' })
      :
      showAlert({ message: `${data.title} was saved`, type: 'success' })
    if (isSave && onUnSave) {
      onUnSave()
    }
  }

  useEffect(() => {
    setIsSave(state.save_list.find((image: GIFImageType) => image.id === data.id))
  }, [data, state])

  return (
    <SavedContextProvider>
      <Card sx={{ height: 'fit-content', width: '190px', position: 'relative' }}>
        <CardActionArea onClick={handleOpenModal} sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="120px"
            width="100%"
            sx={{ objectFit: 'cover' }}
            image={data.images.original.url}
            alt={data.title}
          />
        </CardActionArea>
        <IconButton
          aria-label="Add to favorites"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSaveGif();
          }}
        >
          <Favorite
            color={isSave ? 'error' : 'disabled'}
            sx={{
              '&:hover': {
                color: '#FFA6A1',
              },
            }}
          />
        </IconButton>
      </Card>
    </SavedContextProvider>
  );
}


export default CardComponent