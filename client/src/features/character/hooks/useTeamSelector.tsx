import { useState, useMemo } from 'react';

import { CharacterSelector } from '~/features/character/components/CharacterSelector';
import { useDialog } from '~/hooks/dialog';
import { CharacterType, UnifiedCharacterType } from '~/features/character/types';
import { unifyCharacters } from '~/features/character/utils';

export const useTeamSelector = (): UseTeamSelectorResult => {
  const [team, setTeam] = useState<CharacterType[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<UnifiedCharacterType>();
  const unifiedTeam = useMemo(() => unifyCharacters(team), [team]);

  const handleCharacterChange = (character: CharacterType) => {
    if (selectedCharacter !== undefined) {
      setTeam(unifiedTeam.map(teamCharacter => {
        return teamCharacter.id === selectedCharacter.id
          ? character
          : teamCharacter;
      }));
    } else {
      setTeam([...unifiedTeam, character]);
    }

    setSelectedCharacter(undefined);
    closeCharacterSelector();
  }

  const askOpenCharacterSelector = (character?: UnifiedCharacterType | undefined): void => {
    setSelectedCharacter(character);
    openCharacterSelector();
  }

  const [openCharacterSelector, closeCharacterSelector] = useDialog({
    title: 'Select Character',
    body: <CharacterSelector
      onCharacterClick={handleCharacterChange}
      selectedCharacter={selectedCharacter}
    />,
    buttons: { ok: null },
    props: {
      fullWidth: true,
      maxWidth: 'lg',
      PaperProps: { style: { minHeight: '80%' } },
    },
  });

  return {
    team: unifiedTeam,
    openCharacterSelector: askOpenCharacterSelector,
  };
}

export interface UseTeamSelectorResult {
  team: UnifiedCharacterType[];
  openCharacterSelector: (character?: UnifiedCharacterType | undefined) => void;
}
