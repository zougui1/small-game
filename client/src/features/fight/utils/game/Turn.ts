import Emittery from 'emittery';
import _ from 'lodash';

import { randomItem } from '~/utils/array';
import { wait } from '~/utils/promise';

import { Character } from './Character';
import { Timings } from './Timings';
import { Team } from './Team';
import type { TurnEventMap } from './events';

export class Turn extends Emittery<TurnEventMap> {
  #playerTeam: Character[];
  #enemyTeam: Character[];
  #characters: Character[];

  constructor(playerTeam: Character[], enemyTeam: Character[]) {
    super();

    this.#playerTeam = playerTeam;
    this.#enemyTeam = enemyTeam;
    this.#characters = [...playerTeam, ...enemyTeam];

    this.inheritEvents(this.#characters);
  }

  //#region play
  async play(): Promise<Team[]> {
    while (this.playTurn()) {
      await wait(Timings.turnDelay);
    }

    const aliveCharacters = this.getAliveCharacters([...this.#playerTeam, ...this.#enemyTeam]);
    const aliveTeams = aliveCharacters.map(character => character.team);

    return _.uniq(aliveTeams);
  }

  private playTurn(): boolean {
    const [recipient, ...aliveCharacters] = this.getAliveCharacters(this.#characters);
    this.#characters = aliveCharacters;

    if (!recipient) {
      return false;
    }

    const potentialTargets = recipient.team === Team.player
      ? this.#enemyTeam
      : this.#playerTeam;

    const target = randomItem(this.getAliveCharacters(potentialTargets));

    if (!target) {
      return false;
    }

    this.emit('play', {
      recipient,
      target,
    });
    recipient.attack(target);

    return true;
  }
  //#endregion

  //#region teams
  private getAliveCharacters(characters: Character[]): Character[] {
    return characters.filter(character => character.isAlive());
  }

  private findFirstAlive(characters: Character[]): Character | undefined {
    return characters.find(character => character.isAlive());
  }
  //#endregion

  //#region characters events
  private inheritEvents(characters: Character[]): void {
    for (const character of characters) {
      character.on('attack', event => {
        this.emit('attack', { ...event, recipient: character });
      });

      character.on('receiveDamage', event => {
        this.emit('receiveDamage', { ...event, character });
      });

      character.on('die', event => {
        this.emit('die', { ...event, character });
      });
    }
  }
  //#endregion
}
