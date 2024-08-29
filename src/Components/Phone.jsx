import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function PhoneModel({ url, rotation, color }) {
  const gltf = useLoader(GLTFLoader, url);
  const model = gltf.scene;
  const ref = useRef();
  const navigate = useNavigate();

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
      ref.current.rotation.y += 0.001; // Vitesse de rotation
    }
  });
  const handleClick = () => {
    navigate('/Contact'); // Rediriger vers la page de contact
    window.scrollTo(0, 0);
  };
  return <primitive ref={ref} object={model} scale={0.001} onClick={handleClick} />;
}

function Phone() {
  // Valeurs de rotation en radians (x, y, z)
  const rotation = [0, Math.PI / 3, 1]; // Rotation de 45 degrés autour de l'axe Y

  // Couleur souhaitée (par exemple, rouge)
  const color = '#FE5F00'; // Tu peux utiliser un code hexadécimal comme '#FF0000' ou des noms de couleurs comme 'red'

  return (
    <div className='phone-box'>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={1} position={[0, 0, 13]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 10, 5]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="sunset" />
        <Suspense>
          <PhoneModel url="/models/phone/phone.gltf" rotation={rotation} color={color} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default Phone;
