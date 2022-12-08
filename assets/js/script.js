//Time and score
let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");

//Intro section
const introEl = document.querySelector("#intro");

//Question section
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
const yesnoEl = document.querySelector("#yesno");

//Button to start the quiz with timer and display questions
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

//Object for questions, answers and correct answers
const questions = [ // array of objects
    {
        // Question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correctAnswer: "2"
    },
    {
        // Question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. Quotes", "2. Curly Brackets", "3. Parentheses", "4. Square Brackets"],
        correctAnswer: "1"
    },
    {
        // Question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"],
        correctAnswer: "3"
    },
    {
        // Question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. Commmas", "2. Curly Brackets", "3. Quotes", "4. Parentheses"],
        correctAnswer: "2"
    },
    {
        // Question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. Terminal/Bash", "3. For Loops", "4. console.log"],
        correctAnswer: "3"
    }
];

//Answer buttons within the page
const ansBtn = document.querySelectorAll("button.ansBtn")
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
//Checks answers
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

//Timer for quiz
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

//Function to set the questions 
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

//Function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    //Show section for yesno and append message
    yesnoEl.style.display = "block";
    let p = document.createElement("p");
    yesnoEl.appendChild(p);

    //Time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    //Checking answers if they're correct or false
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    //Increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    //Call setQuestion to bring in next question when any ansBtn is clicked
    setQuestion(questionCount);
}



//Ordered list
let scoreListEl = document.querySelector("#score-list");
//Array of scores
let scoreList = [];

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    //Sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    //Add to local storage
    storeScores();
    displayScores();
}

//Final Section
const finalEl = document.querySelector("#final");
//User initials
let initialsInput = document.querySelector("#initials");

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

//Display scores
function displayScores() {
    //Get stored scores from localStorage
    //Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    //If scores were retrieved from localStorage, update the scorelist array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

//Clear scores
const clearScrBtn = document.querySelector("#clearscores");
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}
clearScrBtn.addEventListener("click", clearScores);

//Submit scores
const submitScrBtn = document.querySelector("#submit-score");
submitScrBtn.addEventListener("click", addScore);

//Go back to restart the quiz
const goBackBtn = document.querySelector("#goback");
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

//Section highscores
const highscoresEl = document.querySelector("#highscores");
const viewScrBtn = document.querySelector("#high-score");
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No available scores to show at the moment.");
    }
});
