import { useParams } from 'react-router-dom';

import { ReactCharacter } from '~/features/character/api/react';
import { SuspenseQuery } from '~/components/async/SuspenseQuery';
import { Container } from '~/components/layout/Container';

import { CharacterDetails } from './CharacterDetails';

export const CharacterDetailsScreen = () => {
  const params = useParams();
  const query = ReactCharacter.v1.useGetById(params.id || 'undefined');

  return (
    <Container>
      <SuspenseQuery
        query={query}
        render={character => <CharacterDetails character={character} />}
      />
    </Container>
  );
}
