export interface Item {
  id: string;
  name: string;
  quantity: number;
  effect: 'heal' | 'catch';
  value: number;
}

export class InventoryManager {
  items: Item[] = [
    { id: 'potion', name: 'Potion', quantity: 5, effect: 'heal', value: 20 },
    { id: 'pokeball', name: 'Poké Ball', quantity: 3, effect: 'catch', value: 1 }
  ];

  useItem(itemId: string): Item | undefined {
    const item = this.items.find(i => i.id === itemId);
    if (item && item.quantity > 0) {
      item.quantity -= 1;
      return item;
    }
    return undefined;
  }
}
