import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useNavigate } from 'react-router-dom';

const GuitarModel = ({ modelPath, className }) => {
  const mountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    mountRef.current.style.background = 'none';

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 5);
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

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(model);
      camera.position.set(0, 1.5, 5);
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false;

    let clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const onMouseClick = (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / mountRef.current.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children.filter(child => child.isMesh));
      if (intersects.length > 0) {
        navigate('/contact');
      }
    };

    window.addEventListener('click', onMouseClick);

    const handleResize = () => {
      if (mountRef.current) {
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [modelPath, navigate]);

  return <div ref={mountRef} className={`model-viewer ${className}`} style={{ width: '100%', height: '100%' }} />;
};

export default GuitarModel;
