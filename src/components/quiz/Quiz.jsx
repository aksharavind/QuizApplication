import React, { useEffect, useState } from "react";
import axios from "axios";
import './Quiz.css';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [quizEnd, setQuizEnd] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); 
    useEffect(() => {
        axios.get("http://localhost:8080/api/questions")
            .then((response) => setQuestions(response.data))
            .catch((error) => console.error(error));
    }, []);

    const question = questions[index];

    const checkAns = (ans) => {
        if (!lock && question) {
            setSelectedOption(ans);
            if (question.ans === ans) {
                setScore(score + 1);
            }
            setLock(true);
        }
    };

    const nextQuestion = () => {
        if (index < questions.length - 1) {
            setIndex(index + 1);
            setLock(false);
            setSelectedOption(null); 
        } else {
            setQuizEnd(true);
        }
    };

    return (
        <div className="container">
            <h2 className="Head">QUIZ APP</h2>
            {quizEnd ? (
                <div>
                    <h2>Your Score: {score} / {questions.length}</h2>
                </div>
            ) : question ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li
                            className={selectedOption === 1 ? (question.ans === 1 ? "correct" : "wrong") : ""}
                            onClick={() => checkAns(1)}
                        >
                            {question.option1}
                        </li>
                        <li
                            className={selectedOption === 2 ? (question.ans === 2 ? "correct" : "wrong") : ""}
                            onClick={() => checkAns(2)}
                        >
                            {question.option2}
                        </li>
                        <li
                            className={selectedOption === 3 ? (question.ans === 3 ? "correct" : "wrong") : ""}
                            onClick={() => checkAns(3)}
                        >
                            {question.option3}
                        </li>
                        <li
                            className={selectedOption === 4 ? (question.ans === 4 ? "correct" : "wrong") : ""}
                            onClick={() => checkAns(4)}
                        >
                            {question.option4}
                        </li>
                    </ul>
                    <button onClick={nextQuestion}>Next</button>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
};

export default Quiz;
