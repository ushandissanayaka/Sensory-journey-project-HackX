import PropTypes from "prop-types";
import React from "react";
import "./GameCardSlice.css";

export const GameCardSlice = ({
    slice,
    mobileGameConsole = "mobile-game-console-line-gradient-circle-background-icon-vector-1.png",
}) => {
    return (
        <div className="slice">
            <div className="overlap-group">
                <img className="img" alt="Slice" src={slice} />
                <div className="text-wrapper">Color Safari</div>
                <p className="div">Join the safari and match animals with their favorite colors</p>
                <div className="rectangle" />
                <div className="rectangle-2" />
                <div className="pattern-recognition"> Pattern Recognition</div>
                <div className="text-wrapper-2">Visual</div>
                <img className="mobile-game-console" alt="Mobile game console" src={mobileGameConsole} />
            </div>
        </div>
    );
};

GameCardSlice.propTypes = {
    slice: PropTypes.string,
    mobileGameConsole: PropTypes.string,
};
