import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

import { mergeSx } from '~/utils/styles';

import { styles } from './Container.styles';

export const Container = ({ sx, ...rest }: ContainerProps) => {
  return (
    <MuiContainer {...rest} sx={mergeSx(styles.root, sx)} />
  );
}

export interface ContainerProps extends MuiContainerProps {

}
