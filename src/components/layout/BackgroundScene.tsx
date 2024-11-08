import { useFrame, useLoader } from '@react-three/fiber';
import { Stars, OrbitControls, Sphere, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef } from 'react';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';

export const BackgroundScene = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  const rocketRef = useRef<THREE.Object3D>(null);
  const sunRef = useRef<THREE.Object3D>(null); // Ref for sun orbit
  const glitchStarsRef = useRef<(THREE.Mesh | null)[]>([]); // Ref array for glitch stars
  const orbitAngleRef = useRef(0); // To control planet and rocket orbits

  // Define orbit radius for rocket, sun, and glitch stars
  const orbitRadius = 10;

  // Load the custom sun, planets, and rocket models
  const sunModel = useGLTF('/sun_gltf/scene.gltf');
  const planetModel = useGLTF('/planet3.glb');
  const planet4Model = useLoader(FBXLoader, '/planet4/source/planet4.fbx');
  const rocketModel = useGLTF('/toy_rocket_gltf/scene.gltf');

  // Load textures for the moon
  const moonTexture = new THREE.TextureLoader().load('path/to/moon_texture.jpg');

  // Frame-based animation loop
  useFrame(() => {
    orbitAngleRef.current += 0.001; // Increment orbit angle slowly for smooth path

    if (moonRef.current) moonRef.current.rotation.y += 0.003;
    
    // Apply orbit to the sun and rotate it
    if (sunModel) {
      sunModel.scene.rotation.y += 0.001;
      sunModel.scene.position.x = -100 + Math.cos(orbitAngleRef.current) * 5;
      sunModel.scene.position.z = -100 + Math.sin(orbitAngleRef.current) * 5;
    }

    // Rotate each planet slowly and give them a slow orbit
    if (planetModel) {
      planetModel.scene.rotation.y += 0.002;
      planetModel.scene.position.x = 89 + Math.cos(orbitAngleRef.current) * 10;
      planetModel.scene.position.z = -20 + Math.sin(orbitAngleRef.current) * 10;
    }

    if (planet4Model) {
      planet4Model.rotation.y += 0.0015;
      planet4Model.position.x = -20 + Math.cos(orbitAngleRef.current + Math.PI / 2) * 8;
      planet4Model.position.z = 10 + Math.sin(orbitAngleRef.current + Math.PI / 2) * 8;
    }

    // Move the rocket in a continuous circular path with tilt and rotation
    if (rocketRef.current) {
      rocketRef.current.position.x = Math.cos(orbitAngleRef.current * 1.5) * orbitRadius;
      rocketRef.current.position.z = Math.sin(orbitAngleRef.current * 1.5) * orbitRadius - 15;
      rocketRef.current.rotation.y += 0.005;
      rocketRef.current.rotation.z += 0.003;
    }

    // Circular orbit and random movement for glitch stars
    glitchStarsRef.current.forEach((star, index) => {
      if (star) {
        const starOrbitAngle = orbitAngleRef.current + index * 0.2; // Stagger orbit angle for each star
        star.position.x = Math.cos(starOrbitAngle) * (orbitRadius + 5); // Slightly larger orbit
        star.position.z = Math.sin(starOrbitAngle) * (orbitRadius + 5) - 15;
        star.rotation.y += 0.01;
        star.rotation.x += 0.01;
      }
    });
  });

  return (
    <>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />

      {/* Background stars */}
      <Stars radius={150} depth={70} count={10000} factor={8} saturation={0} fade />

      {/* Moon with texture */}
      <mesh ref={moonRef} position={[-3, 1, -15]}>
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial map={moonTexture} />
        </Sphere>
      </mesh>

      {/* Glowing Sun model with orbit */}
      <primitive ref={sunRef} object={sunModel.scene} scale={1.50} />
      <pointLight position={[5, 3, -100]} intensity={1.5} color="orange" />

      {/* Planet 3 model with orbit */}
      <primitive object={planetModel.scene} scale={0.2} />

      {/* Planet 4 model with orbit */}
      <primitive object={planet4Model} scale={0.02} />

      {/* Rocket model with smooth circular orbit */}
      <primitive ref={rocketRef} object={rocketModel.scene} scale={0.5} />

      {/* Glitching rotating stars */}
      {Array.from({ length: 15 }).map((_, index) => (
        <mesh
          key={index}
          ref={(el) => (glitchStarsRef.current[index] = el)}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
          ]}
        >
          <Sphere args={[0.1, 8, 8]} />
          <meshStandardMaterial emissive="cyan" emissiveIntensity={0.8} />
        </mesh>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Bloom effect for glow */}
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
};

// Preload the GLTF models for performance optimization
useGLTF.preload('/sun_gltf/scene.gltf');
useGLTF.preload('/planet3.glb');
useGLTF.preload('/toy_rocket_gltf/scene.gltf');
