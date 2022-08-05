import { useState, useEffect, useMemo } from 'react';

import { Timings, Game, GameState, Character } from '~/features/fight/utils/game';
import { useGameEvent } from '~/features/fight/hooks';
import type { UnifiedCharacterType } from '~/features/character/types';

export const useGame = ({ playerTeam, enemyTeams }: UseGameOptions): UseGameResult => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [attackInfo, setAttackInfo] = useState<AttackObject>();
  const [state, setState] = useState<GameState>(GameState.idle);

  const game = useMemo(() => {
    return new Game(playerTeam, enemyTeams);
  }, [playerTeam, enemyTeams]);

  useGameEvent(game, 'attack', event => {
    setAttackInfo({
      recipient: event.recipient,
      target: event.target,
    });

    setTimeout(() => {
      setAttackInfo(attack => ({
        ...attack,
        target: undefined,
      }));

      setTimeout(() => {
        setAttackInfo(undefined);
      }, 300);
    }, Timings.attackingDuration);
  }, []);

  useGameEvent(game, 'die', event => {
    console.log(`${event.character.id} dies`);
  }, []);

  useGameEvent(game, 'startRound', event => {
    setCurrentRoundIndex(event.nth - 1);
  }, []);

  useGameEvent(game, 'win', () => {
    setState(GameState.won);
  }, []);

  useGameEvent(game, 'lose', () => {
    setState(GameState.lost);
  }, []);

  useEffect(() => {
    const playTimeout = setTimeout(() => {
      game.play();
    }, 1000);

    return () => clearTimeout(playTimeout);
  }, [game]);

  return {
    round: currentRoundIndex + 1,
    playerTeam: game.playerTeam,
    enemyTeam: game.getEnemyTeam(),
    state,
    attackInfo,
  };
}

export interface UseGameOptions {
  playerTeam: UnifiedCharacterType[];
  enemyTeams: UnifiedCharacterType[][];
}

export interface UseGameResult {
  round: number;
  playerTeam: Character[];
  enemyTeam: Character[];
  state: GameState;
  attackInfo: AttackObject | undefined;
}

export interface AttackObject {
  recipient?: Character | undefined;
  target?: Character | undefined;
}
