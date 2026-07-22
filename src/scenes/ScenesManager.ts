export type GameState = 'WORLD' | 'BATTLE' | 'MENU';

export class SceneManager {
  currentState: GameState = 'WORLD';

  switchState(newState: GameState) {
    this.currentState = newState;
  }
}
