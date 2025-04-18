"use client"

import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  Float, 
  MeshDistortMaterial
} from '@react-three/drei'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// Types
interface NodeType {
  id: string;
  position: [number, number, number];
  size: number;
  speed: number;
  phase: number;
}

// Nodes on a ring
function RingWithNodes({ 
  color, 
  radius, 
  tubeRadius = 0.04, 
  nodeCount = 6, 
  rotation = [0, 0, 0], 
  speed = 1,
  sceneSpeed = 1,
  ringId
}: { 
  color: string; 
  radius: number; 
  tubeRadius?: number;
  nodeCount?: number; 
  rotation?: [number, number, number]; 
  speed?: number;
  sceneSpeed?: number;
  ringId: string;
}) {
  const ringRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.12, 16, 16), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Nodes positioned on the ring
  const nodes = useMemo(() => {
    const newNodes: NodeType[] = []
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      newNodes.push({
        id: `${ringId}-${i}`,
        position: [
          Math.cos(angle) * radius, 
          Math.sin(angle) * radius, 
          0
        ] as [number, number, number],
        size: 0.12 + Math.random() * 0.08,
        speed: 0.5 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2
      })
    }
    return newNodes
  }, [radius, nodeCount, ringId])
  
  // Materials with optimized creation
  const [ringMaterial, nodeMaterial] = useMemo(() => [
    <MeshDistortMaterial
      color={color} 
      distort={0.1} 
      speed={2 * sceneSpeed}
      metalness={0.9} 
      roughness={0.2} 
      emissive={color}
      emissiveIntensity={0.5} 
      transparent={true}
      opacity={0.9}
    />,
    new THREE.MeshStandardMaterial({
      color, 
      emissive: color, 
      emissiveIntensity: 1.0,
      metalness: 0.8, 
      roughness: 0.2, 
      transparent: true
    })
  ], [color, sceneSpeed])
  
  // Animation for ring and nodes
  useFrame(({ clock }) => {
    if (!ringRef.current || !nodesRef.current) return
    
    const t = clock.getElapsedTime() * speed * sceneSpeed
    
    // Animate ring
    ringRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3) * 0.2
    ringRef.current.rotation.y = rotation[1] + t * 0.2
    ringRef.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.2
    
    // Animate nodes
    const mesh = nodesRef.current
    
    nodes.forEach((node, i) => {
      const nodeT = t * node.speed + node.phase
      const scale = 1 + Math.sin(nodeT * 2) * 0.3
      
      // Position with slight orbit variation
      const angle = (i / nodeCount) * Math.PI * 2 + nodeT * 0.1
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = Math.sin(nodeT) * 0.1 // Slight z-axis movement
      
      dummy.position.set(x, y, z)
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      
      mesh.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.instanceMatrix.needsUpdate = true
  })
  
  return (
    <group ref={ringRef}>
      {/* Ring */}
      <mesh>
        <torusGeometry args={[radius, tubeRadius, 24, 48]} />
        {ringMaterial}
      </mesh>
      
      {/* Nodes on ring */}
      <instancedMesh 
        ref={nodesRef} 
        args={[nodeGeometry, nodeMaterial, nodes.length]} 
      />
    </group>
  )
}

// Animated core sphere with distortion effects
function AnimatedCore({ color, speed = 1 }: { color: string; speed?: number }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const coreTime = useRef(0)
  
  useFrame(({ clock }) => {
    if (!coreRef.current) return
    
    coreTime.current = clock.getElapsedTime() * speed
    coreRef.current.rotation.y = coreTime.current * 0.2
  })
  
  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={3 * speed}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.8}
        transparent={true}
        opacity={0.95}
      />
    </mesh>
  )
}

// Main scene component with optimized structure
function Scene({ speed = 1 }: { speed?: number }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const groupRef = useRef<THREE.Group>(null)
  const speedRef = useRef(speed)
  
  // Update speed ref when speed changes
  useEffect(() => {
    speedRef.current = speed
  }, [speed])
  
  // Colors based on theme
  const colors = useMemo(() => ({
    primaryColor: isDark ? "#6d28d9" : "#8b5cf6",
    accentColor: isDark ? "#8b5cf6" : "#a78bfa"
  }), [isDark])
  
  // Mouse interaction
  useFrame(({ mouse }) => {
    if (!groupRef.current) return
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.2,
      0.02
    )
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.2,
      0.02
    )
  })
  
  // Ring configurations
  const ringConfigs = useMemo(() => [
    { 
      id: "ring-1", 
      radius: 2.3, 
      nodeCount: 8, 
      rotation: [Math.PI/2, 0, 0] as [number, number, number], 
      speed: 0.8
    },
    { 
      id: "ring-2", 
      radius: 2.5, 
      nodeCount: 6, 
      rotation: [0, Math.PI/2, 0] as [number, number, number], 
      speed: 1.2
    },
    { 
      id: "ring-3", 
      radius: 2.4, 
      nodeCount: 7, 
      rotation: [Math.PI/4, Math.PI/4, 0] as [number, number, number], 
      speed: 1.0
    }
  ], [])
  
  return (
    <group ref={groupRef}>
      {/* Animated core sphere */}
      <AnimatedCore color={colors.primaryColor} speed={speedRef.current} />
      
      {/* Rings with nodes */}
      {ringConfigs.map((config) => (
        <Float
          key={config.id}
          speed={1} 
          rotationIntensity={0.1 * speedRef.current} 
          floatIntensity={0.2 * speedRef.current}
        >
          <RingWithNodes 
            ringId={config.id}
            color={colors.accentColor}
            radius={config.radius}
            nodeCount={config.nodeCount}
            rotation={config.rotation}
            speed={config.speed}
            sceneSpeed={speedRef.current}
          />
        </Float>
      ))}
    </group>
  )
}

// Main component with performance optimizations
export default function SceneController({ speed = 1 }: { speed?: number }) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  if (!mounted) return null
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full absolute inset-0"
    >
      <Canvas
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
          precision: 'highp'
        }}
        dpr={[1, 2]}
        style={{ 
          background: 'transparent', 
          position: 'absolute', 
          width: '100%', 
          height: '100%' 
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
        
        <Suspense fallback={null}>
          <Scene speed={speed} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
