import React from 'react'
import {decode} from 'html-entities';

export default function Answers(props){

    function clickAnswer(answer, currQuestion){
        props.updateAnswer(currQuestion, answer)
        
    }

    const mapped = props.answers.map((answer, index) => {
        return <button onClick={() => clickAnswer(answer, props.questions)} 
        className={`unselected-btn ${props.selected === answer ? 'selected' : ""}
        ${props.showResult && answer === props.correct ? 'correct' : ''}
        ${props.showResult && answer === props.selected 
            && answer !== props.correct ? 'wrong' : ''}
        ${props.showResult && answer !== props.correct ? 'dimmed' : '' }`}   
        disabled={props.showResult}     
        key={index}>{decode(answer)}</button>
    })

    

    return <div className='question'>
            <h4>{decode(props.questions)}</h4>
            {mapped}
            </div>
}

