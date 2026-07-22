// Exemple de structure pour votre affichage de combat
export function renderBattleUI(player: any, enemy: any, onAttack: (index: number) => void) {
  return `
    <div class="battle-arena">
      <div class="enemy-stats">${enemy.name} - HP: ${enemy.hp}/${enemy.maxHp}</div>
      <div class="player-stats">${player.name} - HP: ${player.hp}/${player.maxHp}</div>
    </div>
  `;
}
