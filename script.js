
const questions = [
  {
    question: "Which OOP principle states that a subclass can have only one superclass?",
    answer: [
      { text: "Inheritance", correct: false },
      { text: "Polymorphism", correct: false },
      { text: "Encapsulation", correct: false },
      { text: "Single Inheritance", correct: true },
    ],
  },
  {
    question: "Which term describes the ability of an object to take on many forms?",
    answer: [
      { text: "Abstraction", correct: false },
      { text: "Encapsulation", correct: false },
      { text: "Polymorphism", correct: true },
      { text: "Inheritance", correct: false },
    ],
  },
     { question: "In Java, which keyword is used to prevent a class from being inherited?",
      answer:[
          {text:"final", correct: true},
          {text:"private", correct: false},
          {text:"abstract", correct: false},
          {text:"sealed", correct: false},
      ],
      },
      {
      question: " Which OOP principle emphasizes bundling of data and methods within a single unit?",
      answer:[
          {text:"Abstraction", correct: false},
          {text:"Encapsulation", correct: true},
          {text:"Inheritance", correct: false},
          {text:"Polymorphism", correct: false},
      ]
  },
  {
      question: " What is the process called when one class inherits properties and behaviors from another class?",
      answer:[
          {text:"Composition", correct: false},
          {text:"Aggregation", correct: false},
          {text:"Inheritance", correct: true},
          {text:"Polymorphism", correct: false},
      ]
  },
  {
      question: " Which term refers to creating an instance of a class?",
      answer:[
          {text:"Inheritance", correct: false},
          {text:"Polymorphism", correct: false},
          {text:"Abstraction", correct: false},
          {text:"Instantiation", correct: true},
      ]
  },
  {
      question: "  In Python, which method is automatically called when an object is created?",
      answer:[
          {text:"init", correct: true},
          {text:"new", correct: false},
          {text:"create", correct: false},
          {text:"start", correct: false},
      ]
  },
  {
      question: " Which OOP principle allows a subclass to provide its own implementation of a method inherited from its superclass?",
      answer:[
          {text:"Polymorphism", correct: true},
          {text:"Encapsulation", correct: false},
          {text:"Abstraction", correct: false},
          {text:"Inheritance", correct: false},
      ]
  },
  {
      question: "  Which term describes a blueprint for creating objects of a specific class?",
      answer:[
          {text:"Class variable", correct: false},
          {text:"Instance variable", correct: false},
          {text:"Method", correct: false},
          {text:"Class", correct: true},
      ]
  },
  {
      question: "In C#, which access modifier allows a class member to be accessed only within its own class and derived classes?",
      answer:[
          {text:"Public", correct: false},
          {text:"Private", correct: false},
          {text:"Protected", correct: true},
          {text:"internal", correct: false},
      ]
  }

      ];
//used to get the variables of the question, answer buttons , next button , restart button and timer
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("Restart");
const timerElement = document.getElementById("timer");
// function is used to restart everything and will restart the quiz
let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
// show each question be shown afer the next button is clicked 
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

// this part of the function will display the answer
  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
//this part of the function will start the timer
  let timeLeft = 30; // Set the desired time limit here
  timerElement.innerHTML = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
      window.location.replace("index.html");
    }
  }, 1000);
}
// Hides the default answer buttons
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  //only allows one click and will show right or wrong answer 
    //and will disable the click for answer and display the next button
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  if (score >= 6) {
    alert("Congratulations! You passed the quiz.");
  } else {
    alert("Sorry, please try again.");
  }
  if (currentQuestionIndex === questions.length) {
    timerElement.style.display = "none"; // Hide the timer element on the last page
  }

  questionElement.style.display="block"; // Show the question block
  timerElement.style.display = "none"; // Hide the timer element
  restartButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartButton.addEventListener("click", startQuiz);

document.addEventListener("DOMContentLoaded", function () {
  startQuiz();
});
