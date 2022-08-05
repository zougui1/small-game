import { Grid, GridProps, Typography } from '@mui/material';

import { CharacterTileContainer } from '~/features/character/components/CharacterTileContainer';
import { CharacterTilePicture } from '~/features/character/components/CharacterTilePicture';
import { CharacterType } from '~/features/character/types';

export const CharacterTile = ({ character, children, ...rest }: CharacterTileProps) => {
  return (
    <CharacterTileContainer {...rest} direction="column">
      <Grid item xs={12}>
        <CharacterTilePicture character={character} />
      </Grid>

      <Grid item xs={12}>
        <Typography align="center">{character.name}</Typography>
      </Grid>

      {children}
    </CharacterTileContainer>
  );
}

export interface CharacterTileProps extends Omit<GridProps, 'container' | 'direction'> {
  character: Pick<CharacterType, 'picture' | 'name'>;
}
