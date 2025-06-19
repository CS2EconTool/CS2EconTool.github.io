import { calculateSuggestion } from './scripts/utils.js';

export function handleManual() {
  const form = document.getElementById('econ-form');
  const resultBox = document.getElementById('manual-result');
  const moneyInput = document.getElementById('money');

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Parse integer fields
    data.money = parseInt(data.money);
    data.loss_streak = parseInt(data.loss_streak);
    data.ct_score = parseInt(data.ct_score);
    data.t_score = parseInt(data.t_score);

    // Determine round urgency
    if (data.ct_score === 13 || data.t_score === 13) {
      data.situation = 'match_point';
    } else if (Math.abs(data.ct_score - data.t_score) >= 4) {
      data.situation = 'must_win';
    } else {
      data.situation = 'normal';
    }

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

  // Utility button functions
  window.adjustMoney = function (amount) {
    moneyInput.value = parseInt(moneyInput.value || 0) + amount;
  };

  window.setMoney = function (amount) {
    moneyInput.value = amount;
  };
}
