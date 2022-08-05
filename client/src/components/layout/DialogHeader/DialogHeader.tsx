import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { styles } from './DialogHeader.styles';

export const DialogHeader = ({ children, onClose }: DialogHeaderProps) => {
  return (
    <DialogTitle sx={styles.root}>
      {children}

      <IconButton sx={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

export interface DialogHeaderProps {
  children: React.ReactNode;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
