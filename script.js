document.addEventListener('DOMContentLoaded', () => {
    const quiz1Container = document.getElementById('quiz1-container');
    const quiz2Container = document.getElementById('quiz2-container');;
    const startBtn = document.getElementById('start-btn');
    const nextQuestionBtn = document.getElementById('next-btn');
    const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
    const questionContainer = document.getElementById('question-container');
    const continueBtn = document.getElementById('continue-btn');;
    const startQuiz2Btn = document.getElementById('start-quiz2-btn');
    const quiz2Content = document.getElementById('quiz2-content');


    
    // Quiz 1 JavaScript
    const questions = [
        "What are three qualities I find most attractive in a partner, and why?",
        "How do I express love and affection—through words, actions, or something else?",
        "What’s a memorable date or romantic experience I’ve had, and what made it special?",
        "What is one romantic gesture I’ve always wanted to experience or give?",
        "What are my top three favorite hobbies or activities, and what do I love about them?",
        "If I had a day entirely to myself with no obligations, how would I spend it?",
        "How do I like to celebrate my achievements or special occasions?",
        "What’s a personal trait I’m most proud of, and how does it influence my interactions with others?",
        "When do I feel most confident and authentic?"
    ];

    let currentQuestionIndex = 0;
    const answers = {};

    function showQuestion(index) {
        questionContainer.innerHTML = `
            <label for="answer">${questions[index]}</label>
            <input type="text" id="answer" name="answer" required>
        `;
    }

    function handleNextQuestion() {
        const answerInput = document.getElementById('answer');
        if (!answerInput.value.trim()) {
            alert('Please provide an answer.');
            return;
        }

        answers[questions[currentQuestionIndex]] = answerInput.value.trim();
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    }

    function showResults() {
        resultsTable.innerHTML = '';

        for (const [question, answer] of Object.entries(answers)) {
            const newRow = resultsTable.insertRow();
            const questionCell = newRow.insertCell(0);
            const answerCell = newRow.insertCell(1);

            questionCell.textContent = question;
            answerCell.textContent = answer;
        }

        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('results-container').style.display = 'block';
        continueBtn.style.display = 'block';
    }

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        quiz1Container.style.display = 'block';
        showQuestion(currentQuestionIndex);
    });

    nextQuestionBtn.addEventListener('click', handleNextQuestion);

    continueBtn.addEventListener('click', () => {
        quiz1Container.style.display = 'none';
        quiz2Container.style.display = 'block';
    });

    // Quiz 2 JavaScript
    startQuiz2Btn.addEventListener('click', () => {
        // Implement the second quiz functionality here
        // For demonstration, we'll just show the carousel directly
        quiz2Container.style.display = 'none';
        carouselContainer.style.display = 'block';
    });


});
