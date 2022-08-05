import { useEffect } from 'react';

import { CharacterGrid } from '~/features/character/components/CharacterGrid';
import { useTeamSelector } from '~/features/character/hooks';
import type { UnifiedCharacterType } from '~/features/character/types';

export const TeamConfiguration = ({ onTeamChange, maxCharacters }: TeamConfigurationProps) => {
  const { team, openCharacterSelector } = useTeamSelector();
  const canAddCharacters = team.length < maxCharacters;

  const handleAdd = () => {
    openCharacterSelector(undefined);
  }

  useEffect(() => {
    onTeamChange(team);
  }, [team]);

  return (
    <CharacterGrid
      characters={team}
      onCharacterClick={openCharacterSelector}
      onAdd={canAddCharacters ? handleAdd : undefined}
    />
  );
}

export interface TeamConfigurationProps {
  onTeamChange: (team: UnifiedCharacterType[]) => void;
  maxCharacters: number;
}
