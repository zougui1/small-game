import { CharactersScreen } from '~/features/character/screens/CharactersScreen';
import { CharacterDetailsScreen } from '~/features/character/screens/CharacterDetailsScreen';
import { FightConfigScreen } from '~/features/fight/screens/FightConfigScreen';
import { FightScreen, fightScreenGuards } from '~/features/fight/screens/FightScreen';
import type { GuardType } from '~/components/navigation/Guard';

export const routes: RouteType[] = [
  {
    path: '/characters',
    element: <CharactersScreen />,
  },
  {
    path: '/characters/:id',
    element: <CharacterDetailsScreen />,
  },
  {
    path: '/fight-config',
    element: <FightConfigScreen />,
  },
  {
    path: '/fight',
    element: <FightScreen />,
    guards: fightScreenGuards,
  },
];

export interface RouteType {
  path: string;
  element: JSX.Element;
  guards?: GuardType[] | undefined;
}
