import {useCallback, useRef, useState} from "react";
import QUESTIONS from "../questions.js"

import {QuestionTimer} from "./QuestionTimer.jsx";
import {Answers} from "./Answers.jsx";
import {Question} from "./Question.jsx";
import {Summary} from "./Summary.jsx";
export function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    const activeQuestionIndex =  userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
    const handleSelectedAnswer = useCallback(function handleSelectedAnswer(selectedAnswer){
        setUserAnswers(prevState => [...prevState, selectedAnswer])
    }, [])

    const handleSkippAnswer = useCallback(()=> handleSelectedAnswer(null), [handleSelectedAnswer])
    if(quizIsComplete){
        return <Summary userAnswers={userAnswers} />
    }
    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectedAnswer}
                onSkippAnswer={handleSkippAnswer}
            />
        </div>
    )
}