import { Character as CharacterModel } from '../models/character';

import type { CharacterType, PartialCharacterType } from '../schemas/character';

class Character {
  #model = new CharacterModel();

  //#region create
  async create(data: CharacterType): Promise<void> {
    await this.#model.create(data);
  }
  //#endregion

  //#region read
  async find(): Promise<(CharacterType & { _id: string })[]> {
    return await this.#model.findAll();
  }

  async findById(id: string): Promise<CharacterType & { _id: string }> {
    return await this.#model.findById(id);
  }
  //#endregion

  //#region update
  async updateById(id: string, data: PartialCharacterType): Promise<void> {
    await this.#model.updateById(id, data);
  }
  //#endregion

  //#region delete
  async deleteById(id: string): Promise<void> {
    await this.#model.deleteById(id);
  }
  //#endregion
}

export const character = new Character();
