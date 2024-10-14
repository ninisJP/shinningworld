// src/ModelViewer.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function InteractiveModel({ path, onPartClick }) {
  const { scene } = useGLTF(path, true);

  // Asignar identificadores a partes específicas del modelo
  scene.traverse((child) => {
    if (child.isMesh) {
      // Asignar nombres a las partes del modelo (debes conocer la estructura del modelo)
      if (child.name === "Part1") child.userData = { id: "part1" };
      if (child.name === "Part2") child.userData = { id: "part2" };
    }
  });

  return (
    <primitive
      object={scene}
      scale={2}
      onClick={(event) => {
        const partId = event.object.userData.id;
        if (partId) {
          onPartClick(partId);
        }
      }}
    />
  );
}

export default function ModelViewer({ path, onPartClick }) {
  return (
    <Canvas 
      style={{ height: '100vh', width: '100%' }}
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={true} />
      <InteractiveModel path={path} onPartClick={onPartClick} />
    </Canvas>
  );
}
