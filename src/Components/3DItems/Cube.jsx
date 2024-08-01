// src/components/Cube.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { useNavigate } from 'react-router-dom';

const Cube = ({ size = 1, color = 0x00ff00, position = { x: 0, y: 0, z: 0 }, redirectTo = '/' }) => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return; // Check if mountRef.current is defined

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow maps
    mountRef.current.appendChild(renderer.domElement);

    // Create a cube with shadow material
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    cube.castShadow = true; // Cube will cast shadows
    scene.add(cube);

    // Add an ambient light
    const ambientLight = new THREE.AmbientLight(0x404040,3); // Soft white light
    scene.add(ambientLight);

    // Add a point light to create shadows
    const spotLight = new THREE.SpotLight(0xffffff, 10); // Color, intensity
    spotLight.position.set(4, 4, 4);
    spotLight.angle = Math.PI / 6; // Cone angle
    spotLight.penumbra = 0.2; // Softness of the edge
    spotLight.decay = 2; // Light decay
    spotLight.distance = 200; // Distance the light can travel
    spotLight.castShadow = true; // Spotlight will cast shadows

    // Adjust shadow properties
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);

    camera.position.z = 5;

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false; // Disable zoom

    // Animation function
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.001;
      cube.rotation.y += 0.01;

      let time = clock.getElapsedTime();

      // Apply a floating effect
      cube.position.y = position.y + Math.sin(time * 2) * 0.1;

      controls.update(); // Update controls to ensure camera doesn't move

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle cube click event
    const onMouseClick = (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Create a raycaster
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // Check if ray intersects with cube
      const intersects = raycaster.intersectObject(cube);
      if (intersects.length > 0) {
        navigate(redirectTo); // Redirect to the specified route
      }
    };

    window.addEventListener('click', onMouseClick);

    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onMouseClick);
    };
  }, [size, color, position, redirectTo, navigate]);

  return <div ref={mountRef}/>
};

export default Cube;
