import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x3b82f6);
    graphics.fillRect(0, 0, 32, 32);

    graphics.generateTexture("player", 32, 32);
    graphics.destroy();
  }

  create() {
    this.scene.start("World");
  }
}
