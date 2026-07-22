import itemsData from '@/src/data/items.json';

export interface Item {
  id: string;
  name: string;
  effect: 'heal' | 'catch';
  value: number;
  description: string;
}

export function getItem(itemId: string): Item | null {
  // @ts-ignore
  return itemsData[itemId] || null;
}
