import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@mui/material';

import type { CharacterType } from '~/features/character/types';

import { AddCharacterButton } from './AddCharacterButton';
import { CharacterRow } from './CharacterRow';

export const CharacterTable = ({ characters }: CharacterTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Picture</TableCell>
          <TableCell>HP</TableCell>
          <TableCell>Strength</TableCell>
          <TableCell>Mana</TableCell>
          <TableCell>Critical chance</TableCell>
          <TableCell>Critical damage</TableCell>
          <TableCell align="right">
            <span>Actions</span>
            <AddCharacterButton />
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {characters.map(character => (
          <CharacterRow key={character._id} character={character} />
        ))}
      </TableBody>
    </Table>
  );
}

export interface CharacterTableProps {
  characters: CharacterType[];
}
