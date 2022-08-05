import Emittery from 'emittery';

import { wait } from '~/utils/promise';
import { UnifiedCharacterType } from '~/features/character/types';

import { Character } from './Character';
import { Team } from './Team';
import { Round } from './Round';
import { Timings } from './Timings';
import type { GameEventMap } from './events';

export class Game extends Emittery<GameEventMap> {
  readonly playerTeam: Character[];
  readonly enemyTeams: Character[][];
  #rounds: Round[];
  #currentRoundIndex: number = 0;
  #winningTeam: Team = Team.enemy;
  #state: GameState = GameState.idle;

  constructor(playerTeam: UnifiedCharacterType[], enemyTeams: UnifiedCharacterType[][]) {
    super();

    this.playerTeam = playerTeam.map(character => {
      return new Character(character, Team.player);
    });

    this.enemyTeams = enemyTeams.map((enemies, teamIndex) => {
      return enemies.map(enemy => {
        enemy = {
          ...enemy,
          id: `${enemy.id}-${teamIndex}`,
        };

        return new Character(enemy, Team.enemy);
      });
    });

    this.#rounds = this.enemyTeams.map(enemies => {
      return new Round(this.playerTeam, enemies);
    });

    this.inheritEvents(this.#rounds);
  }

  //#region play
  async play(): Promise<void> {
    this.#state = GameState.running;

    while (await this.playRound()) {
      await wait(Timings.roundDelay);
    }

    if (this.#winningTeam === Team.player) {
      this.#state = GameState.won;
      this.emit('win', {});
    } else {
      this.#state = GameState.lost;
      this.emit('lose', {});
    }
  }

  private async playRound(): Promise<boolean> {
    const round = this.#rounds?.shift();

    if (!round) {
      return false;
    }

    const roundNth = this.#currentRoundIndex + 1;

    this.emit('startRound', { nth: roundNth });
    const winningTeam = await round.play();

    this.#winningTeam = winningTeam;
    this.#currentRoundIndex = roundNth;

    this.emit('endRound', {
      nth: roundNth,
      win: winningTeam === Team.player,
    });

    return true;
  }
  //#endregion

  //#region rounds events
  private inheritEvents(rounds: Round[]): void {
    for (const round of rounds) {
      round.on('attack', event => this.emit('attack', event));
      round.on('receiveDamage', event => this.emit('receiveDamage', event));
      round.on('play', event => this.emit('play', event));
      round.on('die', event => this.emit('die', event));
    }
  }
  //#endregion

  //#region getters
  get state(): GameState {
    return this.#state;
  }
  //#endregion

  getEnemyTeam(): Character[] {
    return this.enemyTeams[this.#currentRoundIndex] || [];
  }
}

export enum GameState {
  idle = 'idle',
  running = 'running',
  won = 'won',
  lost = 'lost',
}
