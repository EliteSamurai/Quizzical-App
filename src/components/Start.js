import React from "react";

export default function Start(props){
    return(
        <div className="start-container">
            <span className="yellow-blob"></span>
            <h1>Quizzical</h1>
            <p>Let's see how smart you are.</p>
            <button className="start-btn" onClick={props.mainPage}>Start quiz</button>
        </div>
    )
}
