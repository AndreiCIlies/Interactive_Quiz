import { useRouter } from 'next/router';

export default function ArtQuizEndPage() {
    const router = useRouter();
    const score = parseInt(router.query.score) || 0;

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