import { CharacterType } from '~/types/character';

export const unifyCharacters = (characters: CharacterType[]): (CharacterType & { id: string })[] => {
  const characterMap: Record<string, CharacterType[]> = {};

  const unifiedCharacters = characters.map(character => {
    characterMap[character._id] ||= [];
    characterMap[character._id].push(character);

    return {
      ...character,
      id: `${character._id}-${characterMap[character._id].length}`,
    };
  });

  return unifiedCharacters;
}
