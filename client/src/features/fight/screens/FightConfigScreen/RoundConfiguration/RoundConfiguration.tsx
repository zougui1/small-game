import { Grid, Typography } from '@mui/material';

import { TeamConfiguration, TeamConfigurationProps } from '~/features/fight/components/TeamConfiguration';
import type { UnifiedCharacterType } from '~/features/character/types';

export const RoundConfiguration = ({ nth, team, maxCharacters, onTeamChange }: RoundConfigurationProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Round {nth} ({team.length}/{maxCharacters})
        </Typography>
      </Grid>

      <Grid container item>
        <TeamConfiguration onTeamChange={onTeamChange} maxCharacters={maxCharacters} />
      </Grid>
    </Grid>
  );
}

export interface RoundConfigurationProps {
  nth: number;
  team: UnifiedCharacterType[];
  maxCharacters: number;
  onTeamChange: TeamConfigurationProps['onTeamChange'];
}
