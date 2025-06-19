export function getBombPlantBonus(roundLost, bombPlanted) {
  if (!bombPlanted) {
    return 0;
  }

  // In CS2, planting the bomb gives a fixed cash bonus regardless of win/loss
  // Previously this was $800, we stick to that unless meta changes
  const plantBonus = 800;

  return roundLost ? plantBonus : 0; // Bomb plant bonus is generally only awarded if round is lost
}
