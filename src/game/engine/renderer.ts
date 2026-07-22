import { Route1 } from "../maps/Route1";

export default class Renderer {

    static tileSize = 32;

    static draw(scene: Phaser.Scene) {

        for (let y = 0; y < Route1.length; y++) {

            for (let x = 0; x < Route1[y].length; x++) {

                const tile = Route1[y][x];

                let color = 0xffffff;

                switch (tile) {

                    case 0:
                        color = 0x2e7d32;
                        break;

                    case 1:
                        color = 0x66bb6a;
                        break;

                    case 2:
                        color = 0x2196f3;
                        break;

                    case 3:
                        color = 0xb5651d;
                        break;

                }

                const rect = scene.add.rectangle(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize,
                    color
                );

                rect.setOrigin(0);

            }

        }

    }

}
