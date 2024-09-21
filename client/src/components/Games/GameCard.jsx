import React from "react";
import { Link } from "react-router-dom";

import "./GameCard.css";

export const GameCard = ({
    GameName,GameDescription,GamePhoto,Tag1,Tag2,GameLink='#',onTagClick
}) => {
    return (
        <div className='box'>
        <img src={GamePhoto} alt="" />
        <div className='overlay  '>
          <h3 className="w-full rounded-xl">{GameName}</h3>
          <p className="">{GameDescription}</p>
          <Link to={GameLink} className="text-center w-full flex justify-center" ><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Play Now
          </span>
          </button></Link>
          
           <div className="tags h-4 justify-start items-center gap-3.5 inline-flex">
          <button onClick={()=>onTagClick(Tag1)} className="tag py-0.5 px-2 w-fit text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-2xl border border-neutral-500 justify-center items-center gap-2.5 flex">
         {Tag1}
          </button>
          <button onClick={()=>onTagClick(Tag2)} className="tag py-0.5 px-2 w-fit text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-2xl border border-neutral-500 justify-center items-center gap-2.5 flex">
          {Tag2}
          </button>
          </div>
          
        </div>
      </div>
    );
};
