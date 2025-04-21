"use client"

import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  Float, 
  Sphere,
  useTexture,
  Sparkles
} from '@react-three/drei'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

// Types
interface NodeType {
  id: string;
  basePosition: [number, number, number];
  position: [number, number, number];
  size: number;
  speed: number;
  phase: number;
}

// Simplified, smaller nodes that stay on rings
function RingNodes({ 
  color, 
  radius, 
  nodeCount = 4, 
  ringId,
  mousePosition,
  thickness = 0.025,
  isDark
}: { 
  color: string; 
  radius: number; 
  nodeCount?: number; 
  ringId: string;
  mousePosition: THREE.Vector3;
  thickness?: number;
  isDark: boolean;
}) {
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  
  // Even smaller geometry
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 32, 32), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Single color
  const mainColor = useMemo(() => new THREE.Color(color), [color])
  
  // Energy-like material - improved for light mode
  const nodeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: mainColor,
      roughness: 0.0,
      metalness: 1.0,
      emissive: mainColor,
      emissiveIntensity: isDark ? 0.9 : 0.7, // Improved in light mode
      transparent: true,
      opacity: isDark ? 0.9 : 0.8, // Improved in light mode
    })
  }, [mainColor, isDark])
  
  // Generate nodes
  const nodes = useMemo(() => {
    const newNodes: NodeType[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      
      const basePosition: [number, number, number] = [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ]
      
      newNodes.push({
        id: `${ringId}-${i}`,
        basePosition: [...basePosition],
        position: [...basePosition],
        size: 0.1,
        speed: 0.15 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2
      })
    }
    
    return newNodes
  }, [radius, nodeCount, ringId])
  
  // Reduced mouse influence
  const getMouseInfluence = (nodePosition: THREE.Vector3) => {
    const distance = nodePosition.distanceTo(mousePosition)
    const maxDistance = 2
    const influence = Math.max(0, 1 - distance / maxDistance)
    return influence * influence * 0.3 // Reduced overall influence
  }
  
  useFrame(({ clock }) => {
    if (!nodesRef.current) return
    
    const t = clock.getElapsedTime()
    const mesh = nodesRef.current
    
    // Animate each node
    nodes.forEach((node, i) => {
      const nodeT = t * node.speed + node.phase
      
      // Circular motion - stay on the ring
      const currentAngle = (i / nodes.length) * Math.PI * 2 + nodeT * 0.2
      
      // Position exactly on ring
      const x = Math.cos(currentAngle) * radius
      const y = Math.sin(currentAngle) * radius
      const z = 0
      
      // Calculate very limited mouse influence
      const nodeVec = new THREE.Vector3(x, y, z)
      const mouseInfluence = getMouseInfluence(nodeVec)
      
      // Attraction to mouse (limited)
      const toMouse = new THREE.Vector3()
      toMouse.subVectors(mousePosition, nodeVec).normalize()
      
      // Final position with minimal mouse attraction
      const finalX = x + toMouse.x * mouseInfluence * 0.15
      const finalY = y + toMouse.y * mouseInfluence * 0.15
      const finalZ = z
      
      // Subtle pulse
      const pulseFreq = 0.6 + i * 0.1
      const growFactor = (Math.sin(nodeT * pulseFreq) + 1) * 0.3 // reduced range
      const baseScale = 0.8 + growFactor // 0.8 to 1.1 scale
      const interactiveScale = baseScale * (1 + mouseInfluence * 0.2)
      
      // Update node
      dummy.position.set(finalX, finalY, finalZ)
      dummy.scale.set(interactiveScale, interactiveScale, interactiveScale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    
    // Update matrix
    mesh.instanceMatrix.needsUpdate = true
    
    // Animate material - improved intensity in light mode
    const pulseEffect = (Math.sin(t * 0.7) + 1) * 0.5 // 0 to 1
    nodeMaterial.emissiveIntensity = isDark 
      ? (0.7 + pulseEffect * 0.6) 
      : (0.5 + pulseEffect * 0.4) // Improved in light mode
  })
  
  return (
    <group>
      <instancedMesh 
        ref={nodesRef} 
        args={[nodeGeometry, nodeMaterial, nodes.length]} 
        castShadow
      />
    </group>
  )
}

// Ring component with uniform sizing
function Ring({ 
  color, 
  radius, 
  tubeRadius = 0.025, 
  rotation = [0, 0, 0], 
  speed = 1,
  ringId,
  mousePosition,
  nodeCount = 12,
  isDark
}: { 
  color: string; 
  radius: number; 
  tubeRadius?: number;
  rotation?: [number, number, number]; 
  speed?: number;
  ringId: string;
  mousePosition: THREE.Vector3;
  nodeCount?: number;
  isDark: boolean;
}) {
  const ringRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  
  // Enhanced ring material
  const ringColor = new THREE.Color(color)
  const emissiveColor = new THREE.Color(color).multiplyScalar(isDark ? 1.2 : 1.0) // Improved in light mode
  
  const ringMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: ringColor,
      emissive: emissiveColor,
      emissiveIntensity: isDark ? 0.6 : 0.4, // Improved in light mode
      metalness: 0.8,
      roughness: 0.15,
      transparent: true,
      opacity: isDark ? 0.7 : 0.6, // Improved in light mode
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      transmission: 0.1
    })
  }, [ringColor, emissiveColor, isDark])
  
  useFrame(({ clock }) => {
    if (!ringRef.current || !torusRef.current) return
    
    const t = clock.getElapsedTime() * speed
    
    // Subtle rotation with organic movement
    ringRef.current.rotation.x = rotation[0] + Math.sin(t * 0.2) * 0.1
    ringRef.current.rotation.y = rotation[1] + t * 0.15
    ringRef.current.rotation.z = rotation[2] + Math.cos(t * 0.3) * 0.08
    
    // Calculate mouse influence for reactivity
    const distanceToMouse = mousePosition.distanceTo(new THREE.Vector3(0, 0, 0))
    const mouseInfluence = Math.max(0, 1 - distanceToMouse / 4) * 0.15
    
    // Apply subtle interaction effects
    ringRef.current.rotation.x += mousePosition.y * mouseInfluence
    ringRef.current.rotation.y += mousePosition.x * mouseInfluence
  })
  
  return (
    <group ref={ringRef}>
      {/* More visible ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[radius, tubeRadius, 32, 100]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>
      
      {/* Exactly 12 nodes on the ring */}
      <RingNodes
        ringId={ringId}
        color={color}
        radius={radius}
        nodeCount={nodeCount}
        mousePosition={mousePosition}
        thickness={tubeRadius}
        isDark={isDark}
      />
    </group>
  )
}

// Core with smooth distortion - higher res geometry
function GlassCore({ 
  color, 
  mousePosition,
  isDark
}: { 
  color: string, 
  mousePosition: THREE.Vector3,
  isDark: boolean
}) {
  const coreRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const verticesRef = useRef<number[][]>([])
  const originalVerticesRef = useRef<number[][]>([])
  const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
  
  // Create vibrant core colors
  const coreColor = new THREE.Color(color)
  const innerColor = new THREE.Color(color).multiplyScalar(isDark ? 1.8 : 1.5) // Improved brightness in light mode
  
  // Smoother glass-like material with improved visibility in light mode
  const sphereMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: coreColor,
      roughness: 0.05,
      metalness: 0.3,
      transmission: isDark ? 0.95 : 0.85, // Improved in light mode
      transparent: true,
      opacity: isDark ? 0.6 : 0.7, // Improved in light mode
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      ior: 1.8,
      thickness: 1.5,
      envMapIntensity: isDark ? 2 : 1.5, // Improved in light mode
    })
  }, [coreColor, isDark])
  
  // Bright inner core - improved for light mode
  const innerMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: innerColor,
      transparent: true,
      opacity: isDark ? 0.9 : 0.75 // Improved in light mode
    })
  }, [innerColor, isDark])
  
  // Setup for vertex distortion
  useEffect(() => {
    if (sphereRef.current) {
      const geometry = sphereRef.current.geometry as THREE.SphereGeometry
      const position = geometry.attributes.position
      const vertices: number[][] = []
      const originalVertices: number[][] = []
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i)
        const y = position.getY(i)
        const z = position.getZ(i)
        
        vertices.push([x, y, z])
        originalVertices.push([x, y, z])
      }
      
      verticesRef.current = vertices
      originalVerticesRef.current = originalVertices
    }
  }, [])
  
  useFrame(({ clock }) => {
    if (!coreRef.current || !sphereRef.current || !innerRef.current) return
    
    const t = clock.getElapsedTime()
    
    // Fluid autonomous motion
    const xMovement = Math.sin(t * 0.3) * 0.2
    const yMovement = Math.cos(t * 0.4) * 0.2
    const zMovement = Math.sin(t * 0.2) * 0.15
    
    // Smooth position transition
    positionRef.current.x = THREE.MathUtils.lerp(positionRef.current.x, xMovement, 0.05)
    positionRef.current.y = THREE.MathUtils.lerp(positionRef.current.y, yMovement, 0.05)
    positionRef.current.z = THREE.MathUtils.lerp(positionRef.current.z, zMovement, 0.05)
    
    coreRef.current.position.set(
      positionRef.current.x, 
      positionRef.current.y, 
      positionRef.current.z
    )
    
    // Smooth rotation
    coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    coreRef.current.rotation.y = t * 0.2 + Math.sin(t * 0.4) * 0.1
    coreRef.current.rotation.z = Math.sin(t * 0.2) * 0.15
    
    // Apply strong distortion with fluidity
    if (sphereRef.current && verticesRef.current.length > 0) {
      const geometry = sphereRef.current.geometry as THREE.SphereGeometry
      const position = geometry.attributes.position
      
      for (let i = 0; i < position.count; i++) {
        const original = originalVerticesRef.current[i]
        
        // Fluid distortion with wave functions
        const noise1 = Math.sin(original[0] * 2 + t * 0.7) * 0.15
        const noise2 = Math.cos(original[1] * 2.2 + t * 0.6) * 0.15
        const noise3 = Math.sin(original[2] * 1.8 + t * 0.5) * 0.15
        
        position.setX(i, original[0] + noise1)
        position.setY(i, original[1] + noise2)
        position.setZ(i, original[2] + noise3)
      }
      
      position.needsUpdate = true
      geometry.computeVertexNormals()
    }
    
    // Inner core pulsing - organic motion
    const innerPulse = 0.8 + Math.sin(t * 0.8) * 0.2
    innerRef.current.scale.set(innerPulse, innerPulse, innerPulse)
  })
  
  return (
    <group ref={coreRef}>
      {/* Ultra-high res sphere for smooth appearance */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <primitive object={sphereMaterial} attach="material" />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.75, 64, 64]} />
        <primitive object={innerMaterial} attach="material" />
      </mesh>
      
      {/* Improved sparkling effect for light mode */}
      <Sparkles
        count={isDark ? 80 : 60} // More sparkles in light mode
        scale={[1.8, 1.8, 1.8]}
        size={isDark ? 0.4 : 0.35} // Improved size in light mode
        speed={0.4}
        opacity={isDark ? 0.7 : 0.5} // Improved opacity in light mode
        color={color}
      />
    </group>
  )
}

// Main scene with uniform rings
function Scene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const groupRef = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()
  const [mousePosition, setMousePosition] = useState(new THREE.Vector3(0, 0, 0))
  
  // Enhanced color palette with improved light mode colors
  const colors = useMemo(() => ({
    primaryColor: isDark ? "#6d28d9" : "#38008d", // More vibrant purple for light mode
    secondaryColor: isDark ? "#8b5cf6" : "#6928d9", // More vibrant purple for light mode
    accentColor: isDark ? "#a855f7" : "#9333ea" // More vibrant purple for light mode
  }), [isDark])
  
  // Update mouse position for interaction
  useFrame(({ mouse, viewport }) => {
    // Convert normalized mouse coordinates to scene space
    const x = mouse.x * viewport.width / 2
    const y = mouse.y * viewport.height / 2
    
    // Smooth transition for mouse movement
    setMousePosition(prev => {
      return new THREE.Vector3(
        THREE.MathUtils.lerp(prev.x, x, 0.08),
        THREE.MathUtils.lerp(prev.y, y, 0.08),
        0
      )
    })
    
    // Subtle group rotation for depth
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.15,
        0.02
      )
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.15,
        0.02
      )
    }
  })
  
  // Uniform ring configuration
  const ringConfigs = useMemo(() => [
    { 
      id: "ring-1", 
      radius: 2.1, 
      rotation: [Math.PI/2, 0, 0] as [number, number, number], 
      speed: 0.6,
      color: colors.primaryColor,
      tubeRadius: 0.025,
      nodeCount: 4  // Only 4 nodes per ring = 12 total
    },
    { 
      id: "ring-2", 
      radius: 2.3, 
      rotation: [0, Math.PI/2, 0] as [number, number, number], 
      speed: 0.5,
      color: colors.secondaryColor,
      tubeRadius: 0.025,
      nodeCount: 4  // Only 4 nodes per ring = 12 total
    },
    { 
      id: "ring-3", 
      radius: 2.2, 
      rotation: [Math.PI/4, Math.PI/4, 0] as [number, number, number], 
      speed: 0.4,
      color: colors.accentColor,
      tubeRadius: 0.025,
      nodeCount: 4  // Only 4 nodes per ring = 12 total
    }
  ], [colors])
  
  return (
    <group ref={groupRef}>
      {/* Glass-like core */}
      <GlassCore 
        color={colors.primaryColor} 
        mousePosition={mousePosition}
        isDark={isDark}
      />
      
      {/* Uniform rings */}
      {ringConfigs.map((config) => (
        <Float
          key={config.id}
          speed={0.3} 
          rotationIntensity={0.1} 
          floatIntensity={0.2}
          floatingRange={[-0.05, 0.05]}
        >
          <Ring 
            ringId={config.id}
            color={config.color}
            radius={config.radius}
            rotation={config.rotation}
            speed={config.speed}
            tubeRadius={config.tubeRadius}
            mousePosition={mousePosition}
            nodeCount={config.nodeCount}
            isDark={isDark}
          />
        </Float>
      ))}
    </group>
  )
}

// Main controller with optimized rendering
export default function SceneController({ speed = 1 }: { speed?: number }) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  // Optimized canvas setup
  const memoizedScene = useMemo(() => (
    <Canvas
      gl={{ 
        alpha: true, 
        antialias: true,
        powerPreference: 'high-performance'
      }}
      dpr={[1, 2]}
      style={{ 
        background: 'transparent', 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
      camera={{ position: [0, 0, 10], fov: 40 }}
    >
      {/* Ambient lighting */}
      <ambientLight intensity={isDark ? 0.4 : 0.3} />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={isDark ? 0.8 : 0.6} // Improved light intensity in light mode
        color={isDark ? "#8b5cf6" : "#7c3aed"} 
        distance={12} 
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.5}
        rotateSpeed={0.3}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      <Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
        
        <EffectComposer>
          <Bloom 
            intensity={isDark ? 0.8 : 0.5} // Improved bloom in light mode
            luminanceThreshold={isDark ? 0.2 : 0.35} // Better threshold for light mode
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.SCREEN}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  ), [isDark])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full absolute inset-0 z-0"
    >
      {memoizedScene}
    </motion.div>
  )
}
