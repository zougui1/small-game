import { useMutation, useQuery } from '@tanstack/react-query';

import { Character } from '~/features/character/api/core';
import type { CharacterType } from '~/features/character/types';
import type { MutationOptions } from '~/api/react';

export class ReactCharacterV1 {
  readonly keys = {
    route: () => ['characters'],
    getMany: () => this.keys.route(),
    getById: (id: string) => [...this.keys.route(), id],
  };

  //#region create
  useCreate = (options?: MutationOptions<unknown, unknown, Omit<CharacterType, '_id'>> | undefined) => {
    return useMutation(async (character: Omit<CharacterType, '_id'>) => {
      await Character.v1.create(character);
    }, options);
  }
  //#endregion

  //#region read
  useGetMany = () => {
    return useQuery(this.keys.getMany(), async () => {
      return await Character.v1.getMany();
    });
  }

  useGetById = (id: string) => {
    return useQuery(this.keys.getById(id), async () => {
      return await Character.v1.getById(id);
    });
  }
  //#endregion

  //#region update
  useUpdateById = (
    options?: MutationOptions<unknown, unknown, { id: string; data: Partial<CharacterType> }> | undefined,
  ) => {
    return useMutation(async ({ id, data }: { id: string; data: Partial<CharacterType> }) => {
      await Character.v1.updateById(id, data);
    }, options);
  }
  //#endregion

  //#region delete
  useDeleteById = (options?: MutationOptions<unknown, unknown, string> | undefined) => {
    return useMutation(async (id: string) => {
      await Character.v1.deleteById(id);
    }, options);
  }
  //#endregion
}
