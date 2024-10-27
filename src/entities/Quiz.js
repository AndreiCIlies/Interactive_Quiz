import { artQuestions, historyQuestions, geographyQuestions } from './Question';

class Quiz {
    constructor(quizId, quizName, quizQuestions) {
        this.quizId = quizId;
        this.quizName = quizName;
        this.quizQuestions = quizQuestions;
    }
}

const artQuiz = new Quiz(1, "Art Quiz", artQuestions);
const historyQuiz = new Quiz(2, "History Quiz", historyQuestions);
const geographyQuiz = new Quiz(3, "Geography Quiz", geographyQuestions);

export { artQuiz, historyQuiz, geographyQuiz };
export default Quiz;