
//////////////////////////////////////////////////////////////////////////////////////////////////
// Quiz

// Fragen und Antworten
var myQuestions = [
     {
    question: "This is a question with 4 answer options",
    answers: {
      a: 'Answer wrong',
      b: 'Answer wrong',
      c: 'Answer wrong',
      d: 'Answer correct'
    },
    correctAnswer: 'd'
  },
    {
    question: "This is a question with 3 answer options",
    answers: {
      a: 'A wrong answer',
      b: 'Another wrong answer',
      c: 'And the correct answer'
    },
    correctAnswer: 'c'
  },
  {
    question: "This is a question with 4 answer options",
    answers: {
      a: 'Correct option',
      b: 'A wrong option',
      c: 'Another wrong option', 
      d: 'Guess what'
    },
    correctAnswer: 'a'
  }
];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
function showQuestions(questions, quizContainer){
  const blocks = questions.map((q, i) => {
    const answers = Object.keys(q.answers).map(letter => `
      <label class="answer">
        <input type="radio" name="question${i}" value="${letter}">
        ${q.answers[letter]}
      </label>
    `).join('');

    return `
      <div class="question-block">
        <div class="question-line">
          <span class="q-number">${i + 1}.</span>
          <span class="q-text">${q.question}</span>
        </div>
        <div class="answers">
          ${answers}
        </div>
      </div>
    `;
  });

  quizContainer.innerHTML = blocks.join('');
}

  // Resultate anzeigen
function showResults(questions, quizContainer, resultsContainer){
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;

  for (let i = 0; i < questions.length; i++) {
    const container = answerContainers[i];

    container.querySelectorAll('.correct-answer').forEach(n => n.remove());
    container.querySelectorAll('label').forEach(l => {
      l.classList.remove('is-correct','is-wrong');
    });

    const userAnswer = (container.querySelector('input[name=question'+i+']:checked') || {}).value;
    const correct = questions[i].correctAnswer;

    if (userAnswer === correct) {
      numCorrect++;
      const correctLabel = container.querySelector('input[value="'+correct+'"]').parentNode;
      correctLabel.classList.add('is-correct');
    } else {
      if (userAnswer) {
        const wrongLabel = container.querySelector('input[value="'+userAnswer+'"]').parentNode;
        if (wrongLabel) wrongLabel.classList.add('is-wrong');
      }
      const correctLabel = container.querySelector('input[value="'+correct+'"]').parentNode;
      if (correctLabel) correctLabel.classList.add('is-correct');
    }
  }

  resultsContainer.innerHTML =
    'You have got ' + numCorrect + ' out of ' + questions.length + ' questions answered correctly.';
  resultsContainer.style.display = "block";

  // 🎉 Effekt bei voller Punktzahl
if (numCorrect === questions.length) {
  launchConfetti({ duration: 3500, particleCount: 260 });

  }
}

  showQuestions(questions, quizContainer);
  
  // Submit Button
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }
  
  var restartButton = document.getElementById('restart');

function resetQuiz() {
  showQuestions(questions, quizContainer);
  resultsContainer.innerHTML = '';
}

restartButton.onclick = function() {
  resetQuiz();
};

}


function launchConfetti() {
  // Canvas erstellen (nur einmal)
  let canvas = document.getElementById("confetti-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Partikel erzeugen
  const colors = ["#E91E63", "#FBC02D", "#3F51B5", "#4CAF50", "#FF5722", "#9C27B0"];
  const particles = Array.from({ length: 300 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: (Math.random() - 0.5) * 2,
    speedY: Math.random() * 3 + 2,
    rotation: Math.random() * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }
  animate();

  // nach 5 Sekunden automatisch entfernen
  setTimeout(() => {
    canvas.remove();
  }, 5000);
}