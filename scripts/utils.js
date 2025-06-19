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
