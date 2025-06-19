import { calculateSuggestion } from './scripts/utils.js';

let surveyData = {};
let currentQuestionIndex = 0;

const questions = [
  {
    text: "What's your current money?",
    type: "money",
    options: [
      { text: "$800–1500", value: 1150 },
      { text: "$1500–2000", value: 1750 },
      { text: "$2000–2500", value: 2250 },
      { text: "$2500–3500", value: 3000 },
      { text: "$3500–4700", value: 4100 },
      { text: "$4700–6000", value: 5350 },
      { text: "$6000+", value: 8000 }
    ]
  },
  {
    text: "Which side?",
    type: "side",
    options: [
      { text: "T", value: "T" },
      { text: "CT", value: "CT" }
    ]
  },
  {
    text: "Loss streak?",
    type: "loss_streak",
    options: [
      { text: "0", value: 0 },
      { text: "1", value: 1 },
      { text: "2", value: 2 },
      { text: "3+", value: 3 }
    ]
  },
  {
    text: "Match situation?",
    type: "situation",
    options: [
      { text: "Normal", value: "normal" },
      { text: "Match Point", value: "match_point" },
      { text: "Must Win", value: "must_win" }
    ]
  },
  {
    text: "How did last round end?",
    type: "last_round",
    options: [] // Will be set dynamically
  }
];

function renderQuestion() {
  const questionContainer = document.getElementById('question-container');
  const questionText = document.getElementById('question-text');
  const quickOptions = document.getElementById('quick-options');
  const progressFill = document.getElementById('progress-fill');

  if (currentQuestionIndex >= questions.length) {
    return showSurveyResult();
  }

  let question = { ...questions[currentQuestionIndex] };

  if (question.type === 'last_round') {
    const lossStreak = surveyData.loss_streak || 0;
    if (lossStreak === 0) {
      question.text = "How did we win last round?";
      question.options = [
        { text: "We won easily", value: "we_won_easy" },
        { text: "We won close", value: "we_won_close" }
      ];
    } else {
      question.text = "How did they win last round?";
      question.options = [
        { text: "They won easily", value: "enemy_won_easy" },
        { text: "They won close", value: "enemy_won_close" }
      ];
    }
  }

  progressFill.style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
  questionText.textContent = question.text;

  quickOptions.innerHTML = question.options.map(opt =>
    `<button class="quick-btn" onclick="window.answerSurvey('${question.type}', '${opt.value}')">${opt.text}</button>`
  ).join('');
}

window.answerSurvey = function (type, value) {
  if (!isNaN(value)) value = parseInt(value);
  surveyData[type] = value;
  currentQuestionIndex++;
  renderQuestion();
};

export function startSurvey() {
  surveyData = {};
  currentQuestionIndex = 0;
  document.getElementById('survey-result').style.display = 'none';
  document.getElementById('question-container').style.display = 'flex';
  renderQuestion();
}

function showSurveyResult() {
  const suggestion = calculateSuggestion(surveyData);
  const resultBox = document.getElementById('survey-result');

  document.getElementById('question-container').style.display = 'none';
  document.getElementById('progress-fill').style.width = '100%';

  resultBox.innerHTML = `
    <h3>Buy Suggestion</h3>
    <p><strong>Strategy:</strong> <span class="strategy-${suggestion.strategy.toLowerCase()}">${suggestion.strategy}</span></p>
    <p><strong>Recommended:</strong></p>
    <ul>${suggestion.loadout.map(item => `<li>${item}</li>`).join('')}</ul>
    <p><strong>Reasoning:</strong> ${suggestion.reasoning}</p>
    <button class="reset-btn" onclick="window.resetSurvey()">Next Round</button>
  `;
  resultBox.style.display = 'block';
}

window.resetSurvey = function () {
  surveyData = {};
  currentQuestionIndex = 0;
  document.getElementById('survey-result').style.display = 'none';
  document.getElementById('question-container').style.display = 'flex';
  document.getElementById('progress-fill').style.width = '0%';
  renderQuestion();
};
