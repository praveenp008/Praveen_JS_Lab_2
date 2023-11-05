// quiz.js 250923 0959

// Question object --
// text - question to the user
// choices - options to select
// answer - correct answer
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Create an array of questions
var questions = [
  new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language"),
  new Question("Inside which HTML element do we put the JavaScript? ", ["javaScript", "js", "scripting", "script"], "script"),
];

// Shuffle questions and options
shuffleArray(questions);
questions.forEach(function (question) {
  shuffleArray(question.choices);
});

// Adding a method isCorrectAnswer() to check user choice
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

// Quiz Object
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

// Adding a method getQuestionByIndex() to get a question by index
Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

// Adding a method checkOptionWithAnswer() to check user answer and change the score
Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

// Adding a method isEnded() to check if the quiz is ended or not
Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

// Displaying the question number (x) out of total questions (y) -- Question x of y
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // Show the question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    // Shuffle the options
    var choices = quiz.getQuestionByIndex().choices.slice(); // Make a copy of the choices array
    shuffleArray(choices);

    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress(); // Display x of y question
  }
}

// Calling on user option
function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function () {
    if (!quiz.isEnded()) {
      quiz.checkOptionWithAnswer(choice);
    }
    loadQuestions();
  };
}


// Showing the result at the end of questions

// Function to show the scores
function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + " and the mark percentage is: " + Math.round(quiz.score / questions.length * 100) + "%" + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;

  if (quiz.isEnded()) {
    // Show the retry button only on the result page
    var retryButton = document.getElementById("retry");
    retryButton.style.display = "inline-block";
  } else {
    // Hide the retry button on other pages
    var retryButton = document.getElementById("retry");
    retryButton.style.display = "none";
  }
}



// Function to hide the scores and retry button
function hideScores() {
  document.getElementById("score").innerHTML = "";
  var retryButton = document.getElementById("retry");
  retryButton.style.display = "none"; // Hide the retry button
}

// Retry button click event
document.getElementById("retry").onclick = function () {
  location.reload(); // This will refresh the page
};

// Create a quiz
var quiz;

// Function to start or reset the quiz
function startQuiz() {
  quiz = new Quiz(questions);
  loadQuestions();
  hideScores();
}

// Display the quiz when the page loads
window.onload = startQuiz;

// Fisher-Yates shuffle algorithm to shuffle an array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
