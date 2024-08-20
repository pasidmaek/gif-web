import { ReactNode, createContext, useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GIFImageType, GifType } from "../utils/GIF";
import './modal.css';

type ModalContextType = {
  showModal: (data: GIFImageType) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: ReactNode;
};

function ModalContextProvider({ children }: ModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<GIFImageType | null>(null)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showModal = (data: GIFImageType) => {
    setData(data)
    handleOpen()
  };

  //TODO: set modal view

  return (
    <ModalContext.Provider value={{ showModal }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      {children}
    </ModalContext.Provider >
  );
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within an AlertProvider');
  }
  return context;
};


export default ModalContextProvider;
