import React from 'react'
import './ResourceCard.css'
import { Link } from 'react-router-dom'

const ResourceCard = ({ArticlePic,Title,Description,nextLink}) => {
  return (
    <div className='box1 flex-col justify-start items-center gap-3 inline-flex'>
                <img src={ArticlePic} className='top-12 relative max-w-16 min-w-14 h-14 mix-blend-darken' alt="" />
                <h1 className='Articles relative top-16 text-center   w-40 h-11 text-black text-4xl font-normal '>{Title}</h1>
                  <div className='overlay1 text-white'>
                  
                  <p className='text-center'>{Description}</p>
                  <Link to={nextLink} className="text-center w-full flex justify-center" ><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                     Continue..
                    </span>
                  </button></Link>
                  </div>
      
              </div>
  )
}

export default ResourceCard