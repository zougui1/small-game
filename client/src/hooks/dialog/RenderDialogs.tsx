import { Dialog } from '~/components/layout/Dialog';

import { useDialogSelector, useDialogActions, DialogData } from './context';

export const RenderDialogs = () => {
  const dialogMap = useDialogSelector(state => state.dialogs);
  const actions = useDialogActions();

  const dialogs = Object.values(dialogMap);

  const handleClose = (dialog: DialogData) => {
    actions.closeDialog(dialog.id);
    dialog.onClose?.();
  }

  return (
    <>
      {dialogs.map(dialog => (
        <Dialog
          key={dialog.id}
          {...dialog.props}
          open={dialog.isOpen}
          title={dialog.title}
          buttons={dialog.buttons}
          onClose={() => handleClose(dialog)}
        >
          {dialog.body}
        </Dialog>
      ))}
    </>
  );
}
