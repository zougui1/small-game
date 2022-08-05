import { SxProps, Theme } from '@mui/material';

import { Link, LinkProps } from '~/components/navigation/Link';
import { mergeSx } from '~/utils/styles';

import { styles } from './DropdownLink.styles';
import { DropdownItem, DropdownItemProps } from '../DropdownItem';

export const DropdownLink = ({ to, params, LinkProps = {}, sxStyles, children, sx, ...rest }: DropdownLinkProps) => {
  return (
    <DropdownItem {...rest} sx={mergeSx(styles.root, sx, sxStyles?.root)}>
      <Link
        {...LinkProps}
        sx={mergeSx(styles.link, sxStyles?.link)}
        to={to}
        params={params}
      >
        {children}
      </Link>
    </DropdownItem>
  );
}

interface DropdownLinkBaseProps extends DropdownItemProps {
  LinkProps?: LinkProps | undefined;
  sxStyles?: Partial<{
    root: SxProps<Theme>;
    link: SxProps<Theme>;
  }> | undefined;
}

export type DropdownLinkProps = DropdownLinkBaseProps & LinkProps;
