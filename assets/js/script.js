let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");

const introEl = document.querySelector("#intro");

const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
const yesnoEl = document.querySelector("#yesno");



const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

}

