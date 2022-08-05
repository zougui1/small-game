import QS from 'qs';

import { UnknownObject } from '~/types/object';

import { joinUrl } from './joinUrl';

export const toUrlString = (url: string, query?: UnknownObject | undefined): string => {
  return query
    ? joinUrl(url, `?${QS.stringify(query)}`)
    : url;
}
