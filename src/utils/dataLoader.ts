import pokemonData from '@/src/data/pokemon.json';
import movesData from '@/src/data/moves.json';
import itemsData from '@/src/data/items.json';

export function getPokemonById(id: string) {
  // @ts-ignore
  return pokemonData[id] || null;
}

export function getMoveByName(moveName: string) {
  // @ts-ignore
  return movesData[moveName] || null;
}

export function getAllItems() {
  return itemsData;
}
