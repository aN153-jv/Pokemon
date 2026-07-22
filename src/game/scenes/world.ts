import Phaser from "phaser";

export default class World extends Phaser.Scene{

    player!:Phaser.Physics.Arcade.Sprite;

    cursors!:Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(){

        super("World");

    }

    create(){

        this.player=this.physics.add.sprite(

            200,

            200,

            "player",

            0

        );

        this.player.setCollideWorldBounds(true);

        this.cursors=this.input.keyboard.createCursorKeys();

    }

    update(){

        this.player.setVelocity(0);

        const speed=180;

        if(this.cursors.left.isDown){

            this.player.setVelocityX(-speed);

        }

        if(this.cursors.right.isDown){

            this.player.setVelocityX(speed);

        }

        if(this.cursors.up.isDown){

            this.player.setVelocityY(-speed);

        }

        if(this.cursors.down.isDown){

            this.player.setVelocityY(speed);

        }

    }

}
