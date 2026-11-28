"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_URL = "/models/geometry_texture_effect_spheres.glb";
const TARGET_SIZE = 3; // model is auto-scaled so its largest side equals this
const MIN_DIST = 3;
const MAX_DIST = 10;

/* ---------- Scatter / reassemble settings ---------- */
const SCATTER_MIN = 0.5; // how far pieces fly out (x model size)
const SCATTER_MAX = 1.1;
const SPIN_MAX = 2.2; // max swirl angle in radians
const INTRO_WAIT = 0.35; // seconds scattered before joining on first load
const ASSEMBLE = 2.4; // seconds each piece takes to fly back
const STAGGER = 0.7; // random start delay per piece, so they arrive one by one
const BURST = 0.9; // seconds for the explosion when you press the button
const HOLD = 0.25; // pause while fully scattered before joining again

const rnd = () => Math.random() * 2 - 1;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOutQuart = (p: number) => 1 - Math.pow(1 - p, 4);
const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

type Piece = {
  wrapper: THREE.Group;
  offset: THREE.Vector3; // full scatter offset (parent space)
  spin: THREE.Vector3; // full scatter rotation
  delay: number;
  a: number; // 0 = scattered, 1 = assembled
};

function applyPiece(p: Piece) {
  const k = 1 - p.a;
  p.wrapper.position.copy(p.offset).multiplyScalar(k);
  p.wrapper.rotation.set(p.spin.x * k, p.spin.y * k, p.spin.z * k);
}

/**
 * Puts every mesh inside its own wrapper group. We move the wrapper, so the
 * model's original GLB animation keeps working on the mesh underneath.
 */
function buildPieces(scene: THREE.Object3D): Piece[] {
  const cached = scene.userData.pieces as Piece[] | undefined;
  if (cached) return cached;

  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxSide = Math.max(size.x, size.y, size.z);

  const meshes: THREE.Mesh[] = [];
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh && !(m as THREE.SkinnedMesh).isSkinnedMesh && m.parent) {
      meshes.push(m);
    }
  });

  const pieces: Piece[] = meshes.map((mesh) => {
    const parent = mesh.parent as THREE.Object3D;
    const c = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());

    // fly outward from the model centre, with some randomness
    const dir = c.clone().sub(center);
    if (dir.lengthSq() < 1e-8) dir.set(rnd(), rnd(), rnd());
    dir
      .normalize()
      .add(new THREE.Vector3(rnd(), rnd(), rnd()).multiplyScalar(0.5))
      .normalize();

    const dist = maxSide * (SCATTER_MIN + Math.random() * (SCATTER_MAX - SCATTER_MIN));

    // convert the world-space move into the parent's local space
    const p0 = parent.worldToLocal(c.clone());
    const p1 = parent.worldToLocal(c.clone().add(dir.multiplyScalar(dist)));

    const wrapper = new THREE.Group();
    wrapper.name = "scatter-wrapper";
    parent.add(wrapper);
    wrapper.add(mesh);

    const piece: Piece = {
      wrapper,
      offset: p1.sub(p0),
      spin: new THREE.Vector3(rnd(), rnd(), rnd()).multiplyScalar(SPIN_MAX),
      delay: Math.random() * STAGGER,
      a: 0,
    };
    applyPiece(piece); // start scattered, so there is no assembled flash
    return piece;
  });

  scene.userData.pieces = pieces;
  return pieces;
}

type Timeline = {
  mode: "intro" | "burst" | "idle";
  start: number;
  from: number[];
};

function Model({
  playing,
  onToggle,
  burstKey,
}: {
  playing: boolean;
  onToggle: () => void;
  burstKey: number;
}) {
  const group = useRef<THREE.Group>(null); // parallax + hover scale
  const animRoot = useRef<THREE.Group>(null); // animation target
  const [hovered, setHovered] = useState(false);

  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names, mixer } = useAnimations(animations, animRoot);

  // Auto-fit: measured in the ASSEMBLED state, before pieces are built
  const { scale, offset } = useMemo(() => {
    (scene.userData.pieces as Piece[] | undefined)?.forEach((p) => {
      p.a = 1;
      applyPiece(p);
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = TARGET_SIZE / Math.max(size.x, size.y, size.z || 1);
    return { scale: s, offset: center.multiplyScalar(-1) };
  }, [scene]);

  const pieces = useMemo(() => buildPieces(scene), [scene]);

  const timeline = useRef<Timeline>({ mode: "intro", start: -1, from: [] });

  // Intro: start scattered, then join (skipped if the user prefers reduced motion)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pieces.forEach((p) => {
      p.a = reduced ? 1 : 0;
      applyPiece(p);
    });
    timeline.current = { mode: reduced ? "idle" : "intro", start: -1, from: [] };
  }, [pieces]);

  // Button: burst apart, pause, then join again
  useEffect(() => {
    if (burstKey === 0) return;
    timeline.current = {
      mode: "burst",
      start: -1,
      from: pieces.map((p) => p.a),
    };
  }, [burstKey, pieces]);

  // Play the model's ORIGINAL animation clips
  useEffect(() => {
    names.forEach((name) => {
      const action = actions[name];
      if (!action) return;
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.6).play();
    });
    return () => {
      names.forEach((name) => actions[name]?.fadeOut(0.3));
    };
  }, [actions, names]);

  // Pause / resume
  useEffect(() => {
    names.forEach((name) => {
      const action = actions[name];
      if (action) action.paused = !playing;
    });
  }, [playing, actions, names]);

  // Cursor feedback
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((state) => {
    // Scatter -> reassemble
    const t = timeline.current;
    if (t.mode !== "idle") {
      if (t.start < 0) t.start = state.clock.elapsedTime;
      const e = state.clock.elapsedTime - t.start;
      let done = true;

      pieces.forEach((p, i) => {
        let a: number;
        if (t.mode === "intro") {
          const q = clamp01((e - INTRO_WAIT - p.delay) / ASSEMBLE);
          a = easeOutQuart(q);
          if (q < 1) done = false;
        } else if (e < BURST) {
          a = (t.from[i] ?? 1) * (1 - easeOutCubic(e / BURST));
          done = false;
        } else {
          const q = clamp01((e - BURST - HOLD - p.delay) / ASSEMBLE);
          a = easeOutQuart(q);
          if (q < 1) done = false;
        }
        p.a = a;
        applyPiece(p);
      });

      if (done) t.mode = "idle";
    }

    if (!group.current) return;

    // Mouse parallax tilt
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.35,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.2,
      0.05
    );

    // Hover: gentle scale-up + animation speeds up
    const s = THREE.MathUtils.lerp(group.current.scale.x, hovered ? 1.06 : 1, 0.08);
    group.current.scale.setScalar(s);
    mixer.timeScale = THREE.MathUtils.lerp(mixer.timeScale, hovered ? 1.6 : 1, 0.08);
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <group ref={animRoot} scale={scale}>
        <primitive object={scene} position={offset} />
      </group>
    </group>
  );
}

function SceneContent({
  playing,
  onToggle,
  controlsRef,
  burstKey,
}: {
  playing: boolean;
  onToggle: () => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  burstKey: number;
}) {
  const [interacting, setInteracting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const { camera } = useThree();
  const cam = useRef(camera);
  cam.current = camera;

  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 4, 4]} intensity={28} color="#22D3EE" />
      <pointLight position={[-4, -2, -3]} intensity={20} color="#1E6FD9" />
      <pointLight position={[0, 3, -4]} intensity={15} color="#FFFFFF" />

      <Model playing={playing} onToggle={onToggle} burstKey={burstKey} />

      <OrbitControls
        ref={controlsRef as React.Ref<OrbitControlsImpl>}
        makeDefault
        enablePan={false}
        enableZoom
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.8}
        zoomSpeed={0.7}
        minDistance={MIN_DIST}
        maxDistance={MAX_DIST}
        autoRotate={!interacting}
        autoRotateSpeed={0.6}
        onStart={() => {
          if (timeout.current) clearTimeout(timeout.current);
          setInteracting(true);
        }}
        onEnd={() => {
          timeout.current = setTimeout(() => setInteracting(false), 2500);
        }}
      />
    </>
  );
}

useGLTF.preload(MODEL_URL);

// Light glass buttons to match the light page theme
const btn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  border: "1px solid rgba(11,27,58,0.12)",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(10px)",
  color: "#0B1B3A",
  fontSize: 16,
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  transition: "background .2s, transform .2s",
};

export default function ShowcaseScene() {
  const [playing, setPlaying] = useState(true);
  const [burstKey, setBurstKey] = useState(0);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const zoom = useCallback((factor: number) => {
    const c = controlsRef.current;
    if (!c) return;
    const offset = c.object.position.clone().sub(c.target);
    const dist = THREE.MathUtils.clamp(offset.length() * factor, MIN_DIST, MAX_DIST);
    offset.setLength(dist);
    c.object.position.copy(c.target).add(offset);
    c.update();
  }, []);

  const resetView = useCallback(() => controlsRef.current?.reset(), []);
  const toggle = useCallback(() => setPlaying((p) => !p), []);
  const scatter = useCallback(() => setBurstKey((k) => k + 1), []);

  return (
    <div
      className="showcase-scene-v2"
      aria-label="Interactive animated three dimensional technology visualization"
      style={{ position: "relative" }}
      onDoubleClick={resetView}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            playing={playing}
            onToggle={toggle}
            controlsRef={controlsRef}
            burstKey={burstKey}
          />
        </Suspense>
      </Canvas>

      {/* Control bar */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}
      >
        <button style={btn} onClick={toggle} aria-label={playing ? "Pause animation" : "Play animation"}>
          {playing ? "❚❚" : "▶"}
        </button>
        <button style={btn} onClick={scatter} aria-label="Scatter and reassemble" title="Scatter and reassemble">✦</button>
        <button style={btn} onClick={() => zoom(0.75)} aria-label="Zoom in">＋</button>
        <button style={btn} onClick={() => zoom(1.33)} aria-label="Zoom out">－</button>
        <button style={btn} onClick={resetView} aria-label="Reset view">⟲</button>
      </div>
    </div>
  );
}