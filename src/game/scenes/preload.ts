import Phaser from "phaser";

export default class Preload extends Phaser.Scene{

    constructor(){

        super("Preload");

    }

    preload(){

        this.load.image("tiles","/tiles.png");

        this.load.spritesheet(

            "player",

            "/player.png",

            {

                frameWidth:32,

                frameHeight:32

            }

        );

    }

    create(){

        this.scene.start("World");

    }

}
