import { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { ReactCharacter } from '~/features/character/api/react';
import { SuspenseQuery } from '~/components/async/SuspenseQuery';
import { CharacterGrid } from '~/features/character/components/CharacterGrid';
import { CharacterStats } from '~/features/character/components/CharacterStats';
import type { CharacterType } from '~/features/character/types';

export const CharacterSelector = ({ onCharacterClick, selectedCharacter }: CharacterSelectorProps) => {
  const query = ReactCharacter.v1.useGetMany();
  const [hoveredCharacter, setHoveredCharacter] = useState<CharacterType>();
  const characterOnDisplay = hoveredCharacter || selectedCharacter;

  return (
    <SuspenseQuery
      query={query}
      render={characters => (
        <Grid container>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item>
                <Typography variant="h5">Characters</Typography>
              </Grid>

              <Grid container item>
                <CharacterGrid
                  characters={characters}
                  onCharacterClick={onCharacterClick}
                  onCharacterHover={setHoveredCharacter}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid item>
              <Typography variant="h5">
                {characterOnDisplay ? characterOnDisplay.name : 'Hover on a character'}
              </Typography>
            </Grid>

            <Grid container item>
              {characterOnDisplay && <CharacterStats character={characterOnDisplay} />}
            </Grid>
          </Grid>
        </Grid>
      )}
    />
  );
}

export interface CharacterSelectorProps {
  onCharacterClick: (character: CharacterType) => void;
  selectedCharacter?: CharacterType | undefined;
}
