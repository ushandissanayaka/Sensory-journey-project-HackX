import React, { useState } from "react";
import "./UserGames.css";
import Layout from "../../components/Layout";
import { GameView } from "../../components/Games/GameView";
import FrameWrapper from "../../components/Games/FrameWrapper";
const UserGames = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  return (
    <Layout
      children={
        <div className="w-full  bg-purple-500" style={{ height: "90vh" }}>
          <h1 className="head text-6xl font-semibold text-gray-500   text-center font-sedgwick">
            Sensory Games
          </h1>
          <div className="filling">
            <div className="relative left-5 h-fit w-fit top-16  ">
              <FrameWrapper
                className=""
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            </div>
            <div className="userGamesCardContaier">
              <GameView
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              ></GameView>
            </div>
          </div>
        </div>
      }
    ></Layout>
  );
};

export default UserGames;
