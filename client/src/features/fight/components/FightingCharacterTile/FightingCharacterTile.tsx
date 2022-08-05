import { Grid, Typography } from '@mui/material';

import { CharacterTileContainer, CharacterTileContainerProps } from '~/features/character/components/CharacterTileContainer';
import { CharacterTilePicture } from '~/features/character/components/CharacterTilePicture';
import { StatusBar } from '~/features/fight/components/StatusBar';
import { mergeSx } from '~/utils/styles';

import { styles, getHealthStyles } from './FightingCharacterTile.styles';

export const FightingCharacterTile = ({ character, sx, ...rest }: FightingCharacterTileProps) => {
  return (
    <CharacterTileContainer
      {...rest}
      sx={mergeSx(styles.root, sx)}
    >
      <Grid item xs={4} sx={styles.pictureContainer}>
        <CharacterTilePicture character={character} />
      </Grid>

      <Grid
        container
        item
        xs={8}
        direction="column"
        sx={mergeSx(
          styles.statsContainer,
          getHealthStyles({ health: character.health, maxHealth: character.maxHealth })
        )}
        spacing={2}
      >
        <Grid item>
          <Typography>{character.name}</Typography>
        </Grid>

        <Grid item>
          <StatusBar
            name="HP"
            value={character.health}
            max={character.maxHealth}
            barColor="green"
          />
        </Grid>

        <Grid item>
          <StatusBar
            name="MP"
            value={character.mana}
            max={character.maxMana}
          />
        </Grid>
      </Grid>
    </CharacterTileContainer>
  );
}

export interface FightingCharacterTileProps extends CharacterTileContainerProps {
  character: {
    name: string;
    picture: string;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
  };
}
