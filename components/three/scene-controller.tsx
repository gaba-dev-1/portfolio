"use client"

import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  TrackballControls, 
  Environment, 
  Float,
  Sparkles
} from '@react-three/drei'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

interface NodeType {
  id: string;
  basePosition: [number, number, number];
  position: [number, number, number];
  size: number;
  speed: number;
  phase: number;
}

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
  
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 32, 32), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const mainColor = useMemo(() => new THREE.Color(color), [color])
  
  const nodeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: mainColor,
      roughness: 0.0,
      metalness: 1.0,
      emissive: mainColor,
      emissiveIntensity: isDark ? 0.9 : 0.7,
      transparent: true,
      opacity: isDark ? 0.9 : 0.8,
    })
  }, [mainColor, isDark])
  
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
  
  const getMouseInfluence = (nodePosition: THREE.Vector3) => {
    const distance = nodePosition.distanceTo(mousePosition)
    const maxDistance = 2
    const influence = Math.max(0, 1 - distance / maxDistance)
    return influence * influence * 0.3
  }
  
  useFrame(({ clock }) => {
    if (!nodesRef.current) return
    
    const t = clock.getElapsedTime()
    const mesh = nodesRef.current
    
    nodes.forEach((node, i) => {
      const nodeT = t * node.speed + node.phase
      
      const currentAngle = (i / nodes.length) * Math.PI * 2 + nodeT * 0.4
      
      const x = Math.cos(currentAngle) * radius
      const y = Math.sin(currentAngle) * radius
      const z = 0
      
      const nodeVec = new THREE.Vector3(x, y, z)
      const mouseInfluence = getMouseInfluence(nodeVec)
      
      const toMouse = new THREE.Vector3()
      toMouse.subVectors(mousePosition, nodeVec).normalize()
      
      const finalX = x + toMouse.x * mouseInfluence * 0.15
      const finalY = y + toMouse.y * mouseInfluence * 0.15
      const finalZ = z
      
      const pulseFreq = 0.6 + i * 0.1
      const growFactor = (Math.sin(nodeT * pulseFreq) + 1) * 0.3
      const baseScale = 0.8 + growFactor
      const interactiveScale = baseScale * (1 + mouseInfluence * 0.2)
      
      dummy.position.set(finalX, finalY, finalZ)
      dummy.scale.set(interactiveScale, interactiveScale, interactiveScale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.instanceMatrix.needsUpdate = true
    
    const pulseEffect = (Math.sin(t * 0.7) + 1) * 0.5
    nodeMaterial.emissiveIntensity = isDark 
      ? (0.7 + pulseEffect * 0.6) 
      : (0.5 + pulseEffect * 0.4)
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
  
  const ringColor = new THREE.Color(color)
  const emissiveColor = new THREE.Color(color).multiplyScalar(isDark ? 1.2 : 1.0)
  
  const ringMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: ringColor,
      emissive: emissiveColor,
      emissiveIntensity: isDark ? 0.6 : 0.4,
      metalness: 0.8,
      roughness: 0.15,
      transparent: true,
      opacity: isDark ? 0.7 : 0.6,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      transmission: 0.1
    })
  }, [ringColor, emissiveColor, isDark])
  
  useFrame(({ clock }) => {
    if (!ringRef.current || !torusRef.current) return
    
    const t = clock.getElapsedTime() * speed
    
    ringRef.current.rotation.x = rotation[0] + Math.sin(t * 0.4) * 0.1
    ringRef.current.rotation.y = rotation[1] + t * 0.3
    ringRef.current.rotation.z = rotation[2] + Math.cos(t * 0.6) * 0.08
    
    const distanceToMouse = mousePosition.distanceTo(new THREE.Vector3(0, 0, 0))
    const mouseInfluence = Math.max(0, 1 - distanceToMouse / 4) * 0.15
    
    ringRef.current.rotation.x += mousePosition.y * mouseInfluence
    ringRef.current.rotation.y += mousePosition.x * mouseInfluence
  })
  
  return (
    <group ref={ringRef}>
      <mesh ref={torusRef}>
        <torusGeometry args={[radius, tubeRadius, 32, 100]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>
      
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
  
  const coreColor = new THREE.Color(color)
  const innerColor = new THREE.Color(color).multiplyScalar(isDark ? 1.8 : 1.5)
  
  const sphereMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: coreColor,
      roughness: 0.05,
      metalness: 0.3,
      transmission: isDark ? 0.95 : 0.85,
      transparent: true,
      opacity: isDark ? 0.6 : 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      ior: 1.8,
      thickness: 1.5,
      envMapIntensity: isDark ? 2 : 1.5,
    })
  }, [coreColor, isDark])
  
  const innerMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: innerColor,
      transparent: true,
      opacity: isDark ? 0.9 : 0.75
    })
  }, [innerColor, isDark])
  
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
    
    const xMovement = Math.sin(t * 0.3) * 0.2
    const yMovement = Math.cos(t * 0.4) * 0.2
    const zMovement = Math.sin(t * 0.2) * 0.15
    
    positionRef.current.x = THREE.MathUtils.lerp(positionRef.current.x, xMovement, 0.05)
    positionRef.current.y = THREE.MathUtils.lerp(positionRef.current.y, yMovement, 0.05)
    positionRef.current.z = THREE.MathUtils.lerp(positionRef.current.z, zMovement, 0.05)
    
    coreRef.current.position.set(
      positionRef.current.x, 
      positionRef.current.y, 
      positionRef.current.z
    )
    
    coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    coreRef.current.rotation.y = t * 0.2 + Math.sin(t * 0.4) * 0.1
    coreRef.current.rotation.z = Math.sin(t * 0.2) * 0.15
    
    if (sphereRef.current && verticesRef.current.length > 0) {
      const geometry = sphereRef.current.geometry as THREE.SphereGeometry
      const position = geometry.attributes.position
      
      for (let i = 0; i < position.count; i++) {
        const original = originalVerticesRef.current[i]
        
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
    
    const innerPulse = 0.8 + Math.sin(t * 0.8) * 0.2
    innerRef.current.scale.set(innerPulse, innerPulse, innerPulse)
  })
  
  return (
    <group ref={coreRef}>
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <primitive object={sphereMaterial} attach="material" />
      </mesh>
      
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.75, 64, 64]} />
        <primitive object={innerMaterial} attach="material" />
      </mesh>
      
      <Sparkles
        count={isDark ? 80 : 60}
        scale={[1.8, 1.8, 1.8]}
        size={isDark ? 0.4 : 0.35}
        speed={0.4}
        opacity={isDark ? 0.7 : 0.5}
        color={color}
      />
    </group>
  )
}

function Scene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const groupRef = useRef<THREE.Group>(null)
  const { mouse, viewport } = useThree()
  const [mousePosition, setMousePosition] = useState(new THREE.Vector3(0, 0, 0))
  
  const colors = useMemo(() => ({
    primaryColor: isDark ? "#6d28d9" : "#38008d",
    secondaryColor: isDark ? "#8b5cf6" : "#6928d9",
    accentColor: isDark ? "#a855f7" : "#9333ea"
  }), [isDark])
  
  useFrame(({ mouse, viewport }) => {
    const x = mouse.x * viewport.width / 2
    const y = mouse.y * viewport.height / 2
    
    setMousePosition(prev => {
      return new THREE.Vector3(
        THREE.MathUtils.lerp(prev.x, x, 0.08),
        THREE.MathUtils.lerp(prev.y, y, 0.08),
        0
      )
    })
    
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
  
  const ringConfigs = useMemo(() => [
    { 
      id: "ring-1", 
      radius: 2.1, 
      rotation: [Math.PI/2, 0, 0] as [number, number, number], 
      speed: 0.6,
      color: colors.primaryColor,
      tubeRadius: 0.025,
      nodeCount: 4
    },
    { 
      id: "ring-2", 
      radius: 2.3, 
      rotation: [0, Math.PI/2, 0] as [number, number, number], 
      speed: 0.5,
      color: colors.secondaryColor,
      tubeRadius: 0.025,
      nodeCount: 4
    },
    { 
      id: "ring-3", 
      radius: 2.2, 
      rotation: [Math.PI/4, Math.PI/4, 0] as [number, number, number], 
      speed: 0.4,
      color: colors.accentColor,
      tubeRadius: 0.025,
      nodeCount: 4
    }
  ], [colors])
  
  return (
    <group ref={groupRef}>
      <GlassCore 
        color={colors.primaryColor} 
        mousePosition={mousePosition}
        isDark={isDark}
      />
      
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

export default function SceneController({ speed = 1 }: { speed?: number }) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
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
      <ambientLight intensity={isDark ? 0.4 : 0.3} />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={isDark ? 0.8 : 0.6}
        color={isDark ? "#8b5cf6" : "#7c3aed"} 
        distance={12} 
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
      <TrackballControls 
        rotateSpeed={1.5}
        noPan={true}
        noZoom={true}
        dynamicDampingFactor={0.05}
      />
      
      <Suspense fallback={null}>
        <Scene />
        <Environment preset="city" />
        
        <EffectComposer>
          <Bloom 
            intensity={isDark ? 0.8 : 0.5}
            luminanceThreshold={isDark ? 0.2 : 0.35}
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
