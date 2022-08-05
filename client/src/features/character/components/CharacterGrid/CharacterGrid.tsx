import { Grid, GridProps } from '@mui/material';

import { CharacterTile } from '~/features/character/components/CharacterTile';
import AddIcon from '~/assets/images/add-icon.png';
import type { CharacterType } from '~/features/character/types';
import React from 'react';

const tileAdd = { picture: AddIcon, name: 'Add' };

export function CharacterGrid<T extends CharacterType & { id?: string | undefined }>(props: CharacterGridProps<T>) {
  const {
    characters,
    onCharacterClick,
    onCharacterHover,
    onAdd,
    tileWidth,
    ...rest
  } = props;
  const areTilesButtons = Boolean(onCharacterClick);

  const handleClick = (character: T) => () => {
    onCharacterClick?.(character);
  }

  return (
    <Grid container {...rest} spacing={2}>
      {characters.map(character => (
        <Grid
          key={character.id || character._id}
          item
          xs={2}
          onClick={areTilesButtons ? handleClick(character) : undefined}
          role={areTilesButtons ? 'button' : undefined}
          onMouseEnter={() => onCharacterHover?.(character)}
          onMouseLeave={() => onCharacterHover?.(undefined)}
        >
          <CharacterTile character={character} sx={{ width: tileWidth }} />
        </Grid>
      ))}

      {onAdd && (
        <Grid item xs={2} onClick={onAdd} role="button">
          <CharacterTile
            character={tileAdd}
            sx={{ width: tileWidth }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export interface CharacterGridProps<
  T extends CharacterType
> extends Omit<GridProps, 'container' | 'item'> {
  characters: T[];
  onCharacterClick?: ((character: T) => void) | undefined;
  onCharacterHover?: ((character: T | undefined) => void) | undefined;
  onAdd?: ((e: React.MouseEvent) => void) | undefined;
  tileWidth?: string | undefined;
}
