
"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const MODEL_PATH = "/models/azoytrix_corperate_office_building.glb";

const MODEL_HEIGHT = 7.5;

const LOOK_AT = new THREE.Vector3(0, 4.5, 0);
const START_POSITION = new THREE.Vector3(7, 0.5, 9);

const FLOOR_HEIGHT = 0.26;
const BAY_WIDTH = 0.22;
const PLINTH_HEIGHT = 0.3;

/* ------------------------------------------
   PROCEDURAL FACADE MATERIAL
------------------------------------------- */

function makeFacadeMaterial() {
  const mat = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: 0.8,
    metalness: 0,
    envMapIntensity: 1.6,
  });

  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         varying vec3 vWPos;
         varying vec3 vWNorm;`
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
         vWNorm = normalize(mat3(modelMatrix) * objectNormal);`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         varying vec3 vWPos;
         varying vec3 vWNorm;
         float gGlass = 0.0;

         vec3 srgb(vec3 c) {
           return pow(c, vec3(2.2));
         }

         float hash21(vec2 p) {
           p = fract(p * vec2(123.34, 456.21));
           p += dot(p, p + 45.32);
           return fract(p.x * p.y);
         }`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         {
           vec3 nW = normalize(vWNorm);

           float vert = 1.0 - smoothstep(
             0.35,
             0.65,
             abs(nW.y)
           );

           float u = (abs(nW.x) > abs(nW.z))
             ? vWPos.z
             : vWPos.x;

           vec2 g = vec2(
             u / ${BAY_WIDTH.toFixed(3)},
             vWPos.y / ${FLOOR_HEIGHT.toFixed(3)}
           );

           vec2 cell = floor(g);
           vec2 fr = fract(g);

           float win =
             step(0.09, fr.x) *
             step(fr.x, 0.91) *
             step(0.22, fr.y) *
             step(fr.y, 0.80);

           float aa = smoothstep(
             0.35,
             0.9,
             max(fwidth(g.x), fwidth(g.y))
           );

           win = mix(win, 0.62, aa);

           float rnd = hash21(cell + floor(nW.xz * 3.0));

           vec3 glass = srgb(vec3(0.18, 0.34, 0.46));

           glass = mix(
             glass,
             srgb(vec3(0.55, 0.71, 0.83)),
             rnd * 0.35
           );

           glass *= mix(
             0.75,
             1.3,
             clamp(vWPos.y / ${MODEL_HEIGHT.toFixed(2)}, 0.0, 1.0)
           );

           vec3 stone =
            srgb(vec3(0.32, 0.35, 0.38)) *
            (0.92 + 0.08 * rnd);

           vec3 facade = mix(stone, glass, win);

           float plinth = 1.0 - smoothstep(
             ${PLINTH_HEIGHT.toFixed(2)} - 0.03,
             ${PLINTH_HEIGHT.toFixed(2)},
             vWPos.y
           );

           facade = mix(
             facade,
             srgb(vec3(0.22, 0.24, 0.27)),
             plinth
           );

           win *= (1.0 - plinth);

           vec3 roof = srgb(vec3(0.47, 0.45, 0.43));

           diffuseColor.rgb = mix(roof, facade, vert);

           gGlass = win * vert;
         }`
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
         roughnessFactor = mix(0.85, 0.07, gGlass);`
      )
      .replace(
        "#include <metalnessmap_fragment>",
        `#include <metalnessmap_fragment>
         metalnessFactor = mix(0.0, 0.7, gGlass);`
      );
  };

  mat.customProgramCacheKey = () => "procedural-facade-v1";

  return mat;
}

/* ------------------------------------------
   BUILDING MODEL
------------------------------------------- */


function Building({
  onLoaded,
}: {
  onLoaded: () => void;
}) {
  const { scene } = useGLTF(MODEL_PATH);

  const buildingRef = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const object = scene.clone(true);

    const bounds = new THREE.Box3().setFromObject(object);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());

    const scale = MODEL_HEIGHT / Math.max(size.y, 0.001);

    object.scale.setScalar(scale);

    object.position.set(
      -center.x * scale,
      -bounds.min.y * scale,
      -center.z * scale
    );

    const facade = makeFacadeMaterial();

    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        child.material = facade;
      }
    });

    return object;
  }, [scene]);

  // Smooth rotation: right → center → left → center.
  useFrame((state) => {
    if (!buildingRef.current) return;

    const time = state.clock.elapsedTime;

    const rotationAmount = THREE.MathUtils.degToRad(9);
    const rotationSpeed = 0.35;

    buildingRef.current.rotation.y =
      Math.sin(time * rotationSpeed) * rotationAmount;
  });

  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <group ref={buildingRef}>
      <primitive object={model} />
    </group>
  );
}

/* ------------------------------------------
   INTERACTIVE SCENE
------------------------------------------- */

function Scene({
  onLoaded,
}: {
  onLoaded: () => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.45} />

      <hemisphereLight
        args={["#bcd8f5", "#8a8576", 0.9]}
      />

      <directionalLight
        position={[8, 14, 6]}
        intensity={2.6}
        color="#fff1dc"
      />

      <directionalLight
        position={[-6, 6, -4]}
        intensity={0.5}
        color="#cfe6ff"
      />

      {/* Reflections without an opaque background */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 8, -6]}
          scale={[24, 8, 1]}
          color="#ffffff"
        />

        <Lightformer
          form="rect"
          intensity={1.8}
          position={[-8, 3, 4]}
          scale={[8, 10, 1]}
          color="#dfeeff"
        />

        <Lightformer
          form="rect"
          intensity={1.4}
          position={[8, 3, 4]}
          scale={[8, 10, 1]}
          color="#fff0d8"
        />
      </Environment>

      <Suspense fallback={null}>
        <Building onLoaded={onLoaded} />
      </Suspense>

      {/* Interactive camera controls */}
      <OrbitControls
        ref={controlsRef}
        target={[LOOK_AT.x, LOOK_AT.y, LOOK_AT.z]}
        enableDamping
        dampingFactor={0.06}
        enablePan={false}
        enableRotate
        enableZoom={false}
        minDistance={8}
        maxDistance={16}
        minPolarAngle={1.65}
        maxPolarAngle={1.98}
        minAzimuthAngle={-0.5}
        maxAzimuthAngle={1.3}
        rotateSpeed={0.55}
        zoomSpeed={0.7}
        autoRotate={false}
      />
    </>
  );
}

/* ------------------------------------------
   MAIN COMPONENT
------------------------------------------- */

export default function BuildingModel() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden sm:h-[460px] lg:h-[520px]">

      {/* No background div: parent CTA background remains visible */}

      {/* Loading indicator */}
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />

            <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-200">
              LOADING ARCHITECTURE
            </p>
          </div>
        </div>
      )}

      {/* Transparent WebGL canvas */}
      <Canvas
       camera={{
            position: [6, 0.1, 5],
            fov: 42,
            near: 0.1,
            far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        onCreated={({ scene, gl }) => {
          scene.background = null;
          gl.setClearColor(0x000000, 0);
        }}
        style={{
          background: "transparent",
          touchAction: "pan-y",
        }}
      >
        <Scene onLoaded={handleLoaded} />
      </Canvas>

      {/* Interaction hint */}
      {loaded && (
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#07172f]/70 px-4 py-2 font-mono text-[9px] tracking-[0.16em] text-white/60 backdrop-blur-md">
          DRAG TO EXPLORE · SCROLL TO ZOOM
        </div>
      )}
    </div>
  );
}

/* Preload local GLB */
useGLTF.preload(MODEL_PATH);
