import { calculateWinner } from './calculateWinner';

type Player = 'X' | 'O';

export const handleSquareClick = (
  index: number,
  squares: (null | Player)[],
  currentPlayer: Player,
  winner: Player | null,
  selectedAbility: 'destroy' | 'convert' | null,
  setSquares: (squares: (null | Player)[]) => void,
  setSelectedAbility: (ability: 'destroy' | 'convert' | null) => void,
  setWinner: (winner: Player | null) => void,
  advanceTurn: () => void
) => {
  if (winner || (squares[index] !== null && selectedAbility !== 'destroy' && selectedAbility !== 'convert')) return;

  const newSquares = [...squares];
  const audio = new Audio('/laser_sound.mp3');

  if (selectedAbility === 'destroy' && squares[index] && squares[index] !== currentPlayer) {
    newSquares[index] = null;
    setSquares(newSquares);
    setSelectedAbility(null);
    audio.play();
    advanceTurn();

    const calculatedWinner = calculateWinner(newSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    }
    return;
  }

  if (selectedAbility === 'convert' && squares[index] && squares[index] !== currentPlayer) {
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setSelectedAbility(null);
    audio.play();
    advanceTurn();

    const calculatedWinner = calculateWinner(newSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    }
    return;
  }

  if (!selectedAbility && !squares[index]) {
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    audio.play();
    advanceTurn();

    const calculatedWinner = calculateWinner(newSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    }
  }
};
