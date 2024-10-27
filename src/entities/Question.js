class Question {
  constructor(id, question, answer, correctAnswer) {
    this.id = id
    this.question = question
    this.answer = answer
    this.correctAnswer = correctAnswer
  }
}

const artQuestions = [
  new Question(
      1,
      "Who painted the Mona Lisa?",
      ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
      "Leonardo da Vinci"
  ),
  new Question(
      2,
      "What is the predominant style of Vincent van Gogh's works?",
      ["Impressionism", "Post-Impressionism", "Cubism", "Surrealism"],
      "Post-Impressionism"
  ),
  new Question(
      3,
      "Who created the statue 'David'?",
      ["Michelangelo", "Donatello", "Bernini", "Rodin"],
      "Michelangelo"
  )
];

const historyQuestions = [
  new Question(
      4,
      "Who was the first president of the United States?",
      ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
      "George Washington"
  ),
  new Question(
      5,
      "In what year did the Berlin Wall fall?",
      ["1989", "1991", "1987", "1990"],
      "1989"
  ),
  new Question(
      6,
      "What was the primary cause of World War I?",
      ["Nationalism", "Imperialism", "Militarism", "All of the above"],
      "All of the above"
  )
];

const geographyQuestions = [
  new Question(
      7,
      "What is the largest continent on Earth?",
      ["Africa", "Asia", "Europe", "North America"],
      "Asia"
  ),
  new Question(
      8,
      "Which river is the longest in the world?",
      ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      "Nile River"
  ),
  new Question(
      9,
      "What is the capital city of Australia?",
      ["Sydney", "Canberra", "Melbourne", "Brisbane"],
      "Canberra"
  )
];

export { artQuestions, historyQuestions, geographyQuestions };
export default Question;