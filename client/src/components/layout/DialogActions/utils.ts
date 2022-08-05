import _ from 'lodash';

import { defaultButtons } from './defaultButtons';
import type { ActionButton } from './types';

export const getActionButtons = (buttons: Record<string, ActionButton | null | undefined> | undefined = {}): (ActionButton & { key: string })[] => {
  const buttonList = Object
    .entries(_.merge({}, defaultButtons, buttons))
    .filter(([key, button]) => button)
    .map(([key, button]) => ({ ...button, key }));

  return buttonList;
}
