import { handleSurvey, startSurvey } from "./surveyLogic.js";
import { handleManual } from "./manualLogic.js";
import { adjustMoney, setMoney } from "./utils.js";

// DOM references
const surveyBtn = document.querySelector('.survey-toggle');
const manualBtn = document.querySelector('.manual-toggle');
const surveyMode = document.getElementById('survey-mode');
const manualMode = document.getElementById('manual-mode');
const startSurveyBtn = document.querySelector('.reset-btn'); // Inside survey section
const moneyButtons = document.querySelectorAll('.money-btn');

// Switch between modes
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

//  Hook up mode switch buttons
surveyBtn.addEventListener('click', () => setMode('survey'));
manualBtn.addEventListener('click', () => setMode('manual'));

//  Hook up Start Survey button
startSurveyBtn.addEventListener('click', startSurvey);

//  Hook up money controls in manual input mode
moneyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const adjust = btn.getAttribute('data-adjust');
    const set = btn.getAttribute('data-set');
    if (adjust) adjustMoney(parseInt(adjust));
    if (set) setMoney(parseInt(set));
  });
});

// Initialize logic for both modes
handleSurvey();
handleManual();
