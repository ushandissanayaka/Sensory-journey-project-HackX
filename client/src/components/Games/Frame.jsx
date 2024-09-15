import React from "react";
import "./Frame.css";

export const Frame = ({TagName}) => {
    return (
        <div className="frame">
            <div className="text-wrapper">{TagName}</div>
        </div>
    );
};
