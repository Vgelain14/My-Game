let currentQuestionIndex = 0;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let timer;
let timeLeft = 10;

document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
});

document.getElementById("take-quiz-button").addEventListener("click", () => {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    loadQuestion();
    startTimer();
});

function loadQuestion() {
    fetch("/api/questions")
        .then(response => response.json())
        .then(questions => {
            const question = questions[currentQuestionIndex];
            document.getElementById("question-text").textContent = question.question;
            const optionsContainer = document.getElementById("options-container");
            optionsContainer.innerHTML = "";
            question.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.textContent = option;
                button.addEventListener("click", () => submitAnswer(index));
                optionsContainer.appendChild(button);
            });
        });
}

function submitAnswer(answerIndex) {
    clearInterval(timer);
    fetch(`/api/submit-answer?questionIndex=${currentQuestionIndex}&answerIndex=${answerIndex}`)
        .then(response => response.text())
        .then(result => {
            if (result === "Correct!") {
                let pointsEarned = 100;
                if (timeLeft > 0) {
                    pointsEarned += 20; // Bonus for answering before the timer runs out
                }
                if (currentPlayer === 1) {
                    player1Score += pointsEarned;
                } else {
                    player2Score += pointsEarned;
                }
            }
            updateScores();
            currentQuestionIndex++;
            if (currentQuestionIndex < 5) {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                loadQuestion();
                resetTimer();
            } else {
                showResults();
            }
        });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer(-1); // No answer selected
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time-left").textContent = timeLeft;
    startTimer();
}

function updateScores() {
    document.getElementById("player1-score").textContent = player1Score;
    document.getElementById("player2-score").textContent = player2Score;
}

function showResults() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
    document.getElementById("final-player1-score").textContent = player1Score;
    document.getElementById("final-player2-score").textContent = player2Score;
}

document.getElementById("play-again-button").addEventListener("click", () => {
    currentQuestionIndex = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    timeLeft = 10;
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
});