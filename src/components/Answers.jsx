import QUESTIONS from "../questions.js";
import {useRef} from "react";

export function Answers({answers, selectedAnswer, answerState, handleSelectedAnswer}) {
    const shuffleAnswers = useRef();
    if(!shuffleAnswers.current) {
        shuffleAnswers.current = [...answers]
        shuffleAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <>
            <ul id="answers">
                {shuffleAnswers.current.map((answer) => {
                    const isSelected = selectedAnswer === answer;
                    let cssClasses = '';
                    if(answerState === 'answered' && isSelected){
                        cssClasses = 'selected';
                    }
                    if((answerState === 'correct'|| answerState === 'wrong') && isSelected){
                        cssClasses = answerState;
                    }
                    return <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)} className={cssClasses} disabled={answerState !== ''}>{answer}</button>
                    </li>
                })}
            </ul>

        </>
    )
}