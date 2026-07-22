"use client";

import { useEffect } from "react";

import StartGame from "../src/game/Game";

export default function Home(){

    useEffect(()=>{

        StartGame("game");

    },[]);

    return(

        <div
            id="game"
            style={{
                width:"960px",
                height:"540px",
                margin:"auto"
            }}
        />

    );

}
