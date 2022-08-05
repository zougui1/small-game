import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { UnifiedCharacterType } from '~/features/character/types';

export interface FightState {
  playerTeam: UnifiedCharacterType[];
  rounds: UnifiedCharacterType[][];
}

const initialState: FightState = {
  playerTeam: [],
  rounds: [],
};

export const counterSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<InitFightPayload>) => {
      const { playerTeam, rounds } = action.payload;

      state.playerTeam = playerTeam;
      state.rounds = rounds;
    },
  },
});

export const { init } = counterSlice.actions;

export default counterSlice.reducer;

export interface InitFightPayload {
  playerTeam: UnifiedCharacterType[];
  rounds: UnifiedCharacterType[][];
}
