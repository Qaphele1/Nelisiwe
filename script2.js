let currentQuestion = 1;
const totalQuestions = 10;
const correctAnswers = {
    q1: "Invisibility",
    q2: "Liv",
    q3: "Skinny Jeans",
    q4: "Eagle",
    q5: ["The Big Bang Theory", "Monk"],
    q6: ["Spinach"],
    q7: ["Monopoly", "30 seconds"],
    q8: ["Jumped windows off a 6 story building", "Touched a snake"],
    q9: "Port Elizabeth",
    q10: "Dark story"
};

let timer;
let startTime = new Date().getTime();

document.getElementById('startQuiz').addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    startTimer();
    showQuestion(currentQuestion);
});

function startTimer() {
    timer = setInterval(() => {
        const now = new Date().getTime();
        const elapsedTime = now - startTime;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        document.getElementById('timer').innerText = `Time: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }, 1000);
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function showQuestion(questionNumber) {
    for (let i = 1; i <= totalQuestions; i++) {
        const questionElement = document.getElementById(`question${i}`);
        if (i === questionNumber) {
            questionElement.classList.remove('hidden');
        } else {
            questionElement.classList.add('hidden');
        }
    }
}

function nextQuestion() {
    const questionId = `question${currentQuestion}`;
    const questionType = currentQuestion <= 4 ? 'radio' : currentQuestion <= 8 ? 'checkbox' : 'text';
    let userAnswers = [];

    if (questionType === 'text') {
        const userAnswer = document.getElementById(`answer${currentQuestion}`).value.trim();
        userAnswers = [userAnswer];
    } else {
        const answersInput = Array.from(document.querySelectorAll(`#${questionId} input[type="${questionType}"]:checked`));
        userAnswers = answersInput.map(input => input.value);
    }

    // Compare user answers with correct answers
    const correctAnswer = correctAnswers[`q${currentQuestion}`];
    const isCorrect = Array.isArray(correctAnswer)
        ? JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswer.sort())
        : userAnswers[0] === correctAnswer;

    if (isCorrect) {
        // Optionally, you could increment a score counter here
    } else {
        // Optionally, store incorrect answers for result display
    }

    currentQuestion++;
    if (currentQuestion > totalQuestions) {
        finishQuiz();
    } else {
        showQuestion(currentQuestion);
    }
}

function finishQuiz() {
    clearInterval(timer);
    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = ''; // Clear previous results

    let score = 0;
    let incorrectQuestions = [];

    for (let i = 1; i <= totalQuestions; i++) {
        const correctAnswer = correctAnswers[`q${i}`];
        const userAnswer = i <= 4 ? document.querySelector(`input[name="q${i}"]:checked`)?.value : Array.from(document.querySelectorAll(`input[name="q${i}"]:checked`)).map(input => input.value).sort().join(', ');
        const userAnswerText = i >= 9 ? document.getElementById(`answer${i}`).value.trim() : userAnswer;
        
        if (Array.isArray(correctAnswer)) {
            const isCorrect = JSON.stringify(userAnswer.split(', ').sort()) === JSON.stringify(correctAnswer.sort());
            if (isCorrect) {
                score++;
            } else {
                incorrectQuestions.push(`Question ${i}: Expected ${correctAnswer.join(', ')}, but got ${userAnswer.split(', ').join(', ')}`);
            }
        } else {
            if (userAnswerText === correctAnswer) {
                score++;
            } else if (userAnswerText) {
                incorrectQuestions.push(`Question ${i}: Expected ${correctAnswer}, but got ${userAnswerText}`);
            }
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Question ${i}</td>
            <td>${userAnswerText || 'N/A'}</td>
            <td>${correctAnswer || 'N/A'}</td>
        `;
        resultTable.appendChild(row);
    }

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    alert(`Your score: ${score}/${totalQuestions}`);
    
    // Redirect to the next page
    setTimeout(() => {
        window.location.href = 'casourel.html';
    }, 10000); // Redirect after 2 seconds to allow user to see their score
}
