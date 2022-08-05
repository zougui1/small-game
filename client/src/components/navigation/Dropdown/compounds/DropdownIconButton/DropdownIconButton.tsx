import { IconButton, IconButtonProps } from '@mui/material';

import { useDropdownActions, useDropdownSelector } from '../../context';

export const DropdownIconButton = (props: DropdownIconButtonProps) => {
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
    <IconButton
      {...props}
      onClick={onClick}
      id={ids.button}
      aria-controls={ids.menu}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    />
  );
}

export interface DropdownIconButtonProps extends Omit<IconButtonProps, 'id'> {

}
