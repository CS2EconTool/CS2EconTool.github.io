// Main entry point — toggles modes and delegates to respective logic handlers

import { handleSurvey } from 'scripts/surveyLogic.js';
import { handleManual } from 'scripts/manualLogic.js';

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

// Expose globally for HTML onclick
window.setMode = setMode;

// Initialize both logics
handleSurvey();
handleManual();
