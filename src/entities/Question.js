import questions from '/public/questions.json';

class Question {
  constructor(id, question, answers, correctAnswer) {
    this.id = id
    this.question = question
    this.answers = answers
    this.correctAnswer = correctAnswer
  }
}

const artQuestions = questions.artQuestions.map(q => 
  new Question(q.id, q.question, q.answers, q.correctAnswer)
);

const historyQuestions = questions.historyQuestions.map(q => 
  new Question(q.id, q.question, q.answers, q.correctAnswer)
);

const geographyQuestions = questions.geographyQuestions.map(q => 
  new Question(q.id, q.question, q.answers, q.correctAnswer)
);

export { artQuestions, historyQuestions, geographyQuestions };
export default Question;