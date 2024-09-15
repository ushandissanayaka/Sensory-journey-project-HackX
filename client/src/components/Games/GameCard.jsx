import React from "react";
import { GameCardSlice } from "./GameCardSlice";
import "./GameCard.css";
import pic1 from './GameCard1.png'
export const GameCard = () => {
    return (
        <div className="game-card border">
            <GameCardSlice
                className="slice-1"
                mobileGameConsole="GameCardConsole.png"
                overlapGroupClassName="slice-instance"
                slice=''
            />
        </div>
    );
};
