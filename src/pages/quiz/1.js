import { useRouter } from 'next/router';
import { artQuiz } from '../../entities/Quiz';

export default function ArtQuizPage() {
    const router = useRouter();

    const startQuiz = () => {
        router.push(`/question/${artQuiz.quizQuestions[0].id}`);
    };

    return (
        <div>
            <h1>{artQuiz.quizName}</h1>
            <br></br>
            <p>This quiz contains {artQuiz.quizQuestions.length} questions.</p>
            <p>Each question has {artQuiz.quizQuestions[0].answers.length} answers.</p>
            <p>A question has only one correct answer.</p>
            <p>Good luck!</p>
            <br></br>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    );
}