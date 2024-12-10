import {QuestionTimer} from "./QuestionTimer.jsx";
import {Answers} from "./Answers.jsx";
import QUESTIONS from "../questions.js";
import {useState} from "react";
export function Question({index, onSelectAnswer , onSkippAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswers: '',
        isCorrect: null,
    })
    let timer = 10000;
    if(answer.selectedAnswers){
        timer = 1000;
    }
    if(answer.isCorrect !== null){
        timer = 2000;
    }
    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswers: answer,
            isCorrect: null
        })
        setTimeout(()=> {
            setAnswer({
                selectedAnswers: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000)
        },1000)
    }
    let answerState = '';
    if(answer.selectedAnswers && answer.isCorrect !== null){
        answerState = answer.isCorrect? 'correct': 'wrong';
    }else if(answer.selectedAnswers){
        answerState = 'answered'
    }
    return (
        <div id='question'>
            <QuestionTimer key={timer} timeout={timer} onTimeOut={answer.selectedAnswers === ''? onSkippAnswer: null} mode={answerState} />
            <h2>
                {QUESTIONS[index].text}
            </h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswers}
                answerState={answerState}
                handleSelectedAnswer={handleSelectAnswer}
            />
        </div>
    )
}