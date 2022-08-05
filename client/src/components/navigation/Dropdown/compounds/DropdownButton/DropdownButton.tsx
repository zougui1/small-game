import { Button, ButtonProps } from '@mui/material';

import { useDropdownActions, useDropdownSelector } from '../../context';

export const DropdownButton = (props: DropdownButtonProps) => {
  const open = useDropdownSelector(state => Boolean(state.anchorEl));
  const ids = useDropdownSelector(state => state.ids);
  const actions = useDropdownActions();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);

    if (!e.isDefaultPrevented()) {
      actions.open(e.currentTarget);
    }
  }

  return (
    <Button
      {...props}
      onClick={onClick}
      id={ids.button}
      aria-controls={ids.menu}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    />
  );
}

export interface DropdownButtonProps extends Omit<ButtonProps, 'id'> {

}
