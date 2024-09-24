import React from 'react'
import './ArticlesCard.css'
const ArticlesCard = ({Title,Description,Link}) => {
  return (
    <div className='box1 flex-col justify-start items-center flex'>
                
                <div className='overlay'>
                <h1 className='Articles relative text-start  text-purple-300 text-3xl font-normal '>{Title}</h1>
                  <br />
                  
                  <p className='text-start text-white'>{Description}</p>
                  <br />
                  <a href={Link} className="text-center w-full flex justify-start" ><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="inline-flex items-center px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                     Read more
                     <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </span>
                  </button></a>
                </div>
                  
      
              </div>
  )
}

export default ArticlesCard