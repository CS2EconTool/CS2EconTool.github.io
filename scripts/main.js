// Main entry point — toggles modes and delegates to respective logic handlers

import { handleSurvey, startSurvey } from './scripts/surveyLogic.js';
import { handleManual, adjustMoney, setMoney } from './scripts/manualLogic.js';

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

// ✅ Expose functions to global window scope for inline HTML
window.startSurvey = startSurvey;
window.setMode = setMode;
window.adjustMoney = adjustMoney;
window.setMoney = setMoney;

// ✅ Initialize logic handlers
handleSurvey();
handleManual();
