import { useState, useEffect } from 'react';

export default function AddQuestion() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['','','','']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const res = await fetch('/api/questions');
                const data = await res.json();
                
                const categoryKeys = Object.keys(data);
                setCategories(categoryKeys);
            } catch (error) {
                console.error("Error fetching categories");
            }
        };

        fetchCategories();
    }, []);

    const handleAnswerChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    }

    const validateNewCategory = (category) => {
        const startsWithLowercase = /^[a-z]/.test(category);
        const endsWithQuestions = category.endsWith('Questions');
        const doesNotExist = !categories.includes(category);

        return startsWithLowercase && endsWithQuestions && doesNotExist;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const selectedCategory = newCategory || category;

        if (newCategory && !validateNewCategory(newCategory)) {
            alert("New category must start with a lowercase letter, end with 'Questions' and must not already exist!");
            return;
        }

        try {
            const res = await fetch('/api/questions');
            const data = await res.json();

            let categoryQuestions = [];

            if (data[selectedCategory]) {
                categoryQuestions = data[selectedCategory];
            }

            const lastId = categoryQuestions.length > 0
                ? Math.max(...categoryQuestions.map(question => question.id))
                : 0;

            const newId = lastId + 1;

            const newQuestion = {
                id: newId,
                question: question,
                answers: answers,
                correctAnswer: correctAnswer
            };
    
            if (!data[selectedCategory]) {
                data[selectedCategory] = [];
            }

            data[selectedCategory].push(newQuestion);

            const updateRes = await fetch('/api/updateQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (updateRes.ok) {
                alert('Question added successfully!');
            } else {
                console.error('Failed to update questions');
            }
        } catch (error) {
            console.error('Failed to add question:', error);
        }
    };

    return (
        <div>
            <h1>Add a New Question</h1>

            <br></br>

            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select an existing category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.replace('Questions', '')}
                        </option>
                    ))}
                </select>

                <br></br>
                <br></br>

                <label htmlFor="newCategory">Or Add a New Category: </label>
                <input
                    type="text"
                    id="newCategory"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                />

                <br></br>
                <br></br>

                <label htmlFor="question">Question: </label>
                <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter question"
                    required
                />

                <br></br>
                <br></br>

                <label>Answers:</label>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => handleAnswerChange(e, index)}
                            placeholder={`Answer ${index + 1}`}
                            required
                        />
                    </div>
                ))}

                <br></br>

                <label htmlFor="correctAnswer">Correct Answer: </label>
                <input
                    type="text"
                    id="correctAnswer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                />

                <br></br>
                <br></br>

                <button type="submit">Add Question</button>
            </form>
        </div>
    );
}