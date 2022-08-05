import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
} from '@mui/material';

import { LinkRoot, LinkRootProps } from './LinkRoot';

export const Link = (props: LinkProps) => {
  return (
    <MuiLink
      {...props}
      component={LinkRoot}
    />
  );
}

export type LinkProps = MuiLinkProps<'a', LinkRootProps>;
