import Phaser from "phaser";
import Config from "./Config";

export default class Game extends Phaser.Game {
  constructor(parent: string) {
    super({
      ...Config,
      parent,
    });
  }
}
