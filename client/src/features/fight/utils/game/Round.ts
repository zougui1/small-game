import Emittery from 'emittery';

import { Character } from './Character';
import { Turn } from './Turn';
import { Team } from './Team';
import type { RoundEventMap } from './events';

export class Round extends Emittery<RoundEventMap> {
  #playerTeam: Character[];
  #enemyTeam: Character[];

  constructor(playerTeam: Character[], enemyTeam: Character[]) {
    super();

    this.#playerTeam = playerTeam;
    this.#enemyTeam = enemyTeam;
  }

  //#region play
  async play(): Promise<Team> {
    while (true) {
      const turn = new Turn(this.#playerTeam, this.#enemyTeam);

      this.inheritEvents(turn);
      const aliveTeams = await turn.play();
      turn.clearListeners();

      if (!aliveTeams.includes(Team.player)) {
        return Team.enemy;
      }

      if (!aliveTeams.includes(Team.enemy)) {
        return Team.player;
      }
    }
  }
  //#endregion

  //#region turns events
  private inheritEvents(turn: Turn): void {
    turn.on('attack', event => this.emit('attack', event));
    turn.on('receiveDamage', event => this.emit('receiveDamage', event));
    turn.on('die', event => this.emit('die', event));
    turn.on('play', event => this.emit('play', event));
  }
  //#endregion
}
