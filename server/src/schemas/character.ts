import * as yup from 'yup';

const statSchema = yup.number().min(1);

const spellSchema = yup.object({
  name: yup.string().required(),
  power: statSchema.required(),
  mana: statSchema.required(),
}).noUnknown();

export const characterSchema = yup.object({
  name: yup.string().required(),
  picture: yup.string().url().required(),
  maxHealthPoints: statSchema.required(),
  strength: statSchema.required(),
  mana: statSchema.required(),
  criticalChance: statSchema.required(),
  criticalDamage: statSchema.required(),
  spells: yup.array(spellSchema.required()).required(),
}).noUnknown();

export type CharacterType = yup.InferType<typeof characterSchema>;

export const partialCharacterSchema = yup.object({
  name: yup.string(),
  picture: yup.string().url(),
  maxHealthPoints: statSchema,
  strength: statSchema,
  mana: statSchema,
  criticalChance: statSchema,
  criticalDamage: statSchema,
  spells: yup.array(spellSchema.required()),
}).noUnknown();

export type PartialCharacterType = yup.InferType<typeof partialCharacterSchema>;

export type { } from 'yup/lib/types';
export type { } from 'yup/lib/object';
export type { } from 'yup/lib/string';
export type { } from 'yup/lib/number';
export type { } from 'yup/lib/array';
