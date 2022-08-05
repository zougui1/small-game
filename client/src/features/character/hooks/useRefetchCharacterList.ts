import { useQueryClient } from '@tanstack/react-query';

import { ReactCharacter } from '~/features/character/api/react';

export const useRefetchCharacterList = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.refetchQueries(ReactCharacter.v1.keys.getMany());
  }
}
