import { useEffect } from 'react';

import { useId } from '~/hooks/useId';

import { useDialogActions } from './context';
import { DialogOptions } from './types';

export const useDialog = (options: DialogOptions): [() => void, () => void] => {
  const dialogId = useId(options.id);
  const actions = useDialogActions();

  useEffect(() => {
    actions.addDialog({
      ...options,
      id: dialogId,
    });

    return () => {
      actions.removeDialog(dialogId);
    }
  }, [actions, dialogId]);

  useEffect(() => {
    actions.updateDialog({
      ...options,
      id: dialogId,
    });
  }, [actions, dialogId, ...Object.values(options)]);

  const open = () => {
    actions.openDialog(dialogId);
  }

  const close = () => {
    actions.closeDialog(dialogId);
  }

  return [open, close];
}
