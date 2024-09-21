import React from "react";
import "./Frame.css";

export const Frame = ({TagName,setSelectedTag}) => {
    return (
        
        <button onClick={()=>{ TagName==='All Games' ? setSelectedTag(null) :setSelectedTag(TagName)}} className="frame tag py-0.5 px-2 w-full text-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 rounded-2xl border border-neutral-500">
        {TagName}
         </button>
    );
};
