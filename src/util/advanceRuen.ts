type Player = 'X' | 'O';

export const advanceTurn = (currentPlayer: Player, setCurrentPlayer: (player: Player) => void) => {
  setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
};
