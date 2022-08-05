import { DropdownProvider } from './context';
import { DropdownRoot } from './DropdownRoot';
import { DropdownButton, DropdownButtonProps } from './compounds/DropdownButton'
import { DropdownIconButton, DropdownIconButtonProps } from './compounds/DropdownIconButton'
import { DropdownMenu, DropdownMenuProps } from './compounds/DropdownMenu'
import { DropdownItem, DropdownItemProps } from './compounds/DropdownItem'
import { DropdownLink, DropdownLinkProps } from './compounds/DropdownLink'

export const Dropdown = ({ children, id }: DropdownProps) => {
  return (
    <DropdownProvider>
      <DropdownRoot id={id} />
      {children}
    </DropdownProvider>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.IconButton = DropdownIconButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Link = DropdownLink;

export interface DropdownProps {
  id?: string | undefined;
  children?: React.ReactNode;
}

export namespace Dropdown {
  export declare type ButtonProps = DropdownButtonProps;
  export declare type IconButtonProps = DropdownIconButtonProps;
  export declare type MenuProps = DropdownMenuProps;
  export declare type ItemProps = DropdownItemProps;
  export declare type LinkProps = DropdownLinkProps;
}
