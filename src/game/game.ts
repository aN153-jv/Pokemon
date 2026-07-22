import Phaser from "phaser";

import { config } from "./config";

import Boot from "./scenes/Boot";
import Preload from "./scenes/Preload";
import World from "./scenes/World";

export default function StartGame(container:string){

    return new Phaser.Game({

        ...config,

        parent:container,

        scene:[

            Boot,

            Preload,

            World

        ]

    });

}
