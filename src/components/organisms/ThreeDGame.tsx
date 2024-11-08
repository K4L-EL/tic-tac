import { ThreeDBoard } from '../molecules/ThreeDBoard';

type Player = 'X' | 'O';

type ThreeDGameProps = {
  squares: (null | Player)[];
  onSquareClick: (index: number) => void;
};

export const ThreeDGame = ({ squares, onSquareClick }: ThreeDGameProps) => {
  return (
    <group>
      <ThreeDBoard squares={squares} onSquareClick={onSquareClick} />
    </group>
  );
};
