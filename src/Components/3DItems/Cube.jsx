// src/components/Cube.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

const Cube = ({ size = 1, color = 0x00ff00, position = { x: 0, y: 0, z: 0 } }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    cube.castShadow = true; // Cube will cast shadows
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    light.castShadow = true; // Light will cast shadows
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;  
    controls.enableZoom = false; 

    camera.position.z = 5;

    // Animation function
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      let delta = clock.getDelta();
      let time = clock.getElapsedTime();
      
      // Apply a floating effect
      cube.position.y = position.y + Math.sin(time * 2) * 0.1;
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.01;

      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [size, color, position]);

  return <div ref={mountRef} />;
};

export default Cube;
