import React from "react";
import { useEffect } from "react";
import Answers from "./Answers";

export default function Questions(){
    const [qanda, setQandA] = React.useState([])
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0)
    const [showResult, setShowResult] = React.useState(false)

    React.useEffect(() => {
        if(qanda.length === 0){
        fetch("https://opentdb.com/api.php?amount=5&category=23")
        .then (req => req.json())
        .then (data => {
            setQandA(data.results.map(obj => {
                return {
                questions: obj.question,
                answers: shuffle([...obj.incorrect_answers, obj.correct_answer]),
                correct: obj.correct_answer,
                selected: "",
            }}))
        })
    }
      }, [qanda])

      function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      }

     function updateAnswer(currQuestion, answer){
            setQandA(qanda.map((obj) => {
                return obj.questions === currQuestion ? 
                {...obj, selected: answer} : obj
            })) 
      }

      const mapped = qanda.map((obj, index) => {
            return <Answers key={index}
                            questions={obj.questions}
                            answers={obj.answers}
                            updateAnswer={updateAnswer}
                            selected={obj.selected}
                            correct={obj.correct}
                            showResult={showResult}/>
      })

      function checkAnswers(){
        qanda.forEach((obj) => {
            // compare selected answer & correct answer
            if (obj.selected === obj.correct) {
              setNumCorrectAnswers(
                (prevNumCorrectAnswers) => prevNumCorrectAnswers + 1
              )
            }
          })

          // show result
          setShowResult(true);
      }

      function playAgain(){
            setQandA([])
            setNumCorrectAnswers(0)
            setShowResult(false)
      }

      return (
        <div className="questions-page">
          {mapped}
            {qanda.length > 0 && !showResult && ( // Update the conditional rendering
              <button className="check-btn" onClick={checkAnswers}>
                Check answers
              </button>
            )}
            {showResult && (
              <div className="results">
                <p>
                  You scored {numCorrectAnswers}/5 correct answers
                </p>
                <button className="play-again-btn" onClick={playAgain}>
                  Play again
                </button>
              </div>
            )}
          </div>
      )
}