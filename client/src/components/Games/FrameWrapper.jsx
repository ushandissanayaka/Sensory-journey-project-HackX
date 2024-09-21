import React from 'react'
import './FrameWrapper.css'
import { Frame } from './Frame'
const FrameWrapper = ({setSelectedTag}) => {
  const tags=['All Games','Visual','Sound','Creativity','Shape Recognition','Spatial Awareness','Fine Motor Skills','Pattern Recognition','Color Exploration']
  return (
    <div className="frame-wrapper">
      {tags.map((tag)=>{
        return <Frame setSelectedTag={setSelectedTag} TagName={tag} key={tag} />
      })}
      

    
</div>
  )
}

export default FrameWrapper