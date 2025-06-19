export function calculateSuggestion(data) {
  let strategy = 'ECO';
  let loadout = [];
  let reasoning = '';

  const money = data.money || 0;
  const lossStreak = data.loss_streak || 0;
  const situation = data.situation || 'normal';
  const lastRound = data.last_round || '';
  const side = data.side || 'T';

  const isMustBuy = situation === 'match_point' || situation === 'must_win';

  if (isMustBuy) {
    if (money >= 4700) {
      strategy = 'FULL';
      loadout = [side === 'T' ? 'AK-47' : 'M4A4/M4A1-S', 'Full Armor', 'Full Utility'];
      if (side === 'CT') loadout.push('Defuse Kit');
      reasoning = 'Full buy to avoid losing the game — strong economy';
    } else if (money >= 3000) {
      strategy = 'FORCE';
      loadout = [side === 'T' ? 'Galil AR' : 'FAMAS', 'Armor', '1-2 Grenades'];
      reasoning = 'Must-buy round — use cheap rifle and utility';
    } else if (money >= 2000) {
      strategy = 'FORCE';
      loadout = ['SMG (MAC-10/MP9)', 'Armor', '1 Flash'];
      reasoning = 'Low economy — force with SMG to try clutching the round';
    } else {
      strategy = 'FORCE';
      loadout = ['Tec-9 / Five-SeveN / P250', 'Light Armor'];
      reasoning = 'Do-or-die round — buy anything to stay alive';
    }
  } else if (money >= 4700) {
    strategy = 'FULL';
    loadout = [side === 'T' ? 'AK-47' : 'M4A4/M4A1-S', 'Full Armor', 'Full Utility'];
    if (side === 'CT') loadout.push('Defuse Kit');
    reasoning = 'Full buy round — optimal firepower and utility';
  } else if (money >= 3000) {
    strategy = 'HALF-BUY';
    loadout = [side === 'T' ? 'Galil AR' : 'FAMAS', 'Armor', 'Smoke / Flash'];
    reasoning = 'Low-to-mid economy — buy cheap rifle and limited nades';
  } else if ((money >= 2000 && lossStreak >= 2) || lastRound === 'enemy_won_close' || lastRound === 'we_won_close') {
    strategy = 'FORCE';
    loadout = ['SMG (MP9 / MAC-10)', 'Armor', 'Flash / Smoke'];
    reasoning = lossStreak >= 2 ? 'Force buy with SMG due to strong loss bonus' : 'Force buy to break enemy or keep pressure up';
  } else {
    strategy = 'ECO';
    loadout = ['Default Pistol / P250', 'Save', 'Possibly Light Armor'];
    reasoning = 'Not worth spending — save for a full buy next round';
  }

  return { strategy, loadout, reasoning };
}
