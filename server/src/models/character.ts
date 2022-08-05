import mongoose from 'mongoose';

import { connect } from './connect';
import type { CharacterType } from '../schemas/character';

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  maxHealthPoints: {
    type: Number,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  mana: {
    type: Number,
    required: true,
  },
  criticalChance: {
    type: Number,
    required: true,
  },
  criticalDamage: {
    type: Number,
    required: true,
  },
  spells: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        power: {
          type: Number,
          required: true,
        },
        mana: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});

const CharacterModel = mongoose.model('Character', characterSchema);

export class Character {
  constructor() {
    connect();
  }

  //#region create
  async create(character): Promise<void> {
    await CharacterModel.create(character);
  }
  //#endregion

  //#region read
  async findAll(): Promise<(CharacterType & { _id: string })[]> {
    const characters = await CharacterModel.find();
    const characterObjects = characters.map(character => {
      return character.toObject() as CharacterType & { _id: string };
    });

    return characterObjects;
  }

  async findById(id: string): Promise<CharacterType & { _id: string }> {
    const character = await CharacterModel.findById(id);
    const characterObject = character.toObject() as CharacterType & { _id: string };

    return characterObject;
  }
  //#endregion

  //#region update
  async updateById(id, character): Promise<void> {
    await CharacterModel.findByIdAndUpdate(id, character);
  }
  //#endregion

  //#region delete
  async deleteById(id): Promise<void> {
    await CharacterModel.findByIdAndDelete(id);
  }
  //#endregion
}
