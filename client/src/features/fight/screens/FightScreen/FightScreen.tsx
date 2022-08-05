import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

import { Container } from '~/components/layout/Container';
import { FightingTeamGrid } from '~/features/fight/components/FightingTeamGrid';
import { useAppSelector } from '~/store';
import { useDialog } from '~/hooks/dialog';
import { FightOver } from '~/features/fight/components/FightOver';
import { GameState, Character } from '~/features/fight/utils/game';
import { useGame } from '~/features/fight/hooks';

import { styles } from './FightScreen.styles';

const fightOverStates: GameState[] = [GameState.won, GameState.lost];

export const FightScreen = () => {
  const playerTeam = useAppSelector(state => state.fight.playerTeam);
  const enemyTeams = useAppSelector(state => state.fight.rounds);

  const navigate = useNavigate();

  const game = useGame({
    playerTeam,
    enemyTeams,
  });

  const [openFightOverDialog] = useDialog({
    title: '',
    body: <FightOver
      message={game.state === GameState.won ? 'You Won!' : 'You Lost!'}
    />,
    buttons: { cancel: null },
    onClose: () => navigate('/fight-config'),
  });

  useEffect(() => {
    if (fightOverStates.includes(game.state)) {
      openFightOverDialog()
    }
  }, [game.state]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Round {game.round}
          </Typography>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={6}>
            <FightingTeamGrid
              team={game.playerTeam}
              attackInfo={game.attackInfo}
              name="player"
            />
          </Grid>

          <Grid item xs={6}>
            <FightingTeamGrid
              team={game.enemyTeam}
              attackInfo={game.attackInfo}
              name="enemy"
              sx={styles.rtl}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
