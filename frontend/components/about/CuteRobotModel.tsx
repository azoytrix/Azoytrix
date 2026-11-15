"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/* Put the file at: public/models/bumble.glb
   (the file is meshopt + WebP compressed; drei's useGLTF handles both) */
const MODEL_PATH = "/models/bumble.glb";

/* In the file the robot is ~3.3 units tall (feet at y = 0, facing +z). */
const NATIVE_HEIGHT = 3.32;
const ROBOT_HEIGHT = 2.5; // size on screen (camera sees ~4 units of height)
const SCALE = ROBOT_HEIGHT / NATIVE_HEIGHT;
const FEET_Y = -1.6;

/* Clips inside the GLB */
const CLIP = {
  idle: "idle01",
  vehicleIdle: "vehicle_idle01",
  transform: "transform_v", // robot -> vehicle (played backwards for vehicle -> robot)
} as const;

/* Gestures played one after another, in a loop, while idle in robot mode.
   (There is no dedicated "hello" clip in the file; emo_joyful is the
   friendliest one, so it goes first.) */
const GESTURES = [
  "emo_joyful",
  "emo_surprise",
  "emo_stagger",
  "emo_rage",
  "emo_sad",
] as const;

/* What Bumble "thinks" during each gesture (cycles through the list) */
const MESSAGES: Record<(typeof GESTURES)[number], string[]> = {
  emo_joyful: [
    "Hello, friend! Ready to transform?",
    "Change is good. Let's transform!",
    "Transforming is just a new way to say hello!",
  ],
  emo_surprise: [
    "Whoa! A new form is coming!",
    "Did you feel that? Transformation incoming!",
    "Surprise! I'm a car too!",
  ],
  emo_stagger: [
    "Easy now... transformation takes balance.",
    "Need a moment. Transforming is hard work!",
    "Still aligning my gears...",
  ],
  emo_rage: [
    "Transformation is necessary!",
    "No more standing still. Time to transform!",
    "Adapt or fall behind. Transform!",
  ],
  emo_sad: [
    "Staying the same is the saddest thing...",
    "I miss rolling out. Let's transform.",
    "Why stay stuck? Transformation is hope.",
  ],
};

const FIRST_GESTURE_DELAY = 1; // seconds before the first gesture
const GESTURE_GAP: [number, number] = [0.6, 1.6]; // short idle pause between gestures
const VEHICLE_YAW = 0.7; // 3/4 view of the car (radians)
const FADE = 0.25;

/* Driving show after the transformation (seconds per stage) */
const DRIVE = { rev: 0.5, out: 1.5, turn: 0.9, back: 1.5, park: 0.6 };
const DRIVE_TOTAL = DRIVE.rev + DRIVE.out + DRIVE.turn + DRIVE.back + DRIVE.park;
const CAR_HALF_LENGTH = 1.25; // rough half length of the car on screen (world units)
const WHEEL_RADIUS = 0.3; // rough wheel radius on screen (world units)

/* Wheel bones in the GLB (spun while driving) */
const WHEEL_BONES = [
  "Bone_wheelleft_F_076",
  "Bone_wheelright_F_078",
  "Bone_wheelleft_B_011",
  "Bone_wheelright_B_021",
];

type Phase = "robot" | "toVehicle" | "vehicle" | "toRobot";

useGLTF.preload(MODEL_PATH);

type Pointer = { x: number; y: number; active: boolean }; // -1..1 in canvas space

const easeInOut = (t: number) => t * t * (3 - 2 * t);

/* position + heading of the car at time t of the driving show */
function driveState(t: number, edge: number) {
  const { rev, out, turn, back, park } = DRIVE;
  const HALF_PI = Math.PI / 2;

  if (t < rev) {
    // rev up: turn from the 3/4 view into side profile (facing right)
    return { x: 0, yaw: VEHICLE_YAW + (HALF_PI - VEHICLE_YAW) * easeInOut(t / rev), speed: 0 };
  }
  t -= rev;
  if (t < out) {
    const u = t / out;
    const x = edge * easeInOut(u);
    const speed = (edge * 6 * u * (1 - u)) / out;
    return { x, yaw: HALF_PI, speed };
  }
  t -= out;
  if (t < turn) {
    // U-turn at the edge
    const u = t / turn;
    return {
      x: edge + 0.25 * Math.sin(u * Math.PI),
      yaw: HALF_PI - Math.PI * easeInOut(u),
      speed: 1.2,
    };
  }
  t -= turn;
  if (t < back) {
    const u = t / back;
    const x = edge * (1 - easeInOut(u));
    const speed = (edge * 6 * u * (1 - u)) / back;
    return { x, yaw: -HALF_PI, speed };
  }
  t -= back;
  const u = Math.min(1, t / park);
  return {
    x: 0,
    yaw: -HALF_PI + (VEHICLE_YAW + HALF_PI) * easeInOut(u),
    speed: 0,
  };
}

function Bumble({
  pointer,
  hovered,
  tap,
  onPhase,
  onSay,
}: {
  pointer: React.MutableRefObject<Pointer>;
  hovered: React.MutableRefObject<boolean>;
  tap: React.MutableRefObject<boolean>;
  onPhase: (p: Phase) => void;
  onSay: (text: string | null) => void;
}) {
  const root = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions, mixer } = useAnimations(animations, body);

  const sim = useRef({
    phase: "robot" as Phase,
    yaw: 0,
    x: 0,
    gesture: null as THREE.AnimationAction | null,
    index: 0, // next gesture in the loop
    msg: {} as Record<string, number>, // next message per gesture
    timer: FIRST_GESTURE_DELAY,
    armed: true, // hover can start a transformation (re-armed after the mouse leaves)
    driveT: 0,
    spin: 0,
  });

  const wheels = useRef<THREE.Object3D[]>([]);
  const tmp = useRef({
    q: new THREE.Quaternion(),
    q2: new THREE.Quaternion(),
    axis: new THREE.Vector3(),
  });

  const setPhase = useCallback(
    (p: Phase) => {
      sim.current.phase = p;
      onPhase(p);
    },
    [onPhase]
  );

  /* ---------- animation helpers ---------- */

  const backToIdle = useCallback(() => {
    const idle = actions[CLIP.idle];
    if (!idle) return;
    idle.reset().setEffectiveWeight(1).fadeIn(FADE).play();
  }, [actions]);

  const playGesture = useCallback(() => {
    const s = sim.current;
    const idle = actions[CLIP.idle];

    // next available gesture in the list, wrapping around forever
    let g: THREE.AnimationAction | null = null;
    let gestureName: (typeof GESTURES)[number] | null = null;
    for (let i = 0; i < GESTURES.length && !g; i++) {
      const name = GESTURES[(s.index + i) % GESTURES.length];
      g = actions[name] ?? null;
      if (g) {
        gestureName = name;
        s.index = (s.index + i + 1) % GESTURES.length;
      }
    }
    if (!g || !gestureName) return;

    // thought cloud for this gesture
    const list = MESSAGES[gestureName];
    const n = s.msg[gestureName] ?? 0;
    s.msg[gestureName] = (n + 1) % list.length;
    onSay(list[n % list.length]);

    g.reset();
    g.setLoop(THREE.LoopOnce, 1);
    g.clampWhenFinished = true;
    g.fadeIn(FADE).play();
    idle?.fadeOut(FADE);

    s.gesture = g;
  }, [actions, onSay]);

  const startTransform = useCallback(() => {
    const s = sim.current;
    const t = actions[CLIP.transform];
    if (!t) return;

    // leave whatever robot animation is running
    actions[CLIP.idle]?.fadeOut(0.15);
    s.gesture?.fadeOut(0.15);
    s.gesture = null;
    onSay("Autobots, transform and roll out!");

    t.reset();
    t.setLoop(THREE.LoopOnce, 1);
    t.clampWhenFinished = true;
    t.timeScale = 1;
    t.fadeIn(0.15).play();

    setPhase("toVehicle");
  }, [actions, setPhase, onSay]);

  const startRevert = useCallback(() => {
    const t = actions[CLIP.transform];
    if (!t) return;
    onSay("Back to robot mode!");

    // stop the vehicle idle layer
    actions[CLIP.vehicleIdle]?.fadeOut(0.1);

    // play the transform clip backwards, starting from its last frame
    t.reset();
    t.setEffectiveWeight(1);
    t.setLoop(THREE.LoopOnce, 1);
    t.clampWhenFinished = true;
    t.time = t.getClip().duration;
    t.timeScale = -1;
    t.play();

    setPhase("toRobot");
  }, [actions, setPhase, onSay]);

  /* ---------- setup + clip-finished handling ---------- */

  useEffect(() => {
    scene.traverse((o) => {
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) o.frustumCulled = false;

      // a bit more reflection on the paint for the car look
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const std = m as THREE.MeshStandardMaterial;
          if ("envMapIntensity" in std) std.envMapIntensity = 1.3;
        });
      }
    });

    wheels.current = WHEEL_BONES.map((n) => scene.getObjectByName(n)).filter(
      Boolean
    ) as THREE.Object3D[];

    const idle = actions[CLIP.idle];
    idle?.reset().setEffectiveWeight(1).play();

    const vIdle = actions[CLIP.vehicleIdle];
    if (vIdle) vIdle.setLoop(THREE.LoopRepeat, Infinity);

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      const s = sim.current;
      if (e.action !== actions[CLIP.transform]) return;

      if (s.phase === "toVehicle") {
        // keep the transform clip clamped on its last frame (= car pose)
        // and layer the vehicle idle on top
        actions[CLIP.vehicleIdle]?.reset().setEffectiveWeight(1).fadeIn(0.15).play();
        s.driveT = 0;
        s.spin = 0;
        onSay("Vroom vroom!");
        setPhase("vehicle");
      } else if (s.phase === "toRobot") {
        backToIdle();
        actions[CLIP.transform]?.fadeOut(FADE);
        onSay(null);
        s.timer = FIRST_GESTURE_DELAY;
        setPhase("robot");
      }
    };

    mixer.addEventListener("finished", onFinished as never);
    return () => mixer.removeEventListener("finished", onFinished as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, mixer, scene]);

  /* ---------- per-frame state machine ---------- */

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = sim.current;
    const p = pointer.current;

    // responsive fit: shrink a little on very narrow screens
    const vw = state.viewport.width;
    const fit = THREE.MathUtils.clamp(vw / 4.4, 0.62, 1);
    root.current.scale.setScalar(fit);
    const edge = Math.max(0.3, Math.min(2.4, vw / 2 - CAR_HALF_LENGTH * fit));

    /* --- trigger: hover (mouse) or tap (touch) --- */
    if (s.phase === "robot") {
      if (!hovered.current) s.armed = true;
      if ((hovered.current && s.armed) || tap.current) {
        tap.current = false;
        s.armed = false; // won't retrigger until the mouse leaves again
        startTransform();
      }
    } else {
      tap.current = false;
    }

    /* --- idle gestures, one after another, forever (robot mode only) --- */
    if (s.phase === "robot") {
      if (s.gesture) {
        const dur = s.gesture.getClip().duration;
        if (s.gesture.time >= dur - FADE) {
          // blend back to idle just before the gesture ends
          backToIdle();
          s.gesture.fadeOut(FADE);
          s.gesture = null;
          onSay(null);
          s.timer = GESTURE_GAP[0] + Math.random() * (GESTURE_GAP[1] - GESTURE_GAP[0]);
        }
      } else {
        s.timer -= dt;
        if (s.timer <= 0) playGesture();
      }
    }

    /* --- position + heading --- */
    let targetYaw = 0;
    let targetX = 0;
    let speed = 0;
    let snap = false;

    if (s.phase === "toVehicle") {
      targetYaw = VEHICLE_YAW;
    } else if (s.phase === "vehicle") {
      s.driveT += dt;
      const d = driveState(Math.min(s.driveT, DRIVE_TOTAL), edge);
      targetX = d.x;
      targetYaw = d.yaw;
      speed = d.speed;
      snap = true; // follow the scripted path exactly
      if (s.driveT >= DRIVE_TOTAL) startRevert();
    } else if (s.phase === "robot" && p.active && !s.gesture) {
      targetYaw = THREE.MathUtils.clamp(p.x * 0.35, -0.4, 0.4);
    }

    if (snap) {
      s.yaw = targetYaw;
      s.x = targetX;
    } else {
      s.yaw += (targetYaw - s.yaw) * (1 - Math.exp(-6 * dt));
      s.x += (targetX - s.x) * (1 - Math.exp(-6 * dt));
    }
    body.current.rotation.y = s.yaw;
    root.current.position.set(s.x, FEET_Y, 0);

    /* --- wheel spin (applied after the mixer has posed the bones) --- */
    s.spin += (speed / (WHEEL_RADIUS * fit)) * dt;
    if (s.phase === "vehicle") {
      const { q, q2, axis } = tmp.current;
      for (const w of wheels.current) {
        w.getWorldQuaternion(q);
        // car's lateral axis in world space, expressed in the bone's own frame
        axis.set(Math.cos(s.yaw), 0, -Math.sin(s.yaw)).applyQuaternion(q.invert());
        w.quaternion.multiply(q2.setFromAxisAngle(axis.normalize(), s.spin));
      }
    }
  });

  return (
    <group ref={root} position={[0, FEET_Y, 0]}>
      <group ref={body}>
        <primitive object={scene} scale={SCALE} />
      </group>
    </group>
  );
}

/* ---------- thought cloud ---------- */

const CLOUD_CSS = `
.bumble-cloud{position:absolute;left:calc(50% + 30px);top:10px;max-width:min(250px,60%);pointer-events:none;z-index:10;transform-origin:0% 100%}
.bumble-cloud-in{animation:bumble-pop .5s cubic-bezier(.34,1.56,.64,1) both}
.bumble-cloud-out{animation:bumble-out .25s ease-in both}
.bumble-cloud-body{position:relative;padding:11px 18px;border-radius:26px;background:rgba(255,255,255,.96);color:#1e293b;font-size:13px;line-height:1.35;font-weight:600;box-shadow:0 8px 28px rgba(0,0,0,.2);animation:bumble-float 3s ease-in-out infinite alternate}
.bumble-cloud-ghost{visibility:hidden}
.bumble-cloud-typed{position:absolute;left:18px;right:18px;top:11px}
.bumble-caret{display:inline-block;width:2px;height:1em;margin-left:2px;vertical-align:-2px;background:#f5b400;animation:bumble-blink .7s steps(1) infinite}
.bumble-dot{position:absolute;border-radius:50%;background:rgba(255,255,255,.96);box-shadow:0 3px 10px rgba(0,0,0,.18)}
.bumble-dot-1{width:13px;height:13px;left:-4px;bottom:-17px}
.bumble-dot-2{width:7px;height:7px;left:-17px;bottom:-30px}
@keyframes bumble-pop{0%{opacity:0;transform:scale(.3) translateY(14px)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes bumble-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8) translateY(6px)}}
@keyframes bumble-float{0%{transform:translateY(0)}100%{transform:translateY(-4px)}}
@keyframes bumble-blink{50%{opacity:0}}

/* phones / narrow containers: cloud centered at the top, smaller text */
@media (max-width:640px){
  .bumble-cloud{left:12px;right:12px;top:8px;width:max-content;max-width:calc(100% - 24px);margin:0 auto;transform-origin:50% 100%}
  .bumble-cloud-body{padding:8px 14px;border-radius:20px;font-size:12px}
  .bumble-cloud-typed{left:14px;right:14px;top:8px}
  .bumble-dot-1{left:calc(50% - 6px);bottom:-15px}
  .bumble-dot-2{left:calc(50% - 16px);bottom:-27px}
}
`;

function ThoughtCloud({ text, visible }: { text: string; visible: boolean }) {
  const [typed, setTyped] = useState("");

  // typewriter effect each time a new message appears
  useEffect(() => {
    setTyped("");
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [text]);

  return (
    <div
      key={text}
      className={`bumble-cloud ${visible ? "bumble-cloud-in" : "bumble-cloud-out"}`}
      aria-live="polite"
    >
      <div className="bumble-cloud-body">
        {/* invisible full text reserves the final size so the cloud doesn't grow while typing */}
        <span className="bumble-cloud-ghost">{text}</span>
        <span className="bumble-cloud-typed">
          {typed}
          {visible && typed.length < text.length && <span className="bumble-caret" />}
        </span>
      </div>
      <span className="bumble-dot bumble-dot-1" />
      <span className="bumble-dot bumble-dot-2" />
    </div>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

export function BumbleModel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0, active: false });
  const hovered = useRef(false); // mouse is over the model area
  const tap = useRef(false); // a tap happened (touch screens)
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("robot");
  const [isTouch, setIsTouch] = useState(false);
  const [cloud, setCloud] = useState<{ text: string; visible: boolean } | null>(null);

  const handleReady = useCallback(() => setReady(true), []);
  const handlePhase = useCallback((p: Phase) => setPhase(p), []);
  const handleSay = useCallback((text: string | null) => {
    if (text) setCloud({ text, visible: true });
    else setCloud((c) => (c ? { ...c, visible: false } : c));
  }, []);

  // detect devices without hover (phones / tablets)
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Cursor tracking (used for the robot's idle glance)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el || e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.current.active = true;
    };
    const off = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", off);
    document.documentElement.addEventListener("mouseleave", off);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", off);
      document.documentElement.removeEventListener("mouseleave", off);
    };
  }, []);

  const caption =
    phase === "vehicle"
      ? "VEHICLE MODE · DRIVING"
      : phase === "toVehicle"
      ? "TRANSFORMING…"
      : phase === "toRobot"
      ? "BACK TO ROBOT MODE"
      : isTouch
      ? "TAP TO TRANSFORM"
      : "HOVER TO TRANSFORM";

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[320px] w-full min-w-0 max-w-full cursor-pointer select-none overflow-hidden sm:h-[420px] lg:h-[480px]"
      style={{ contain: "layout paint" }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") hovered.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") hovered.current = false;
      }}
      // touch screens have no hover: a tap starts the transformation
      onPointerDown={(e) => {
        if (e.pointerType === "touch") tap.current = true;
      }}
    >
      <style>{CLOUD_CSS}</style>

      {cloud && <ThoughtCloud text={cloud.text} visible={cloud.visible} />}

      {!ready && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center opacity-70">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
            <p className="font-mono text-[10px] tracking-[0.2em] text-brand">Loading model…</p>
          </div>
        </div>
      )}

      {/* absolute: the canvas must not add to the layout width (it was stretching the page on phones) */}
      <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        // pan-y keeps page scrolling working when swiping over the model on phones
        style={{ background: "transparent", touchAction: "pan-y" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <hemisphereLight args={["#ffffff", "#8aa0c8", 1.1]} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#9db8ff" />

        {/* Offline studio reflections (no HDR download) */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 3]} scale={[10, 4, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.6} position={[-5, 1, 2]} scale={[3, 6, 1]} color="#dfeaff" />
          <Lightformer form="rect" intensity={1.6} position={[5, 1, 2]} scale={[3, 6, 1]} color="#fff2dc" />
        </Environment>

        <Suspense fallback={null}>
          <Bumble
            pointer={pointer}
            hovered={hovered}
            tap={tap}
            onPhase={handlePhase}
            onSay={handleSay}
          />
          <ContactShadows
            position={[0, FEET_Y + 0.01, 0]}
            opacity={0.35}
            scale={12}
            blur={2.5}
            far={2}
          />
          <Ready onReady={handleReady} />
        </Suspense>
      </Canvas>
      </div>

      {ready && (
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.18em] text-brand/70">
          {caption}
        </div>
      )}
    </div>
  );
}

/* keeps the old import name working */
export { BumbleModel as CuteRobotModel };