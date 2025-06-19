// utils.js

// Clamp a number between min and max
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Format number as money (e.g., 2500 → "$2,500")
export function formatMoney(amount) {
  return "$" + amount.toLocaleString("en-US");
}

// Determine round situation (used in both modes)
export function getSituation(ctScore, tScore) {
  if (ctScore === 13 || tScore === 13) return "match_point";
  if (Math.abs(ctScore - tScore) >= 5) return "must_win";
  return "normal";
}

// Parse number safely with fallback
export function parseNumber(value, fallback = 0) {
  const parsed = parseInt(value);
  return isNaN(parsed) ? fallback : parsed;
}

// Main logic for economic suggestion
export function calculateSuggestion(data) {
  let strategy = 'ECO';
  let loadout = [];
  let reasoning = '';

  const money = data.money || 0;
  const lossStreak = data.loss_streak || 0;
  const situation = data.situation || 'normal';
  const lastRound = data.last_round || '';
  const side = data.side || '';

  if (money >= 4700 || situation === 'match_point') {
    strategy = 'FULL';
    loadout = ['Rifle (AK/M4)', 'Full Armor', 'Full Utility'];
    if (side === 'CT') loadout.push('Defuse Kit');
    reasoning = money >= 4700 ? 'You have enough for full buy.' : 'Match point - must buy.';
  } else if (
    (money >= 2000 && lossStreak >= 2) ||
    situation === 'must_win' ||
    lastRound === 'enemy_won_close' ||
    lastRound === 'we_won_close'
  ) {
    strategy = 'FORCE';
    loadout = ['SMG / Deagle', 'Armor', 'Limited Utility'];
    if (lossStreak >= 2) reasoning = 'Loss bonus will help next round.';
    else if (lastRound === 'enemy_won_close') reasoning = 'Enemy might be low on money.';
    else if (lastRound === 'we_won_close') reasoning = 'Team might need to re-buy utility.';
    else reasoning = 'This round is crucial to win.';
  } else {
    strategy = 'ECO';
    loadout = ['Pistol', 'Maybe Armor', 'Save Money'];
    reasoning = (lastRound === 'enemy_won_easy')
      ? 'Enemy likely has full buys - save for better round.'
      : 'Save for next round full buy.';
  }

  return { strategy, loadout, reasoning };
}
