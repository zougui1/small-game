import type { CharacterType } from '~/features/character/types';
import { http } from '~/api/core';

export class CharacterV1 {
  //#region create
  create = async (character: Omit<CharacterType, '_id'>): Promise<void> => {
    await http.post('/v1/characters', character);
  }
  //#endregion

  //#region read
  getMany = async (): Promise<CharacterType[]> => {
    const { data } = await http.get<CharacterType[]>('/v1/characters');
    return data;
  }

  getById = async (id: string): Promise<CharacterType> => {
    const { data } = await http.get<CharacterType>(`/v1/characters/${id}`);
    return data;
  }
  //#endregion

  //#region update
  updateById = async (id: string, partialCharacter: Partial<CharacterType>): Promise<void> => {
    await http.patch(`/v1/characters/${id}`, partialCharacter);
  }
  //#endregion

  //#region delete
  deleteById = async (id: string): Promise<void> => {
    await http.delete(`/v1/characters/${id}`);
  }
  //#endregion
}
