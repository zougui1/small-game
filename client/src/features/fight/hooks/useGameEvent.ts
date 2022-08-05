import { useEffect } from 'react';

import type { Game, GameEventMap } from '~/features/fight/utils/game';

export const useGameEvent = <K extends keyof GameEventMap>(
  game: Game,
  event: K,
  listener: (event: GameEventMap[K]) => ((() => void) | void),
  dependencies: React.DependencyList,
): void => {
  useEffect(() => {
    let maybeCleanup: (() => void) | void;

    const handler = (event: GameEventMap[K]) => {
      maybeCleanup = listener(event);
    }

    game.on(event, handler);

    return () => {
      game.off(event, handler);

      if (typeof maybeCleanup === 'function') {
        maybeCleanup();
      }
    };
  }, [game, ...dependencies]);
}
