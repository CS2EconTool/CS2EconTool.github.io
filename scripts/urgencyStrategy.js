export function determineSituation(ctScore, tScore) {
  if (ctScore === 13 || tScore === 13) {
    return 'match_point';
  }

  const roundsRemaining = 13 - Math.max(ctScore, tScore);
  const scoreDifference = Math.abs(ctScore - tScore);

  if (roundsRemaining <= 2 && scoreDifference <= 1) {
    return 'must_win';
  }

  return 'normal';
}
