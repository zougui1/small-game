export interface SpellType {
  name: string;
  power: number
  mana: number;
}

export interface CharacterType {
  _id: string;
  id?: string | undefined;
  name: string;
  picture: string
  maxHealthPoints: number;
  strength: number;
  mana: number;
  criticalChance: number;
  criticalDamage: number;
  spells: SpellType[]
}

export interface UnifiedCharacterType extends Omit<CharacterType, 'id'> {
  id: string;
}
