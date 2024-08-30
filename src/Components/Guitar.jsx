import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function GuitarModel({ url, rotation }) {
  const gltf = useLoader(GLTFLoader, url);
  const model = gltf.scene;
  const ref = useRef();

  // Définir les couleurs à animer
  const color1 = new THREE.Color('#F9F9F9');
  const color2 = new THREE.Color('#FE5F00'); // Orange

  // Animation de couleur
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const beat = Math.sin(t * 2) * 0.5 + 0.5; // Oscillation rapide pour simuler un battement de cœur
    const color = color1.clone().lerp(color2, beat); // Interpolation entre les deux couleurs

    // Appliquer la couleur animée aux matériaux du modèle
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(color);
        }
      });
    }

    // Animation de flottement et rotation légère
    if (ref.current) {
      ref.current.position.y = Math.sin(t) * 0.001; // Amplitude de 0.1 pour le flottement
      ref.current.rotation.y += 0.010; // Vitesse de rotation
    }
  });

  // Appliquer la rotation initiale au modèle
  model.rotation.set(rotation[0], rotation[1], rotation[2]);

  // Configurer les ombres
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive ref={ref} object={model} scale={0.2} />;
}

function Guitar({ className }) {
  // Valeurs de rotation en radians (x, y, z)
  const rotation = [0, Math.PI / 3, 0.5]; // Rotation de 45 degrés autour de l'axe Y

  return (
    <div className={className}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={1} position={[0, 0, 20]} />
        <ambientLight intensity={0.1} />
        <Environment preset="sunset" />
        <Suspense fallback>
          <GuitarModel url="/models/guitar/guitar.gltf" rotation={rotation} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default Guitar;
