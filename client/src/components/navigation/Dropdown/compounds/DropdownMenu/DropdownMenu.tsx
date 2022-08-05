import { Menu, MenuProps } from '@mui/material';

import { useDropdownActions, useDropdownSelector } from '../../context';

export const DropdownMenu = (props: DropdownMenuProps) => {
  const anchorEl = useDropdownSelector(state => state.anchorEl);
  const ids = useDropdownSelector(state => state.ids);
  const actions = useDropdownActions();

  const onClose = (e: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    props.onClose?.(e, reason);

    if (!(e as React.SyntheticEvent).isDefaultPrevented?.()) {
      actions.close();
    }
  }

  return (
    <Menu
      {...props}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      id={ids.menu}
      MenuListProps={{
        ...(props.MenuListProps || {}),
        'aria-labelledby': ids.button,
      }}
    />
  );
}

export interface DropdownMenuProps extends Omit<MenuProps, 'open' | 'anchorEl'> {

}
