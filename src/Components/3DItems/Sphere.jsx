import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { GLTFLoader } from 'three-stdlib';
import { useNavigate } from 'react-router-dom';

const ModelViewer = ({ modelPath = '../models/Guittar.glb', scale = 1, position = { x: 0, y: 0, z: 0 }, redirectTo = '/contact', className }) => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const canvasSize = 300;
    renderer.setSize(canvasSize, canvasSize);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    mountRef.current.style.background = 'none';

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const spotLight = new THREE.SpotLight(0xfffffff, 5);
    spotLight.position.set(3, 3, 3);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.2;
    spotLight.decay = 2;
    spotLight.distance = 100;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);

    // Position the camera
    camera.position.set(position.x, position.y, 5 + position.z);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false;

    // Load the 3D model
    const loader = new GLTFLoader();
    let model;
    
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(scale, scale, scale);
        model.position.set(position.x, position.y, position.z);
        model.castShadow = true;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );

    // Animation function
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.01;
        
        let time = clock.getElapsedTime();
        model.position.y = position.y + Math.sin(time * 2) * 0.1;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle model click event
    const onMouseClick = (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / canvasSize) * 2 - 1;
      mouse.y = -(event.clientY / canvasSize) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      if (model) {
        const intersects = raycaster.intersectObject(model, true);
        if (intersects.length > 0) {
          navigate(redirectTo);
        }
      }
    };

    window.addEventListener('click', onMouseClick);

    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('click', onMouseClick);
    };
  }, [modelPath, scale, position, redirectTo, navigate]);

  return <div ref={mountRef} className={`model-viewer ${className}`} />;
};

export default ModelViewer;
