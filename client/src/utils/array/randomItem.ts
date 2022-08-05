import { randomIndex } from '~/utils/array/randomIndex';

export const randomItem = <T>(val: T[]): T => {
  return val[randomIndex(val)];
}
