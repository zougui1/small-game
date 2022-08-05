import { Grid, GridProps } from '@mui/material';

import { mergeSx } from '~/utils/styles';

import { styles } from './CharacterTileContainer.styles';

export const CharacterTileContainer = ({ children, sx, ...rest }: CharacterTileContainerProps) => {
  return (
    <Grid
      {...rest}
      container
      sx={mergeSx(styles.root, sx)}
    >
      {children}
    </Grid>
  );
}

export interface CharacterTileContainerProps extends Omit<GridProps, 'container'> {

}
