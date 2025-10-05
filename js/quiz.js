// quiz.js
const questions = [
  {
    question: "Which age group is most vulnerable to drug abuse?",
    options: ["5-14", "15-35", "36-50", "51-65"],
    answer: 1
  },
  {
    question: "True or False: Drugs help solve personal problems.",
    options: ["True", "False"],
    answer: 1
  },
  {
    question: "Which is NOT a consequence of drug abuse?",
    options: ["Health problems", "Stronger friendships", "Financial issues", "Legal troubles"],
    answer: 1
  },
  {
    question: "What is the safest way to avoid drug abuse?",
    options: ["Occasional use", "Using only with friends", "Avoid peer pressure", "Using prescribed drugs only"],
    answer: 2
  },
  {
    question: "True or False: Recovery from drug addiction is impossible.",
    options: ["True", "False"],
    answer: 1
  },
  {
    question: "What are signs someone may need help with drug abuse?",
    options: ["Sudden mood changes", "Improved academic performance", "Better financial management", "More organized lifestyle"],
    answer: 0
  },
  {
    question: "Who should you contact if you or someone you know needs help with drug abuse?",
    options: ["No one, handle it privately", "Local health centers, family/friends, NGOs", "Only close friends", "Only family members"],
    answer: 1
  },
  {
    question: "Which statement about drug abuse is true?",
    options: ["It only affects poor communities", "It's a sign of strength", "Awareness and education prevent abuse", "It's only a problem in urban areas"],
    answer: 2
  },
  {
    question: "Why is drug abuse particularly dangerous for youths?",
    options: ["It affects brain development", "It's more expensive", "It's less addictive", "It has no long-term effects"],
    answer: 0
  },
  {
    question: "How can you stay drug-free?",
    options: ["Isolate from all friends", "Make a pledge, join youth groups, say no", "Change schools frequently", "Keep it a secret from parents"],
    answer: 1
  }
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0;
    this.quizContainer = document.getElementById('quiz-questions');
    this.quizResults = document.getElementById('quiz-results');
    this.scoreElement = document.getElementById('score');
    this.resultMessage = document.getElementById('result-message');
    this.startQuizBtn = document.getElementById('start-quiz');
    this.retakeQuizBtn = document.getElementById('retake-quiz');
    
    this.init();
  }
  
  init() {
    this.startQuizBtn.addEventListener('click', () => this.startQuiz());
    this.retakeQuizBtn.addEventListener('click', () => this.startQuiz());
  }
  
  startQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.quizResults.classList.add('hidden');
    this.quizContainer.innerHTML = '';
    this.showQuestion();
  }
  
  showQuestion() {
    if (this.currentQuestion >= this.questions.length) {
      this.showResults();
      return;
    }
    
    const question = this.questions[this.currentQuestion];
    const questionHTML = `
      <div class="quiz-question">
        <div class="quiz-progress mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-600">Question ${this.currentQuestion + 1}/${this.questions.length}</span>
            <span class="text-sm font-medium text-gray-600">Score: ${this.score}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-primary h-2.5 rounded-full" style="width: ${(this.currentQuestion / this.questions.length) * 100}%"></div>
          </div>
        </div>
        <p class="question-text font-medium text-lg mb-6">${question.question}</p>
        <div class="quiz-options space-y-3">
          ${question.options.map((option, index) => `
            <div class="quiz-option bg-white border-2 border-gray-300 hover:bg-blue-100 hover:border-blue-400 rounded-md px-4 py-3 cursor-pointer transition-colors" data-index="${index}">
              ${option}
            </div>
          `).join('')}
        </div>
        <div class="quiz-navigation flex justify-between mt-6">
          <button class="prev-btn bg-blue-400 text-gray-100 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors ${this.currentQuestion === 0 ? 'opacity-10 cursor-not-allowed' : ''}" ${this.currentQuestion === 0 ? 'disabled' : ''}>
            Previous
          </button>
          <button class="skip-btn bg-primary-light text-gray-100 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors">
            Skip
          </button>
        </div>
      </div>
    `;
    
    this.quizContainer.innerHTML = questionHTML;
    
    // Add event listeners to options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        const selectedIndex = parseInt(option.getAttribute('data-index'));
        this.checkAnswer(selectedIndex);
      });
    });
    
    // Add event listeners to navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const skipBtn = document.querySelector('.skip-btn');
    
    prevBtn.addEventListener('click', () => {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.showQuestion();
      }
    });
    
    skipBtn.addEventListener('click', () => {
      this.currentQuestion++;
      this.showQuestion();
    });
  }
  
  checkAnswer(selectedIndex) {
    const correctIndex = this.questions[this.currentQuestion].answer;
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options after selection
    options.forEach(option => {
      option.style.pointerEvents = 'none';
    });
    
    if (selectedIndex === correctIndex) {
      options[selectedIndex].classList.add('correct');
      this.score++;
    } else {
      options[selectedIndex].classList.add('incorrect');
      options[correctIndex].classList.add('correct');
    }
    
    setTimeout(() => {
      this.currentQuestion++;
      this.showQuestion();
    }, 1500);
  }
  
  showResults() {
    this.quizContainer.innerHTML = '';
    this.quizResults.classList.remove('hidden');
    this.scoreElement.textContent = this.score;
    
    if (this.score === this.questions.length) {
      this.resultMessage.textContent = 'Excellent! You have great knowledge about drug abuse prevention.';
    } else if (this.score >= this.questions.length / 2) {
      this.resultMessage.textContent = 'Good job! You know quite a bit, but there\'s more to learn.';
    } else {
      this.resultMessage.textContent = 'Thanks for taking the quiz! Consider exploring our educational resources to learn more.';
    }
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const quiz = new Quiz(questions);
});