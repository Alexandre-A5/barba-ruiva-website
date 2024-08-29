import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function NoteModel({ url, rotation, color }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const gltf = useLoader(GLTFLoader, url);
  const model = gltf.scene;
  const ref = useRef();

  // Appliquer la rotation initiale au modèle
  useEffect(() => {
    if (model) {
      model.rotation.set(rotation[0], rotation[1], rotation[2]);
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.color.set(color);
          }
        }
      });
      setIsLoaded(true);
    }
  }, [model, rotation, color]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = Math.sin(t) * 0.01;
      ref.current.rotation.y += 0.003;
    }
  });

  if (!isLoaded) {
    return null; // Optionally, you can return a loading indicator here
  }

  return <primitive ref={ref} object={model} scale={0.05} />;
}

function Note({ className }) {
  const rotation = [0, Math.PI / 3, 0.5];
  const color = '#F9F9F9';

  return (
    <div className={className}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={1} position={[0, 0, 20]} />
        <ambientLight intensity={1} />
        
        <Environment preset="sunset" />
        <Suspense fallback={null}>
          <NoteModel url="/models/note/note2.gltf" rotation={rotation} color={color} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default Note;
