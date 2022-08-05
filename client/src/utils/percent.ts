import { random } from '~/utils/math';

class Percent {
  toMultiplier(percent: number): number {
    return percent / 100;
  }

  random(): number {
    return random(0, 100);
  }

  randomChance(percent: number): boolean {
    return this.random() <= percent;
  }

  toPercent(value: number, max: number): number {
    return value * 100 / max;
  }
}

export const percent = new Percent();
