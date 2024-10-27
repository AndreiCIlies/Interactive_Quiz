import { useRouter } from 'next/router';
import { historyQuiz } from '../../entities/Quiz';

export default function HistoryQuizPage() {
    const router = useRouter();

    const startQuiz = () => {
        router.push(`/question/${historyQuiz.quizQuestions[0].id}`);
    };

    const updateScore = () => {
        setScore(score + 1);
    }

    return (
        <div>
            <h1>{historyQuiz.quizName}</h1>
            <br></br>
            <p>This quiz contains {historyQuiz.quizQuestions.length} questions.</p>
            <p>Each question has {historyQuiz.quizQuestions[0].answers.length} answers.</p>
            <p>A question has only one correct answer.</p>
            <p>Good luck!</p>
            <br></br>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    );
}