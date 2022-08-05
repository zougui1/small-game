import { store } from '~/store';
import type { GuardType } from '~/components/navigation/Guard';

export const fightScreenGuards: GuardType[] = [
  {
    redirectTo: '/fight-config',
    condition: () => {
      const state = store.getState();
      const { playerTeam, rounds } = state.fight;

      return playerTeam.length > 0 && rounds.length > 0;
    },
  },
];
