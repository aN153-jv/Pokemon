import Phaser from "phaser";

export const config: Phaser.Types.Core.GameConfig = {

    type: Phaser.AUTO,

    width: 960,

    height: 540,

    pixelArt: true,

    physics: {

        default: "arcade",

        arcade: {

            debug: false

        }

    }

};
