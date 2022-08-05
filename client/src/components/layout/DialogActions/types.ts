import { ButtonProps } from '@mui/material';

export interface ActionButton extends ButtonProps {
  /**
   * @default true
   */
  closeOnClick?: boolean | undefined;
}
