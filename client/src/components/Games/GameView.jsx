import { useNavigate } from "react-router-dom"; // Import useNavigate
import { GameCard } from "./GameCard";

import "./GameView.css";
import GameCard1 from "../../assets/GameCard1.png";
import GameCard2 from "../../assets/GameCard2.png";
import GameCard3 from "../../assets/GameCard3.png";
export const GameView = ({ selectedTag, setSelectedTag }) => {
    const navigate = useNavigate(); // Use navigate hook

    const handleNavigate = (link) => () => {
        navigate(link); // Use navigate for internal routing
    };

  const games = [
    {
      GameName: "Color Safari",
      GameDescription: "Join and color animals and feed them",
      GamePhoto: GameCard1,
      Tag1: "Visual",
      Tag2: "Pattern Recognition",
      link: "/memorygame",
    },
    {
      GameName: "Scribbler Splash",
      GameDescription:
        "Unleash your creativity with vibrant strokes and playful textures on a blank canvas!",
      GamePhoto: GameCard2,
      Tag1: "Creativity",
      Tag2: "Fine Motor Skills",
      link: "/memoryquest",
    },
    {
      GameName: "Bubble Pop",
      GameDescription: "Pop colorful bubbles as they float across the screen!",
      GamePhoto: GameCard3,
      Tag1: "Visual",
      Tag2: "Sound",
      link: "/memorygame",
    },
    {
      GameName: "Bubble Pop",
      GameDescription: "Pop colorful bubbles as they float across the screen!",
      GamePhoto: GameCard3,
      Tag1: "Visual",
      Tag2: "Sound",
      link: "/memorygame",
    },
    {
      GameName: "Bubble Pop",
      GameDescription: "Pop colorful bubbles as they float across the screen!",
      GamePhoto: GameCard3,
      Tag1: "Visual",
      Tag2: "Sound",
      link: "/memorygame",
    },
  ];
  const filteredGames = selectedTag
    ? games.filter(
        (game) => game.Tag1 === selectedTag || game.Tag2 === selectedTag
      )
    : games;

  return (
    <div id="card-area">
      <div className="wrapper ">
        {/* <GameCard GameName={'Color Safari'} GameDescription={'Join and color animals and feed them'} GamePhoto={GameCard1} Tag1={'Visual'} Tag2={'Pattern Recognition'}></GameCard>
      <GameCard GameName={'Scribbler Splash'} GameDescription={'Unleash your creativity with vibrant strokes and playful textures on a blank canvas!'} GamePhoto={GameCard2} Tag1={'Creativity'} Tag2={'Fine Motor Skills'}></GameCard>
      <GameCard GameName={'Bubble Pop'} GameDescription={'Pop colorful bubbles as they float across the screen!'} GamePhoto={GameCard3} Tag1={'Visual'} Tag2={'Sound'}></GameCard>
       */}
        {filteredGames.map((game, index) => (
          <GameCard
            key={index}
            GameName={game.GameName}
            GameDescription={game.GameDescription}
            GamePhoto={game.GamePhoto}
            GameLink={game.link}
            Tag1={game.Tag1}
            Tag2={game.Tag2}
            onTagClick={setSelectedTag}
          ></GameCard>
        ))}
      </div>
    </div>
  );
};
