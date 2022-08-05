import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { CreateCharacterForm } from '~/features/character/components/CreateCharacterForm';
import { useDialog } from '~/hooks/dialog';
import { useRefetchCharacterList } from '~/features/character/hooks';

export const AddCharacterButton = () => {
  const refetchCharacterList = useRefetchCharacterList();

  const onCreateOk = () => {
    refetchCharacterList();
    closeDialog();
  }

  const [openDialog, closeDialog] = useDialog({
    title: 'Create a new character',
    body: <CreateCharacterForm onCreated={onCreateOk} />,
    buttons: { ok: null },
  });

  return (
    <Tooltip title="Open a dialog to create a character">
      <IconButton onClick={openDialog}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}
