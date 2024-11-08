import { Canvas } from '@react-three/fiber';
import { BackgroundScene } from '../src/components/layout/BackgroundScene';
import { ThreeDGame } from '../src/components/organisms/ThreeDGame';
import { ThreeDGameUI } from '../src/components/organisms/ThreeDGameUI';
import { useState } from 'react';
import { handleSquareClick } from '../src/util/handleSquareClick';
import { advanceTurn } from '../src/util/advanceRuen';
import { resetGame } from '../src/util/restartGame';
import { handleAbilitySelect } from '../src/util/handleAbilitySelect';

type Player = 'X' | 'O';

export const App = () => {
  const [squares, setSquares] = useState<(null | Player)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<null | Player>(null);
  const [selectedAbility, setSelectedAbility] = useState<null | 'destroy' | 'convert'>(null);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-900 text-white flex">
      <div className="w-64 h-full bg-gray-800 p-4 flex flex-col items-start space-y-4">
        <ThreeDGameUI
          currentPlayer={currentPlayer}
          winner={winner}
          onResetGame={() => resetGame(setSquares, setCurrentPlayer, setWinner, setSelectedAbility)}
          onAbilitySelect={(ability) => handleAbilitySelect(ability, setSelectedAbility)}
        />
      </div>

      <Canvas className="flex-grow relative">
        <BackgroundScene />
        <ThreeDGame
          squares={squares}
          onSquareClick={(index) =>
            handleSquareClick(
              index,
              squares,
              currentPlayer,
              winner,
              selectedAbility,
              setSquares,
              setSelectedAbility,
              setWinner,
              () => advanceTurn(currentPlayer, setCurrentPlayer)
            )
          }
        />
      </Canvas>
    </div>
  );
};
