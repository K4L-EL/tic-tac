import { Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

type Player = 'X' | 'O';

type ThreeDBoardProps = {
  squares: (null | Player)[];
  onSquareClick: (index: number) => void;
};

export const ThreeDBoard = ({ squares, onSquareClick }: ThreeDBoardProps) => {
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);

  return (
    <group position={[0, 0, 0]}> {/* Center the board */}
      {squares.map((value, index) => (
        <Sphere
          key={index}
          args={[0.3, 32, 32]} // radius, width segments, height segments
          position={[
            (index % 3) - 1,       // X position (adjusted for centering)
            1 - Math.floor(index / 3), // Y position (inverted for proper layout)
            0,                      // Z position
          ]}
          ref={(el) => (sphereRefs.current[index] = el)}
          onClick={() => onSquareClick(index)}
        >
          <meshStandardMaterial color={value === 'X' ? 'red' : value === 'O' ? 'blue' : 'white'} />
        </Sphere>
      ))}
    </group>
  );
};
