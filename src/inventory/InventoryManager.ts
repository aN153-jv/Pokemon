import { getItem, Item } from '@/src/utils/itemLoader';

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export class InventoryManager {
  // Inventaire de départ du joueur
  items: InventoryItem[] = [
    { itemId: 'potion', quantity: 3 },
    { itemId: 'pokeball', quantity: 5 }
  ];

  getBagContents() {
    return this.items.map(slot => ({
      ...getItem(slot.itemId),
      quantity: slot.quantity,
      id: slot.itemId
    })).filter(item => item.name !== undefined);
  }

  useItem(itemId: string): boolean {
    const slot = this.items.find(i => i.itemId === itemId);
    if (slot && slot.quantity > 0) {
      slot.quantity -= 1;
      return true;
    }
    return false;
  }
}
