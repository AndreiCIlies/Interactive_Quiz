import { useRouter } from 'next/router';
import { artQuiz } from '../../entities/Quiz';
import { useState } from 'react';

export default function ArtQuizPage() {
    const router = useRouter();
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const currentQuestion = artQuiz.quizQuestions[0];

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            alert("Correct answer!");
            router.push(`/question/${artQuiz.quizQuestions[1].id}`);
        } else {
            alert("Incorrect answer. Try again!");
        }
    };

    return (
        <div className="quiz-container">
            <h1>{artQuiz.quizName}</h1>
            <br></br>
            <h2>{currentQuestion.question}</h2>

            <form onSubmit={handleSubmit}>
                {currentQuestion.answer.map((option, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`answer${index}`}
                            name="answer"
                            value={option}
                            onChange={handleAnswerChange}
                            checked={selectedAnswer === option}
                        />
                        <label htmlFor={`answer${index}`}>{option}</label>
                    </div>
                ))}
                <br></br>
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
}
