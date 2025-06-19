// manualLogic.js
import { calculateSuggestion, parseNumber } from './utils.js';
import { determineSituation } from './urgencyStrategy.js';

export function handleManual() {
  const form = document.getElementById('econ-form');
  const resultBox = document.getElementById('manual-result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const money = parseNumber(document.getElementById('money').value, 0);
    const side = document.getElementById('side').value;
    const loss_streak = parseNumber(document.getElementById('loss_streak').value, 0);
    const ctScore = parseNumber(document.getElementById('ct_score').value, 0);
    const tScore = parseNumber(document.getElementById('t_score').value, 0);
    const situation = determineSituation(ctScore, tScore);

    const data = { money, side, loss_streak, situation };

    const suggestion = calculateSuggestion(data);

    resultBox.innerHTML = `
      <h3>Buy Suggestion</h3>
      <p><strong>Strategy:</strong> <span class="strategy-${suggestion.strategy.toLowerCase()}">${suggestion.strategy}</span></p>
      <p><strong>Recommended:</strong></p>
      <ul>${suggestion.loadout.map(item => `<li>${item}</li>`).join('')}</ul>
      <p><strong>Reasoning:</strong> ${suggestion.reasoning}</p>
    `;
    resultBox.style.display = 'block';
  });
}
