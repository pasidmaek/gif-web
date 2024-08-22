import { ReactNode, createContext, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GIFImageType } from "../utils/GIF";
import { CardMedia } from "@mui/material";

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
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <div className="flex flex-row space-x-20">
            <CardMedia
              component="img"
              height="120px"
              width="100%"
              sx={{ objectFit: 'cover' }}
              image={data?.images.original.url}
              alt={data?.title}
            />
            {/* <div className="min-w-80">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {data?.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {data?.alt}
              </Typography>
            </div> */}
          </div>
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
