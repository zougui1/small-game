import type { SpellType } from '~/features/character/types';

import type { Character } from './Character';

//#region character events
export interface CharacterEventMap {
  attack: CharacterAttackEvent;
  receiveDamage: CharacterReceiveDamageEvent;
  die: {};
}

export interface CharacterAttackEvent {
  target: Character;
  isCriticalHit: boolean;
  damage: number;
  spell?: SpellType | undefined;
}

export interface CharacterReceiveDamageEvent {
  damage: number;
}
//#endregion

//#region turn events
export interface TurnEventMap {
  attack: TurnAttackEvent;
  receiveDamage: TurnReceiveDamageEvent;
  play: TurnPlayEvent;
  die: TurnDieEvent;
}

export interface TurnAttackEvent extends CharacterAttackEvent {
  recipient: Character;
}

export interface TurnReceiveDamageEvent extends CharacterReceiveDamageEvent {
  character: Character;
}

export interface TurnDieEvent {
  character: Character;
}

export interface TurnPlayEvent {
  recipient: Character;
  target: Character;
}
//#endregion

//#region round events
export interface RoundEventMap {
  attack: RoundAttackEvent;
  receiveDamage: RoundReceiveDamageEvent;
  play: RoundPlayEvent;
  die: RoundDieEvent;
}

export interface RoundAttackEvent extends TurnAttackEvent {}

export interface RoundReceiveDamageEvent extends TurnReceiveDamageEvent {}

export interface RoundDieEvent extends TurnDieEvent {}

export interface RoundPlayEvent extends TurnPlayEvent {}
//#endregion

//#region game events
export interface GameEventMap {
  attack: GameAttackEvent;
  receiveDamage: GameReceiveDamageEvent;
  play: GamePlayEvent;
  die: GameDieEvent;
  startRound: GameStartRoundEvent;
  endRound: GameEndRoundEvent;
  win: {};
  lose: {};
}

export interface GameAttackEvent extends RoundAttackEvent {}

export interface GameReceiveDamageEvent extends RoundReceiveDamageEvent {}

export interface GameDieEvent extends RoundDieEvent {}

export interface GamePlayEvent extends RoundPlayEvent {}

export interface GameStartRoundEvent {
  nth: number;
}

export interface GameEndRoundEvent {
  nth: number;
  win: boolean;
}
//#endregion
