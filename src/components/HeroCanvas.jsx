import { useMemo, useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, args, speed = 1, color = '#3b82f6', wireframe = false }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={args} />
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          transparent
          opacity={0.18}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, args, speed = 0.6, color = '#f4c96e' }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.07 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={args} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.12}
          wireframe={true}
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const points = useRef();
  const positions = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.6} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#f4c96e" />

      <FloatingShape position={[-4, 1.5, -3]} args={[1.2, 1]} speed={0.7} color="#3b82f6" wireframe />
      <FloatingShape position={[4.5, -1, -4]} args={[0.9, 0]} speed={0.5} color="#60a5fa" />
      <FloatingShape position={[0, 2.5, -5]} args={[0.6, 1]} speed={1.1} color="#3b82f6" wireframe />
      <FloatingShape position={[-6, -2, -6]} args={[1.5, 0]} speed={0.4} color="#1d4ed8" />

      <FloatingTorus position={[5, 2, -4]} args={[1, 0.25, 16, 40]} speed={0.8} color="#f4c96e" />
      <FloatingTorus position={[-5, -1.5, -5]} args={[0.8, 0.15, 12, 30]} speed={0.6} color="#3b82f6" />
      <FloatingTorus position={[2, -3, -3]} args={[0.5, 0.1, 12, 24]} speed={1.2} color="#f4c96e" />

      <Particles count={100} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
