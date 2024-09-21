import React from "react";
import "./Frame.css";
import GameCardConsole from '../../assets/GameCardConsole.png'
export const Frame = ({selectedTag,TagName,setSelectedTag}) => {
    return (
        
        <button onClick={()=>{ TagName==='All Games' ? setSelectedTag(null) :setSelectedTag(TagName)}} className="frame tag py-0.5 px-2 w-full text-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-2xl border border-neutral-500 flex">
        {TagName} {selectedTag===TagName || (TagName==='All Games' && selectedTag===null) ? <img src={GameCardConsole} className="w-7 h-7 right-4 absolute" alt="" /> : <></>}
         </button>
    );
};
