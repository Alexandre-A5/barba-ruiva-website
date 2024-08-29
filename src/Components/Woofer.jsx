import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';


function WooferModel({ url, rotation, color }) {
  const gltf = useLoader(GLTFLoader, url);
  const model = gltf.scene;
  const ref = useRef();

  // Vérifier que le modèle est chargé correctement
  console.log('Model loaded:', model);

  // Appliquer la rotation initiale au modèle
  model.rotation.set(rotation[0], rotation[1], rotation[2]);

  // Configurer les ombres
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // Modifier la couleur du matériau
      if (child.material) {
        child.material.color.set(color);
      }
    }
  });

  // Animation flottement et rotation légère
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      
      // Animation de flottement
      ref.current.position.y = Math.sin(t) * 0.01; // Amplitude de 0.1

      // Rotation légère
      ref.current.rotation.z += 0.001; // Vitesse de rotation
    }
  });

  return <primitive ref={ref} object={model} scale={0.7} />;
}

function Woofer({className}) {
  // Valeurs de rotation en radians (x, y, z)
  const rotation = [2, 4, 0]; // Rotation de 45 degrés autour de l'axe Y

  // Couleur souhaitée (par exemple, rouge)
  const color = 'orange'; // Tu peux utiliser un code hexadécimal comme '#FF0000' ou des noms de couleurs comme 'red'

  return (
    <div className={className}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={1} position={[0, 0, 20]} />
        <ambientLight intensity={0} />
        <directionalLight
          castShadow
          position={[10, 10, 5]}
          intensity={2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="sunset" />
        <Suspense>
          <WooferModel url="/models/woofer/woofer.gltf" rotation={rotation} color={color} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default Woofer;
