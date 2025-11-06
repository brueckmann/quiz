
//////////////////////////////////////////////////////////////////////////////////////////////////
// Quiz

// Fragen und Antworten
var myQuestions = [
            {
question: "Which factors are crucial for people to support climate policies?",
    answers: {
      a: 'Costs and benefits for individuals.',
      b: 'The weather',
      c: 'Their gender.'
    },
    correctAnswer: 'a'
  },
          {
    question: "According to Gazmararian et al. (2025) and Bosetti et al. (2025), what are the main reasons behind the inability for implementing decarbonisation policies?",
    answers: {
      a: 'Gazmararian et al. (2025) concentrate on the role of technological underdevelopment, while Bosetti et. al. focus on the role of insufficient scientific consensus which prevents the implementation of these policies.',
      b: 'Gazmararian et al. (2025) focus on the argument that limited public and political support due to perceived costs, low visibility of benefits and electoral disincentives cause interruption in terms of implementation, while Bosetti et al.(2025) focus on the green backlash encouraged by the economic inequalities and the rise of the right-wing population.'
    },
    correctAnswer: 'b'
  },
            {
    question: "According to Bosetti et al. (2025), what is essential in designing climate policies to avoid backlash?",
    answers: {
      a: 'Adopt compensatory mechanisms.',
      b: 'Embed participatory processes.',
      c: 'Prioritize economic benefits.'
    },
    correctAnswer: 'b'
  },
  {
    question: "Both papers talk directly or indirectly about the importance of the inclusion of citizens (through direct inclusion or public opinion) when it comes to green energy transition. Which statement is true?",
    answers: {
      a: 'Both papers state the inclusion of citizens is important.',
      b: 'Neither paper states the inclusion of citizens is important.',
      c: 'Bosetti et al. (2025) state that the inclusion of citizens is important.', 
      d: 'Gazmararian et al. (2025) state that the inclusion of citizens is important.'
    },
    correctAnswer: 'a'
  },
    {
    question: "According to Bosetti et al. (2025), what is a main economic driver of the backlash?",
    answers: {
      a: 'Rising global prices.',
      b: 'Unevenly distributed costs of climate policies perceived losers',
      c: 'Rising unemployment in green industries.'
    },
    correctAnswer: 'b'
  },
  {
    question: "What captures best the distinction between policy responsiveness and policy congruence?",
    answers: {
      a: 'Responsiveness = policy design, congruence = policy outcomes.',
      b: 'Responsiveness = policies follow shifts in opinion, congruence = policies match majority preferences.',
      c: 'Responsiveness concerns elites, congruence concerns the public.',
      d: 'Responsiveness = policy outcomes, congruence = policy design.'
    },
    correctAnswer: 'b'
  },
      {
    question: "What is nature conservation according to Bosetti et al. (2025)?",
    answers: {
      a: 'Protecting the environment from climate change.',
      b: 'Protecting renewable energy like wind.',
      c: 'Keeping nature beautiful.',
      d: 'Conserving Nature journal articles.'
    },
    correctAnswer: 'c'
  },
      {
    question: "According to Gazmararian et al. (2025), how is public opinion influenced with regard to the expansion of clean energy technologies and infrastructure?",
    answers: {
      a: 'Based on technological efficiency and government subsidies.',
      b: 'Public acceptance plays a role.',
      c: 'Citizens have no influence.'
    },
    correctAnswer: 'b'
  },
      {
    question: "How do right-wing populist parties often respond when people criticize or resist green policies?",
    answers: {
      a: 'They support stricter environmental rules.',
      b: 'They stay neutral on climate issues.',
      c: 'They use the criticism to gain political support.',
      d: 'They ignore the public’s opinions.'
    },
    correctAnswer: 'c'
  },
        {
    question: "  What aspect doesn’t fit the rhetoric of the populist right?",
    answers: {
      a: 'Anti-elite-narratives.',
      b: 'Economic concerns.',
      c: 'Doubting the effectiveness of climate policies.'
    },
    correctAnswer: 'c'  
},
      {
    question: "What is the key driver of green backlash?",
    answers: {
      a: 'Expansion of EVs.',
      b: 'Transition costs among specific social groups.',
      c: 'Increased international cooperation.',
      d: 'Declining fossil-fuels prices.'
    },
    correctAnswer: 'b'
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
    'You answered ' + numCorrect + ' out of ' + questions.length + ' questions correctly.';
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