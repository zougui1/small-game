import {
  Button,
  DialogActions as MuiDialogActions,
  DialogActionsProps as MuiDialogActionsProps,
} from '@mui/material';

import { getActionButtons } from './utils';
import type { ActionButton } from './types';

export const DialogActions = ({ buttons, onClose, onOk, ...rest }: DialogActionsProps) => {
  const actionButtons = getActionButtons(buttons);

  const handleClick = (button: ActionButton & { key: string }) => (e: React.MouseEvent<HTMLButtonElement>) => {
    button.onClick?.(e);
    const closeOnClick = button.closeOnClick ?? true;

    if (!e.isDefaultPrevented() && closeOnClick) {
      if (button.key === 'ok') {
        onOk();
      } else {
        onClose();
      }
    }
  }

  return (
    <MuiDialogActions {...rest}>
      {actionButtons.map(({ closeOnClick, ...button }) => (
        <Button
          {...button}
          key={button.key}
          onClick={handleClick({ ...button, closeOnClick }) as React.MouseEventHandler}
        >
          {button.children}
        </Button>
      ))}
    </MuiDialogActions>
  );
}

export interface DialogActionsProps extends MuiDialogActionsProps {
  onClose: () => void;
  onOk: () => void;
  buttons?: Record<string, ActionButton | null | undefined> | undefined;
}
