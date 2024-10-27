import { useRouter } from 'next/router';
import { useState } from 'react';

export default function GeographyQuizPage( {question} ) {
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
            alert("Correct answer! You have completed the quiz!");
            router.push({
                pathname: '/endPages/geographyQuizEndPage',
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
    const geographyQuestions = res.geographyQuestions;

    return {
        props: {
            question: geographyQuestions[2]
        }
    };
}