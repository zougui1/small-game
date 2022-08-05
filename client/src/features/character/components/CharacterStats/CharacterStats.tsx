import { Typography, List, ListItem } from '@mui/material';

import { CharacterStat } from '~/features/character/components/CharacterStat';
import type { CharacterType } from '~/features/character/types';

import { styles } from './CharacterStats.styles';

const characterStats: { name: string; key: keyof CharacterType }[] = [
  { name: 'HP', key: 'maxHealthPoints' },
  { name: 'Strength', key: 'strength' },
  { name: 'Mana', key: 'mana' },
  { name: 'Critical chance', key: 'criticalChance' },
  { name: 'Critical damage', key: 'criticalDamage' },
];

export const CharacterStats = ({ character }: CharacterStatsProps) => {
  return (
    <List>
      {characterStats.map(stat => (
        <ListItem key={stat.name}>
          <CharacterStat name={stat.name} value={String(character[stat.key])} />
        </ListItem>
      ))}

      <ListItem sx={styles.spellsContainer}>
        <Typography>spells:</Typography>

        <List>
          {character.spells.map(spell => (
            <ListItem key={spell.name}>
              <Typography>
                <span>{spell.name}:</span>&nbsp;
                <span>power: {spell.power},</span>&nbsp;
                <span>mana: {spell.mana}</span>
              </Typography>
            </ListItem>
          ))}
        </List>
      </ListItem>
    </List>
  );
}

export interface CharacterStatsProps {
  character: CharacterType;
}
