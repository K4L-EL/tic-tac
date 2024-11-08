type Player = 'X' | 'O';

export const resetGame = (
  setSquares: (squares: (null | Player)[]) => void,
  setCurrentPlayer: (player: Player) => void,
  setWinner: (winner: Player | null) => void,
  setSelectedAbility: (ability: 'destroy' | 'convert' | null) => void
) => {
  setSquares(Array(9).fill(null));
  setCurrentPlayer('X');
  setWinner(null);
  setSelectedAbility(null);
};
