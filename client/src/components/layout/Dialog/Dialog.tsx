import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogContent as MuiDialogContent,
} from '@mui/material';

import { DialogHeader } from '~/components/layout/DialogHeader';
import { DialogActions, DialogActionsProps } from '~/components/layout/DialogActions';

export const Dialog = ({ title, buttons, children, onClose, onOk, ...rest }: DialogProps) => {
  const handleOk = () => {
    onOk?.();
    onClose();
  }

  return (
    <MuiDialog {...rest} onClose={onClose}>
      <DialogHeader onClose={onClose}>{title}</DialogHeader>

      <MuiDialogContent>{children}</MuiDialogContent>

      <DialogActions
        buttons={buttons}
        onOk={handleOk}
        onClose={onClose}
      />
    </MuiDialog>
  );
}

export interface DialogProps extends Omit<MuiDialogProps, 'onClose' | 'title'> {
  onOk?: () => void;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  buttons?: DialogActionsProps['buttons'] | undefined;
}
