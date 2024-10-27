import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function QuestionPage() {
    const router = useRouter();
    const numberOfQuestionsInQuiz = 3;
    const { questionId, quizId } = router.query;
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answerCorrectFromFirstTry, setAnswerCorrectFromFirstTry] = useState(true);
    const [score, setScore] = useState(parseInt(router.query.score) || 0);

    useEffect(() => {
        const fetchQuestion = async() => {
            if (!questionId || !quizId) return;

            try {
                const res = await fetch('/api/questions');
                const data = await res.json();
                
                const questionsKey = `${quizId}Questions`;
                const questionsInCategory = data[questionsKey];
                
                const question = questionsInCategory.find(q => q.id === parseInt(questionId));

                if (question) {
                    setCurrentQuestion(question);
                } else {
                    console.error("Question not found")
                }
            } catch (error) {
                console.error("Failed to load question:", error);
            }
        }; 
        
        fetchQuestion();
    }, [questionId, quizId]);

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            alert("Correct answer!");

            setScore(prevScore => {
                const newScore = answerCorrectFromFirstTry ? prevScore + 1 : prevScore;
                const isLastQuestion = currentQuestion.id === numberOfQuestionsInQuiz;

                if (isLastQuestion) {
                    router.push({
                        pathname: `/quiz/quizEndPage`,
                        query: { score: newScore }
                    });
                } else {
                    const nextQuestionId = parseInt(questionId) + 1;
                    router.push({
                        pathname: `/question/${nextQuestionId}`,
                        query: { score: newScore, quizId }
                    });
                }

                return newScore;
            });

            setAnswerCorrectFromFirstTry(true);
        } else {
            setAnswerCorrectFromFirstTry(false);
            alert("Incorrect answer. Try again!");
        }
    };

    if (!currentQuestion) {
        return <p>Loading...</p>;
    }

    return (
        <div className="quiz-container">
            <h2>{currentQuestion.question}</h2>
            <br></br>
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

export async function getStaticProps(context) {
    const { questionId } = context.params;
    const res = await import('/public/questions.json');
    const allQuestions = [...res.artQuestions, ...res.historyQuestions, ...res.geographyQuestions];
    const question = allQuestions.find(q => q.id === parseInt(questionId));

    return {
        props: {
            question
        }
    };
}

export async function getStaticPaths() {
    const res = await import('/public/questions.json');
    const allQuestions = [...res.artQuestions, ...res.historyQuestions, ...res.geographyQuestions];
    const paths = allQuestions.map(q => ({ params: { questionId: q.id.toString() } }));

    return {
        paths,
        fallback: false
    };
}