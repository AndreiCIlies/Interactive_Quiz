import { useRouter } from 'next/router';
import { geographyQuiz } from '../../entities/Quiz';

export default function GeographyQuizPage() {
    const router = useRouter();

    const startQuiz = () => {
        router.push(`/question/${geographyQuiz.quizQuestions[0].id}`);
    };

    return (
        <div>
            <h1>{geographyQuiz.quizName}</h1>
            <br></br>
            <p>This quiz contains {geographyQuiz.quizQuestions.length} questions.</p>
            <p>Each question has 4 answers.</p>
            <p>A question has only one correct answer.</p>
            <p>Good luck!</p>
            <br></br>
            <button onClick={startQuiz}>Start Quiz</button>
        </div>
    );
}