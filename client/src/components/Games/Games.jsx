import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Games.css'
import FrameWrapper from './FrameWrapper'
import { GameView } from './GameView'

const Games = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="desktop">
    <div className="frame-3319-wrapper flex justify-start items-center pl-6">
    <FrameWrapper className="frame-3319" />
</div>
<div className='flex justify-start items-center'><GameView></GameView></div>

</div>


    </>
  )
}

export default Games