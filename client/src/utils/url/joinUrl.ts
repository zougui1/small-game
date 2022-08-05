import _ from 'lodash';
import urlJoin from 'url-join';

import { joinUrlQuery } from './joinUrlQuery';

export const joinUrl = (...urlComponents: string[]): string => {
  const urlPath = _.takeWhile(urlComponents, component => !component.includes('?'));
  const urlQueryParts = urlComponents.slice(urlPath.length).map(queryPart => queryPart.replaceAll('?', ''));
  const urlQuery = joinUrlQuery(...urlQueryParts);
  const query = urlQuery ? `?${urlQuery}` : '';

  return `${urlJoin(...urlPath)}${query}`;
}
