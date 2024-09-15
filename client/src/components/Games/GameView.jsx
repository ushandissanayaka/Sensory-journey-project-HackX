import React from "react";
import { GameCard } from "./GameCard";
import "./GameView.css";

export const GameView = () => {
    return (
        <div className="games-view">
            <div className="game-card-wrapper">
                <GameCard />
            </div>
        </div>
    );
};
