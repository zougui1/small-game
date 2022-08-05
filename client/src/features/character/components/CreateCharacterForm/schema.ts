import * as yup from 'yup';

const statSchema = yup.number().min(1);

export const spellSchema = yup.object({
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
});

export type spellData = yup.InferType<typeof spellSchema>;
export type CharacterData = yup.InferType<typeof characterSchema>;
