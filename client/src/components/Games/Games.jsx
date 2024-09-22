import React,{useState} from 'react'
import Navbar from '../Navbar/Navbar'
import './Games.css'
import FrameWrapper from './FrameWrapper'
import GameCard1 from '../../assets/GameCard1.png'
import { GameView } from './GameView'


const Games = ({height}) => {
  const [selectedTag,setSelectedTag]=useState(null);
  return (
    <>
    <Navbar></Navbar>
    <div className='desktop' style={{ minHeight: `${height}` }}>
    <div className="frame-3319-wrapper  flex justify-center">
    <FrameWrapper selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
</div>
<div className='GamesCardContainer'>
<GameView selectedTag={selectedTag} setSelectedTag={setSelectedTag}></GameView>
</div>
    
</div>


    </>
  )
}

export default Games