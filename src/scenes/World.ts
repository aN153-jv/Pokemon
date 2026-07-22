import Phaser from "phaser";

export default class World extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("World");
  }

  create() {
    const tileSize = 32;
    const mapWidth = 100;
    const mapHeight = 100;

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const color = (x + y) % 2 === 0 ? 0x6ee7b7 : 0x34d399;

        const tile = this.add.rectangle(
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize,
          color
        );

        tile.setOrigin(0);
      }
    }

    this.player = this.physics.add.sprite(400, 300, "player");
    this.player.setCollideWorldBounds(true);

    this.physics.world.setBounds(
      0,
      0,
      mapWidth * tileSize,
      mapHeight * tileSize
    );

    this.cameras.main.setBounds(
      0,
      0,
      mapWidth * tileSize,
      mapHeight * tileSize
    );

    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(2);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 160;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}
