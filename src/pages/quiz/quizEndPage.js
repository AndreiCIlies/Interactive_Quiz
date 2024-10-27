import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function QuizEndPage() {
    const router = useRouter();
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (router.query.score) {
            setScore(parseInt(router.query.score));
        }
    }, [router.query.score]);

    return (
        <div className="end-page">
            <h1>You finished the quiz!</h1>
            <br></br>
            <p>Total Questions: 3</p>
            <p>Your score: {score}</p>
            <br></br>
            <button onClick={() => router.push('/')}>Return to Home</button>
        </div>
    );
}