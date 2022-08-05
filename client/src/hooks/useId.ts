import { nanoid } from 'nanoid';

import { useConst } from '~/hooks/useConst';

export const useId = (providedId?: string | undefined): string => {
  const generatedId = useConst(() => nanoid());
  const id = providedId || generatedId;

  return id;
}
