import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function QuizPage() {
    const router = useRouter();
    const { quizId } = router.query;
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!quizId) return;

            try {
                const response = await fetch('/api/questions');
                const data = await response.json();

                const questionsKey = `${quizId}Questions`;
                if (data[questionsKey]) {
                    setQuiz({
                        quizName: `${quizId.charAt(0).toUpperCase() + quizId.slice(1)} Quiz`,
                        quizQuestions: data[questionsKey]
                    });
                } else {
                    console.error(`No questions found for quiz ID: ${quizId}`);
                    setQuiz({ quizName: `${quizId.charAt(0).toUpperCase() + quizId.slice(1)} Quiz`, quizQuestions: [] });
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to load the quiz data:", error);
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    const startQuiz = () => {
        if (quiz && quiz.quizQuestions.length > 0) {
            router.push(`/question/${quiz.quizQuestions[0].id}?quizId=${quizId}`);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!quiz) {
        return <p>Failed to load quiz data.</p>;
    }

    return (
        <div>
            <h1>{quiz.quizName}</h1>
            <br></br>
            {quiz.quizQuestions.length > 0 && (
                <>
                    <p>Each question has {quiz.quizQuestions[0].answers.length} answers.</p>
                    <p>A question has only one correct answer.</p>
                    <p>Good luck!</p>
                </>
            )}
            <br></br>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    );
}