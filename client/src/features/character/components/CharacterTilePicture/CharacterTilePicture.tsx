import { Box } from '@mui/material';

import type { CharacterType } from '~/features/character/types';

import { styles } from './CharacterTilePicture.styles';

export const CharacterTilePicture = ({ character }: CharacterTilePictureProps) => {
  return (
    <Box
      component="img"
      sx={styles.root}
      src={character.picture}
      alt={`Picture of ${character.name}`}
      height="100%"
    />
  );
}

export interface CharacterTilePictureProps {
  character: Pick<CharacterType, 'picture' | 'name'>;
}
