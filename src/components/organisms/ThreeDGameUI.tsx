import { useState } from 'react';
import { Button } from '../atoms/Button';
import { FaPlay, FaPause } from 'react-icons/fa'; 

const bgMusic = new Audio('/space_music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;

type Player = 'X' | 'O';

type ThreeDGameUIProps = {
  currentPlayer: Player;
  winner: Player | null;
  onResetGame: () => void;
  onAbilitySelect: (ability: 'destroy' | 'convert') => void;
};

export const ThreeDGameUI  = ({
  currentPlayer,
  winner,
  onResetGame,
  onAbilitySelect,
}: ThreeDGameUIProps) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const status = winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`;

  // Toggle music playback
  const toggleMusic = () => {
    if (isMusicPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(() => console.log("Playback prevented by autoplay policy"));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="flex flex-col items-start space-y-4 w-full">
      <div className="text-xl font-bold mb-2">{status}</div>
      <Button onClick={onResetGame} state="enabled">
        Restart
      </Button>
      {!winner && (
        <>
          <Button onClick={() => onAbilitySelect('destroy')} state="enabled">
            Destroy
          </Button>
          <Button onClick={() => onAbilitySelect('convert')} state="enabled">
            Convert
          </Button>
        </>
      )}
      <div onClick={toggleMusic}>

        {isMusicPlaying ? <FaPause /> : <FaPlay />} 
      </div>

    </div>
  );
};
