import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Dropdown } from '~/components/navigation/Dropdown';
import { ReactCharacter } from '~/features/character/api/react';
import { useRefetchCharacterList } from '~/features/character/hooks';

export const ActionMenu = ({ characterId }: ActionMenuProps) => {
  const refetchCharacterList = useRefetchCharacterList();
  const deleteMutation = ReactCharacter.v1.useDeleteById({
    onSuccess: refetchCharacterList,
  });

  const deleteCharacter = () => {
    deleteMutation.mutate(characterId);
  }

  return (
    <Dropdown id={`character-${characterId}-actions`}>
      <Dropdown.IconButton>
        <MoreVertIcon />
      </Dropdown.IconButton>

      <Dropdown.Menu>
        <Dropdown.Link to={`/characters/${characterId}`}>Details</Dropdown.Link>
        <Dropdown.Item onClick={deleteCharacter}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export interface ActionMenuProps {
  characterId: string;
}
