import { TableCell, TableRow } from '@mui/material';

import type { CharacterType } from '~/features/character/types';

import { ActionMenu } from './ActionMenu';

export const CharacterRow = ({ character }: CharacterRowProps) => {
  return (
    <TableRow key={character._id}>
      <TableCell>{character.name}</TableCell>
      <TableCell>
        <img height="32" src={character.picture} alt={`Picture of ${character.name}`} />
      </TableCell>
      <TableCell>{character.maxHealthPoints}</TableCell>
      <TableCell>{character.strength}</TableCell>
      <TableCell>{character.mana}</TableCell>
      <TableCell>{character.criticalChance}%</TableCell>
      <TableCell>+{character.criticalDamage}%</TableCell>

      <TableCell align="right">
        <ActionMenu characterId={character._id} />
      </TableCell>
    </TableRow>
  );
}

export interface CharacterRowProps {
  character: CharacterType;
}
