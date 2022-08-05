import { join } from '../string';

export const joinUrlQuery = (...queries: string[]): string => {
  return join(queries, '&');
}
