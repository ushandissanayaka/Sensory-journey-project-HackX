import React from "react";
import { GameCard } from "./GameCard";

import "./GameView.css";
import GameCard1 from '../../assets/GameCard1.png'
import GameCard2 from '../../assets/GameCard2.png'
import GameCard3 from '../../assets/GameCard3.png'
export const GameView = () => {
    return (
        <div id='card-area'>
  <div className='wrapper '>
    
      <GameCard GameName={'Color Safari'} GameDescription={'Join and color animals and feed the fuckers and huuiiyaaa hale haleee'} GamePhoto={GameCard1} Tag1={'Visual'} Tag2={'Pattern Recognition'}></GameCard>
      <GameCard GameName={'Scribbler Splash'} GameDescription={'Unleash your creativity with vibrant strokes and playful textures on a blank canvas!'} GamePhoto={GameCard2} Tag1={'Creativity'} Tag2={'Fine Motor Skills'}></GameCard>
      <GameCard GameName={'Bubble Pop'} GameDescription={'Pop colorful bubbles as they float across the screen!'} GamePhoto={GameCard3} Tag1={'Visual'} Tag2={'Sound'}></GameCard>
      
     
      

    
  </div>
</div>
    );
};
