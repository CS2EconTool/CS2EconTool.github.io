import { handleSurvey, startSurvey } from './surveyLogic.js';
import { handleManual } from './manualLogic.js';
import { adjustMoney, setMoney } from './utils.js';

// DOM elements
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

// Attach functions to global window object for use in inline HTML
window.setMode = setMode;
window.startSurvey = startSurvey;
window.adjustMoney = adjustMoney;
window.setMoney = setMoney;

// Initialize both modes
handleSurvey();
handleManual();
