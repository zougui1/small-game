import { randomItem } from '~/utils/array';
import { random } from '~/utils/math';

import { spells } from './limitationMock';

const spellCount = 4;
const defaultStats = {
  maxHealthPoints: { min: 15, max: 25 },
  strength: { min: 2, max: 5 },
  mana: { min: 2, max: 12 },
  criticalChance: { min: 2, max: 10 },
  criticalDamage: { min: 100, max: 200 },
}

export const getRandomspells = () => {
  let availablespells = spells;

  const randomspells = new Array(spellCount)
    .fill(0)
    .map(() => {
      const spell = randomItem(availablespells);

      availablespells = availablespells.filter(tech => {
        return tech.name !== spell.name;
      });

      return spell;
    });

  return randomspells;
}

export const getRandomDefaultStats = () => {
  return {
    maxHealthPoints: random(defaultStats.maxHealthPoints.min, defaultStats.maxHealthPoints.max),
    strength: random(defaultStats.strength.min, defaultStats.strength.max),
    mana: random(defaultStats.mana.min, defaultStats.mana.max),
    criticalChance: random(defaultStats.criticalChance.min, defaultStats.criticalChance.max),
    criticalDamage: random(defaultStats.criticalDamage.min, defaultStats.criticalDamage.max),
  };
}

export const getRandomPicture = () => {
  const seed = random(1, 10000);
  return `https://picsum.photos/seed/${seed}/200/200`;
}
