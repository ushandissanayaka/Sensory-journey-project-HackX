import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Games.css'
import FrameWrapper from './FrameWrapper'
import GameCard1 from '../../assets/GameCard1.png'
import { GameView } from './GameView'


const Games = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="desktop">
    <div className="frame-3319-wrapper  flex justify-center">
    <FrameWrapper />
</div>
    <GameView></GameView>
</div>


    </>
  )
}

export default Games