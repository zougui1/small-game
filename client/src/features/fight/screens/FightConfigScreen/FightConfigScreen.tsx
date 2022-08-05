import { useState } from 'react';
import { Grid, Typography, List, ListItem, Button } from '@mui/material';

import { Container } from '~/components/layout/Container';
import { TeamConfiguration } from '~/features/fight/components/TeamConfiguration';
import { Link } from '~/components/navigation/Link';
import type { UnifiedCharacterType } from '~/features/character/types';
import { init } from '~/features/fight/fightSlice';
import { useAppDispatch } from '~/store';

import { styles } from './FightConfigScreen.styles';
import { FightConfigSection } from './FightConfigSection';
import { RoundConfiguration } from './RoundConfiguration';

const maxCharacters = 5;
const maxRounds = 3;

export const FightConfigScreen = () => {
  const [playerTeam, setPlayerTeam] = useState<UnifiedCharacterType[]>([]);
  const [rounds, setRounds] = useState<UnifiedCharacterType[][]>([[]]);

  const appDispatch = useAppDispatch();

  const canAddRounds = rounds.length < maxRounds;
  const canFight = playerTeam.length > 0 && rounds.every(team => team.length);

  const handleRoundChange = (index: number) => (team: UnifiedCharacterType[]) => {
    setRounds(rounds.map((round, i) => {
      return i === index ? team : round;
    }));
  }

  const handleAddRound = () => {
    setRounds([...rounds, []]);
  }

  const onFight = () => {
    appDispatch(init({
      playerTeam,
      rounds,
    }));
  }

  return (
    <Container sx={styles.root}>
      <Grid container direction="column" alignItems="center" sx={styles.container}>
        <Grid item>
          <Typography variant="h1">Standard Fight</Typography>
        </Grid>

        <Grid container item>
          <Grid
            container
            item
            xs={12}
            md={6}
            direction="column"
            justifyContent="space-between"
          >
            <FightConfigSection title={`Your Team (${playerTeam.length}/${maxCharacters})`}>
              <TeamConfiguration onTeamChange={setPlayerTeam} maxCharacters={maxCharacters} />
            </FightConfigSection>

            <Grid item alignSelf="center">
              <Link disabled={!canFight} to="/fight">
                <Button
                  variant="contained"
                  disabled={!canFight}
                  onClick={onFight}
                >
                  Fight!
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <FightConfigSection title="Enemies">
              <Grid container justifyContent="center">
                <Grid item xs={12}>
                  <List sx={styles.roundList}>
                    {rounds.map((team, index) => (
                      <ListItem key={index}>
                        <RoundConfiguration
                          nth={index + 1}
                          team={team}
                          maxCharacters={maxCharacters}
                          onTeamChange={handleRoundChange(index)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item>
                  <Button onClick={handleAddRound} disabled={!canAddRounds}>
                    Add round ({rounds.length}/{maxRounds})
                  </Button>
                </Grid>
              </Grid>
            </FightConfigSection>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
