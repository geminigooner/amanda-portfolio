import { useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HeartObject() {
  const groupRef = useRef<THREE.Group>(null);

  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo( x + 5, y + 5 );
    shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 10, steps: 2, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    // Invert the shape to display upright
    geometry.rotateX(Math.PI);
    return geometry;
  }, []);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
        }
      });

      tl.to(groupRef.current!.rotation, {
        y: Math.PI / 2,
        z: Math.PI / 16,
        ease: "none"
      }, 0);

      tl.to(groupRef.current!.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        ease: "none"
      }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh geometry={heartGeometry} scale={0.1}>
          <meshPhysicalMaterial 
            color="#ff006e"
            emissive="#ff006e"
            emissiveIntensity={0.05}
            roughness={0.4}
            metalness={0.6}
            clearcoat={0.5}
            clearcoatRoughness={0.3}
          />
        </mesh>
        
        {/* The Glitter Storm reduced */}
        <Sparkles count={100} scale={15} size={10} speed={0.2} opacity={0.3} color="#f472b6" />
      </Float>
    </group>
  );
}

export function HeartStorm() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-15 blur-[2px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ff006e" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#c084fc" />
        <Environment preset="city" />
        <HeartObject />
      </Canvas>
    </div>
  );
}
