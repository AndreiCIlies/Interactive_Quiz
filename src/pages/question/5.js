import { useRouter } from 'next/router';
import { useState } from 'react';

export default function HistoryQuizPage( {question} ) {
    const router = useRouter();
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const currentQuestion = question;
    let [answerCorrectFromFirstTry, setAnswerCorrectFromFirstTry] = useState(true); 
    let score = parseInt(router.query.score) || 0;

    const updateScore = () => {
        score++;
    }

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            if (answerCorrectFromFirstTry) {
                updateScore();
            }
            alert("Correct answer!");
            router.push({
                pathname: '/question/6',
                query: { score: score },
            });
        } else {
            setAnswerCorrectFromFirstTry(false);
            alert("Incorrect answer. Try again!");
        }
    };

    return (
        <div className="quiz-container">
            <h2>{currentQuestion.question}</h2>

            <form onSubmit={handleSubmit}>
                {currentQuestion.answers.map((option, index) => (
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

export async function getStaticProps() {
    const res = await import('/public/questions.json');
    const historyQuestions = res.historyQuestions;

    return {
        props: {
            question: historyQuestions[1]
        }
    };
}