import { Grid, SxProps, Theme } from '@mui/material';

import { FightingCharacterTile } from '~/features/fight/components/FightingCharacterTile';
import { Character } from '~/features/fight/utils/game';
import { AttackObject } from '~/features/fight/hooks';

import { styles } from './FightingTeamGrid.styles';

const tileWidth = '280px';

export const FightingTeamGrid = ({ team, attackInfo, name, sx }: FightingTeamGridProps) => {
  const isAttacking = (character: Character): boolean => {
    return character.id === attackInfo?.recipient?.id;
  }

  const isAttacked = (character: Character): boolean => {
    return character.id === attackInfo?.target?.id;
  }

  return (
    <Grid container spacing={2} direction="column" sx={sx}>
      {team.map(character => (
        <Grid
          key={character.id}
          item
          xs={2}
          className={name}
          sx={[
            isAttacking(character) && styles.attacking,
            isAttacked(character) && styles.attacked,
          ]}
        >
          <FightingCharacterTile
            character={character}
            sx={{ width: tileWidth }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export interface FightingTeamGridProps {
  team: Character[];
  attackInfo: AttackObject | undefined;
  name: 'player' | 'enemy';
  sx?: SxProps<Theme> | undefined;
}
