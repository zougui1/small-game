import { Typography } from '@mui/material';

import { ReactCharacter } from '~/features/character/api/react';
import { SuspenseQuery } from '~/components/async/SuspenseQuery';
import { Container } from '~/components/layout/Container';

import { CharacterTable } from './CharacterTable';

export const CharactersScreen = () => {
  const query = ReactCharacter.v1.useGetMany();

  return (
    <Container>
      <Typography variant="h1">Characters</Typography>

      <SuspenseQuery
        query={query}
        render={characters => <CharacterTable characters={characters} />}
      />
    </Container>
  );
}
