import { MenuItem, MenuItemProps } from '@mui/material';

import { useDropdownActions } from '../../context';

export const DropdownItem = (props: DropdownItemProps) => {
  const actions = useDropdownActions();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    props.onClick?.(e);

    if (!e.isDefaultPrevented?.()) {
      actions.close();
    }
  }

  return (
    <MenuItem {...props} onClick={onClick} />
  );
}

export interface DropdownItemProps extends MenuItemProps {

}
