import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './SkillsCenters.css'
import SkillsView from './SkillsView'
const SkillsCenters = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='desktop2'>
    <div className='GamesCardContainer2 border'>
<SkillsView></SkillsView>
</div>
    </div>
    
    </>
  )
}

export default SkillsCenters