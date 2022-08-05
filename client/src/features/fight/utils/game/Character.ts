import Emittery from 'emittery';

import { percent } from '~/utils/percent';
import type { UnifiedCharacterType, SpellType } from '~/features/character/types';
import { randomItem } from '~/utils/array';

import { Team } from './Team';
import type { CharacterEventMap } from './events';

export class Character extends Emittery<CharacterEventMap> {
  readonly id: string;
  readonly picture: string;
  readonly name: string;
  readonly team: Team;
  readonly maxHealth: number;
  #health: number;
  readonly maxMana: number;
  #mana: number;
  readonly #strength: number;
  readonly #criticalChance: number;
  readonly #criticalDamage: number;
  readonly #spells: SpellType[];


  constructor(character: UnifiedCharacterType, team: Team) {
    super();

    this.id = `${character.id}-${team}`;
    this.picture = character.picture;
    this.name = character.name;
    this.team = team;
    this.maxHealth = character.maxHealthPoints;
    this.#health = character.maxHealthPoints;
    this.maxMana = character.mana;
    this.#mana = character.mana;
    this.#strength = character.strength;
    this.#criticalChance = character.criticalChance;
    this.#criticalDamage = character.criticalDamage;
    this.#spells = character.spells;
  }

  //#region getters
  get health(): number {
    return this.#health;
  }

  get mana(): number {
    return this.#mana;
  }
  //#endregion

  //#region attack
  attack(target: Character): void {
    if (this.#strength >= target.#health || !this.canCastSpell()) {
      this.regularAttack(target);
    } else {
      this.castSpell(target);
    }
  }

  private regularAttack(target: Character): void {
    const isCriticalHit = this.isCriticalHit();

    const rawDamage = isCriticalHit
      ? this.applyCriticalDamage(this.#strength)
      : this.#strength;

    const damage = Math.round(rawDamage);

    this.emit('attack', {
      damage,
      isCriticalHit,
      target,
    });

    target.receiveDamage(damage);
  }

  private castSpell(target: Character): void {
    const spells = this.getCastableSpells();
    const spell = randomItem(spells);
    const isCriticalHit = this.isCriticalHit();

    let rawDamage = this.#strength + spell.power;
    rawDamage = isCriticalHit
      ? this.applyCriticalDamage(rawDamage)
      : rawDamage;

    const damage = Math.round(rawDamage);
    this.#mana -= spell.mana;

    this.emit('attack', {
      damage,
      isCriticalHit,
      target,
      spell,
    });

    target.receiveDamage(damage);
  }

  private receiveDamage(damage: number): void {
    this.#health = Math.max(0, this.#health - damage);

    this.emit('receiveDamage', { damage });

    if (!this.isAlive()) {
      this.emit('die', {});
    }
  }

  private isCriticalHit(): boolean {
    return percent.randomChance(this.#criticalChance);
  }

  private applyCriticalDamage(damage: number): number {
    const criticalMultiplier = percent.toMultiplier(this.#criticalDamage);
    return damage * (criticalMultiplier + 1);
  }
  //#endregion

  //#region life
  isAlive(): boolean {
    return this.#health > 0;
  }
  //#endregion

  //#region spells
  private getCastableSpells(): SpellType[] {
    return this.#spells.filter(spell => spell.mana <= this.#mana);
  }

  private canCastSpell(): boolean {
    return this.getCastableSpells().length > 0;
  }
  //#endregion
}
