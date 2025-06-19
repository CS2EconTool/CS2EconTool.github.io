import { handleSurvey, startSurvey } from "./scripts/surveyLogic.js";
import { handleManual } from "./scripts/manualLogic.js";
import { adjustMoney, setMoney } from "./scripts/utils.js";

// Mode toggle buttons
const surveyBtn = document.querySelector('.mode-btn:nth-child(1)');
const manualBtn = document.querySelector('.mode-btn:nth-child(2)');
const surveyMode = document.getElementById('survey-mode');
const manualMode = document.getElementById('manual-mode');

function setMode(mode) {
  if (mode === 'survey') {
    surveyMode.classList.add('active');
    manualMode.classList.remove('active');
    surveyBtn.classList.add('active');
    manualBtn.classList.remove('active');
  } else {
    surveyMode.classList.remove('active');
    manualMode.classList.add('active');
    surveyBtn.classList.remove('active');
    manualBtn.classList.add('active');
  }
}

// 🔧 Attach all event listeners in script instead of inline
document.addEventListener('DOMContentLoaded', () => {
  // Mode switch buttons
  surveyBtn.addEventListener('click', () => setMode('survey'));
  manualBtn.addEventListener('click', () => setMode('manual'));

  // Start survey button
  const startBtn = document.querySelector('.reset-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => startSurvey());
  }

  // Utility buttons (money adjustments) handled in handleManual
});

// Expose utility for dev console debugging (optional)
window.adjustMoney = adjustMoney;
window.setMoney = setMoney;

// Init
handleSurvey();
handleManual();
