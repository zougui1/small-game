import { Typography } from '@mui/material';

import { CharacterStats } from '~/features/character/components/CharacterStats';
import type { CharacterType } from '~/features/character/types';

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  return (
    <>
      <Typography variant="h1">{character.name}</Typography>
      <img src={character.picture} alt={`Picture of ${character.name}`} />
      <CharacterStats character={character} />
    </>
  );
}

export interface CharacterDetailsProps {
  character: CharacterType;
}
