// ============================================
// QUIZMASTER
// Placement Preparation Quiz
// HTML + CSS + JavaScript Only
// ============================================


// QUESTIONS
const questions = [

    {
        category: "JavaScript",
        question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: [
            "var",
            "let",
            "define",
            "variable"
        ],
        answer: 1
    },

    {
        category: "HTML",
        question: "Which HTML element is used to create a hyperlink?",
        options: [
            "<link>",
            "<href>",
            "<a>",
            "<url>"
        ],
        answer: 2
    },

    {
        category: "CSS",
        question: "Which CSS property is used to change the background color of an element?",
        options: [
            "color",
            "background-color",
            "bg-color",
            "background-style"
        ],
        answer: 1
    },

    {
        category: "JavaScript",
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()",
            "JSON.stringify()"
        ],
        answer: 0
    },

    {
        category: "DBMS",
        question: "Which key uniquely identifies each record in a relational database table?",
        options: [
            "Foreign Key",
            "Primary Key",
            "Candidate Key",
            "Composite Key"
        ],
        answer: 1
    },

    {
        category: "DSA",
        question: "What is the worst-case time complexity of Binary Search?",
        options: [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n²)"
        ],
        answer: 2
    },

    {
        category: "Programming",
        question: "Which data structure follows the LIFO principle?",
        options: [
            "Queue",
            "Array",
            "Stack",
            "Linked List"
        ],
        answer: 2
    },

    {
        category: "JavaScript",
        question: "Which function is used to execute code after a specified delay?",
        options: [
            "setDelay()",
            "setTimeout()",
            "delayCode()",
            "wait()"
        ],
        answer: 1
    },

    {
        category: "Computer Science",
        question: "Which of the following is NOT an operating system?",
        options: [
            "Linux",
            "Windows",
            "Oracle",
            "macOS"
        ],
        answer: 2
    },

    {
        category: "Web Development",
        question: "Which HTTP status code indicates that a requested resource was not found?",
        options: [
            "200",
            "301",
            "404",
            "500"
        ],
        answer: 2
    }

];


// ============================================
// VARIABLES
// ============================================

let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;

let timer;
let timeLeft = 15;

let quizQuestions = [];


// ============================================
// DOM ELEMENTS
// ============================================

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const questionNumberElement =
    document.getElementById("questionNumber");

const categoryElement =
    document.getElementById("category");

const scoreElement =
    document.getElementById("score");

const progressElement =
    document.getElementById("progress");

const timerElement =
    document.getElementById("timer");

const feedbackElement =
    document.getElementById("feedback");


// ============================================
// HIGH SCORE
// ============================================

function getHighScore() {

    return Number(
        localStorage.getItem("quizMasterHighScore")
    ) || 0;

}


function updateHighScoreDisplay() {

    const highScore = getHighScore();

    document.getElementById("homeHighScore").textContent =
        highScore;

}


// ============================================
// START QUIZ
// ============================================

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;

    // Copy questions
    quizQuestions = [...questions];

    // Randomize questions
    shuffleArray(quizQuestions);

    totalQuestionsElement.textContent =
        quizQuestions.length;

    scoreElement.textContent = score;

    showScreen(quizScreen);

    loadQuestion();

}


// ============================================
// LOAD QUESTION
// ============================================

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 15;

    timerElement.textContent = timeLeft;

    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";

    nextBtn.style.display = "none";

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    currentQuestionElement.textContent =
        currentQuestionIndex + 1;

    questionNumberElement.textContent =
        `QUESTION ${String(currentQuestionIndex + 1).padStart(2, "0")}`;

    categoryElement.textContent =
        currentQuestion.category;

    questionElement.textContent =
        currentQuestion.question;

    const progress =
        ((currentQuestionIndex + 1) /
        quizQuestions.length) * 100;

    progressElement.style.width =
        `${progress}%`;

    renderOptions(currentQuestion);

    startTimer();

}


// ============================================
// RENDER OPTIONS
// ============================================

function renderOptions(currentQuestion) {

    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(
        (optionText, index) => {

            const button =
                document.createElement("button");

            button.classList.add("option");

            button.innerHTML = `
                <span class="option-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>${optionText}</span>
            `;

            button.addEventListener(
                "click",
                () => selectAnswer(index)
            );

            optionsElement.appendChild(button);

        }
    );

}


// ============================================
// SELECT ANSWER
// ============================================

function selectAnswer(selectedIndex) {

    clearInterval(timer);

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    const optionButtons =
        document.querySelectorAll(".option");

    optionButtons.forEach(button => {
        button.disabled = true;
    });


    if (selectedIndex === currentQuestion.answer) {

        optionButtons[selectedIndex]
            .classList.add("correct");

        score += 10;

        correctCount++;

        scoreElement.textContent = score;

        feedbackElement.textContent =
            "✓ Correct answer! +10 points";

        feedbackElement.classList.add("correct");

    } else {

        optionButtons[selectedIndex]
            .classList.add("wrong");

        optionButtons[currentQuestion.answer]
            .classList.add("correct");

        wrongCount++;

        feedbackElement.textContent =
            "✕ Wrong answer! The correct answer is highlighted.";

        feedbackElement.classList.add("wrong");

    }

    nextBtn.style.display = "block";

}


// ============================================
// TIMER
// ============================================

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;


        if (timeLeft <= 5) {

            timerElement.style.color =
                "var(--danger)";

        } else {

            timerElement.style.color =
                "var(--text)";

        }


        if (timeLeft === 0) {

            clearInterval(timer);

            timeOut();

        }

    }, 1000);

}


// ============================================
// TIME OUT
// ============================================

function timeOut() {

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    const optionButtons =
        document.querySelectorAll(".option");

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    optionButtons[currentQuestion.answer]
        .classList.add("correct");

    wrongCount++;

    feedbackElement.textContent =
        "⏰ Time's up! The correct answer is highlighted.";

    feedbackElement.classList.add("wrong");

    nextBtn.style.display = "block";

}


// ============================================
// NEXT QUESTION
// ============================================

function nextQuestion() {

    currentQuestionIndex++;

    if (
        currentQuestionIndex <
        quizQuestions.length
    ) {

        loadQuestion();

    } else {

        showResults();

    }

}


// ============================================
// SHOW RESULTS
// ============================================

function showResults() {

    clearInterval(timer);

    showScreen(resultScreen);

    const totalQuestions =
        quizQuestions.length;

    const percentage =
        Math.round(
            (correctCount / totalQuestions) * 100
        );

    document.getElementById("finalScore")
        .textContent = score;

    document.getElementById("correctAnswers")
        .textContent = correctCount;

    document.getElementById("wrongAnswers")
        .textContent = wrongCount;

    document.getElementById("percentage")
        .textContent = `${percentage}%`;


    // Result message

    let message;
    let description;

    if (percentage >= 80) {

        message = "Excellent Work!";

        description =
            "Your placement preparation is looking strong. Keep practicing and maintain your consistency.";

    } else if (percentage >= 60) {

        message = "Good Job!";

        description =
            "You have a good foundation. Review the questions you missed and keep improving.";

    } else if (percentage >= 40) {

        message = "Keep Practicing!";

        description =
            "You have started well. Strengthen your fundamentals and practice more placement questions.";

    } else {

        message = "Don't Give Up!";

        description =
            "Every mistake is a learning opportunity. Revise your fundamentals and try the quiz again.";

    }

    document.getElementById("resultMessage")
        .textContent = message;

    document.getElementById("resultDescription")
        .textContent = description;


    // Save high score

    const oldHighScore =
        getHighScore();

    if (score > oldHighScore) {

        localStorage.setItem(
            "quizMasterHighScore",
            score
        );

    }

    document.getElementById("resultHighScore")
        .textContent = getHighScore();

}


// ============================================
// SHOW SCREEN
// ============================================

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {
            item.classList.remove("active");
        });

    screen.classList.add("active");

}


// ============================================
// SHUFFLE ARRAY
// ============================================

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


// ============================================
// BUTTON EVENTS
// ============================================

startBtn.addEventListener(
    "click",
    startQuiz
);

nextBtn.addEventListener(
    "click",
    nextQuestion
);

restartBtn.addEventListener(
    "click",
    startQuiz
);

homeBtn.addEventListener(
    "click",
    () => {

        clearInterval(timer);

        updateHighScoreDisplay();

        showScreen(homeScreen);

    }
);


// ============================================
// INITIALIZE
// ============================================

updateHighScoreDisplay();