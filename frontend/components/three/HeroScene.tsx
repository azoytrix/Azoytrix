"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import * as THREE from "three";
import { answer, STARTERS, type Ctx, type Reply } from "@/lib/bot/engine";

const MESSAGES = [
  "Hello! I'm the Azoytrix AI, here to show you what we build.",
  "We engineer software, AI and cloud platforms that move businesses forward.",
  "From first idea to scaled product, one team covers the full lifecycle.",
  "Looking for automation, analytics or a custom platform? Let's talk.",
  "Innovation, intelligence and engineering are built into everything we ship.",
  "Scroll down to explore our services, solutions and process.",
  "Have a challenge in mind? Start a project and we'll take it from there.",
];

class LineBuilder {
  p: number[] = [];
  ph: number[] = [];
  al: number[] = [];
  bs: number[] = [];
  seg(a: THREE.Vector3, b: THREE.Vector3, ph: number, t0: number, t1: number, base: number) {
    this.p.push(a.x, a.y, a.z, b.x, b.y, b.z);
    this.ph.push(ph, ph);
    this.al.push(t0, t1);
    this.bs.push(base, base);
  }
  build(mat: THREE.ShaderMaterial) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute("aPh", new THREE.Float32BufferAttribute(this.ph, 1));
    g.setAttribute("aAlong", new THREE.Float32BufferAttribute(this.al, 1));
    g.setAttribute("aBase", new THREE.Float32BufferAttribute(this.bs, 1));
    const m = new THREE.LineSegments(g, mat);
    m.frustumCulled = false;
    return m;
  }
}

export default function HeroScene() {
    const hostRef = useRef<HTMLDivElement>(null);
  const voice = useRef({ target: 0, flash: 0 });
  const timer = useRef(0);
  const run = useRef(0); // id of the message currently allowed to type
  const ctx = useRef<Ctx>({});
  const idle = useRef(true);

  const [typed, setTyped] = useState("");
  const [rest, setRest] = useState("");
  const [visible, setVisible] = useState(false);
  const [asked, setAsked] = useState("");
  const [links, setLinks] = useState<NonNullable<Reply["links"]>>([]);
  const [chips, setChips] = useState<string[]>(STARTERS);
  const [input, setInput] = useState("");

  /* Types a message into the card and drives the orb. A newer call
     always cancels an older one, so replies can never overlap. */
  const speak = useCallback((msg: string, onDone?: () => void) => {
    const id = ++run.current;
    window.clearTimeout(timer.current);
    setVisible(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(msg);
      setRest("");
      if (onDone) {
        timer.current = window.setTimeout(() => run.current === id && onDone(), 4500);
      }
      return;
    }

    voice.current.flash = 1;
    setTyped("");
    setRest(msg);
    const fast = msg.length > 140;
    let i = 0;

    const tick = () => {
      if (run.current !== id) return; // a newer message took over
      if (i >= msg.length) {
        voice.current.target = 0;
        voice.current.flash = Math.max(voice.current.flash, 0.45);
        if (onDone) {
          timer.current = window.setTimeout(() => run.current === id && onDone(), 2800);
        }
        return;
      }
      const ch = msg.charAt(i++);
      setTyped(msg.slice(0, i));
      setRest(msg.slice(i));
      const pause = /[.,!?]/.test(ch);
      voice.current.target = pause ? 0.05 : /\s/.test(ch) ? 0.15 : 0.45 + Math.random() * 0.45;
      timer.current = window.setTimeout(
        tick,
        (fast ? 12 : 26) + Math.random() * (fast ? 10 : 26) + (pause ? (fast ? 90 : 240) : 0)
      );
    };
    tick();
  }, []);

  /* Idle greetings: cycle default messages until the visitor asks something, then stop for good. */
  useEffect(() => {
    let idx = 0;

    const next = () => {
      if (!idle.current) return; // stopped once a real question is asked
      const msg = MESSAGES[idx];
      idx = (idx + 1) % MESSAGES.length;
      speak(msg, () => {
        // only chain to the next idle greeting while still idle
        if (idle.current) {
          timer.current = window.setTimeout(next, 1800);
        }
      });
    };

    timer.current = window.setTimeout(next, 1800);
    return () => {
      run.current++; // invalidate any pending speak tick
      window.clearTimeout(timer.current);
    };
  }, [speak]);

  const send = (text: string) => {
    const q = text.trim().slice(0, 200);
    if (!q) return;

    idle.current = false;
    run.current++; // cancels any idle message or earlier reply instantly
    window.clearTimeout(timer.current);
    voice.current.target = 0;

    const res = answer(q, ctx.current);
    ctx.current = res.ctx;

    setAsked(q);
    setInput("");
    setLinks(res.reply.links ?? []);
    setChips(res.reply.followUps?.length ? res.reply.followUps : STARTERS);

    speak(res.reply.text); // no onDone: the answer stays until the next question
  };

  /* ---------- Three.js orb (normal blending, built for a white page) ---------- */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const density = small ? 0.5 : 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const PR = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    renderer.setPixelRatio(PR);
    renderer.setClearColor(0x000000, 0);
    const cv = renderer.domElement;
    Object.assign(cv.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      pointerEvents: "none",
    });
    host.prepend(cv);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.z = 7.2;

    const root = new THREE.Group();
    scene.add(root);
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    /* ----- constants and utilities ----- */
    const PI = Math.PI;
    const TAU = PI * 2;
    const SHELL = 1.62;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    // Palette tuned for a WHITE background: every tone is mid/dark enough to read.
    const NAVY = new THREE.Color(0x0b2a5b);
    const BLUE = new THREE.Color(0x1e6fd9);
    const SKY = new THREE.Color(0x0ea5e9);
    const CYAN = new THREE.Color(0x06b6d4);

    const pickTone = () => {
      const r = Math.random();
      const base = r < 0.28 ? NAVY : r < 0.62 ? BLUE : r < 0.88 ? SKY : CYAN;
      return base.clone().lerp(NAVY, Math.random() * 0.2);
    };

    const randomUnit = () => {
      const u = Math.random() * 2 - 1;
      const t = rand(0, TAU);
      const s = Math.sqrt(1 - u * u);
      return new THREE.Vector3(s * Math.cos(t), u, s * Math.sin(t));
    };

    const sph = (th: number, ph: number, r: number) =>
      new THREE.Vector3(
        r * Math.cos(ph) * Math.cos(th),
        r * Math.sin(ph),
        r * Math.cos(ph) * Math.sin(th)
      );

    const inkMat = (color: number, opacity: number) =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

    const U = {
      uTime: { value: 0 },
      uPR: { value: PR },
      uK: { value: 1 },
      uBoot: { value: 0 },
      uLevel: { value: 0 },
      uR: { value: SHELL },
    };

    const spinners: { o: THREE.Object3D; x: number; y: number; z: number }[] = [];
    const spin = (o: THREE.Object3D, x: number, y: number, z: number) => {
      spinners.push({ o, x, y, z });
    };

    /* ----- line shader: blinking traces (mode 0) + pulsing spokes (mode 1) ----- */
    const lineMat = (color: number, mode: number, gain: number) =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: U.uTime,
          uBoot: U.uBoot,
          uLevel: U.uLevel,
          uR: U.uR,
          uColor: { value: new THREE.Color(color) },
          uMode: { value: mode },
          uGain: { value: gain },
        },
        transparent: true,
        depthWrite: false,
        vertexShader: [
          "attribute float aPh; attribute float aAlong; attribute float aBase;",
          "uniform float uTime; uniform float uBoot; uniform float uLevel; uniform float uR; uniform float uMode;",
          "varying float vA;",
          "void main(){",
          "  float boot = smoothstep(0.0, 1.0, uBoot);",
          "  vec3 p = position * mix(0.25, 1.0, boot);",
          "  float dp = (fract(uTime * 0.28 + aPh * 7.31) - aAlong) * 9.0;",
          "  float pulse = exp(-dp * dp);",
          "  float a;",
          "  if (uMode < 0.5) {",
          "    float cyc = fract(uTime * 0.09 + aPh);",
          "    float life = smoothstep(0.0, 0.07, cyc) * (1.0 - smoothstep(0.5, 0.85, cyc));",
          "    a = aBase * (0.18 + 0.82 * life) + pulse * 0.7 * life;",
          "  } else {",
          "    a = aBase * (0.6 + 0.4 * sin(uTime * 1.7 + aPh * 30.0)) + pulse * 1.1;",
          "  }",
          "  float ds = (position.y / uR - sin(uTime * 0.55) * 1.05) * 6.5;",
          "  float scan = exp(-ds * ds);",
          "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
          "  float depth = clamp((-mv.z - 5.6) / 3.4, 0.0, 1.0);",
          "  vA = (a + scan * 0.6 * aBase) * boot * (1.0 + uLevel * 0.8) * (1.0 - 0.7 * depth);",
          "  gl_Position = projectionMatrix * mv;",
          "}",
        ].join("\n"),
        fragmentShader: [
          "uniform vec3 uColor; uniform float uGain; varying float vA;",
          "void main(){",
          "  float a = clamp(vA, 0.0, 1.0) * uGain;",
          "  gl_FragColor = vec4(uColor, a);",
          "  #include <colorspace_fragment>",
          "}",
        ].join("\n"),
      });

    /* ===== 1. SHELL: circuit traces, great circles, dust ===== */
    const shell = new THREE.Group();
    root.add(shell);
    spin(shell, 0.02, 0.05, 0);

    const P = {
      pos: [] as number[],
      sz: [] as number[],
      col: [] as number[],
      ph: [] as number[],
      soft: [] as number[],
    };
    const addPt = (v: THREE.Vector3, size: number, col: THREE.Color, soft = 0) => {
      P.pos.push(v.x, v.y, v.z);
      P.sz.push(size);
      P.col.push(col.r, col.g, col.b);
      P.ph.push(Math.random());
      P.soft.push(soft);
    };

    // circuit-trace fragments
    {
      const lb = new LineBuilder();
      const N = Math.round(1200 * density);
      const centers = Array.from({ length: 45 }, () => ({
        th: rand(0, TAU),
        ph: clamp(Math.asin(rand(-1, 1)), -1.2, 1.2),
      }));

      for (let i = 0; i < N; i++) {
        let th: number;
        let phi: number;
        if (Math.random() < 0.65) {
          const ce = centers[(Math.random() * centers.length) | 0];
          th = ce.th + (Math.random() + Math.random() + Math.random() - 1.5) * 0.45;
          phi = clamp(ce.ph + (Math.random() + Math.random() + Math.random() - 1.5) * 0.3, -1.3, 1.3);
        } else {
          th = rand(0, TAU);
          phi = clamp(Math.asin(rand(-1, 1)), -1.25, 1.25);
        }

        const r = SHELL * rand(0.985, 1.035);
        let horiz = Math.random() < 0.65;
        let sgn = Math.random() < 0.5 ? -1 : 1;
        const n = 2 + ((Math.random() * 5) | 0);
        const ph = Math.random();
        const base = rand(0.35, 0.8);
        let prev = sph(th, phi, r);

        for (let s = 0; s < n; s++) {
          const step = rand(0.006, 0.03) * (Math.random() < 0.1 ? 2.5 : 1.0);
          if (horiz) th += (sgn * step) / Math.max(0.35, Math.cos(phi));
          else phi = clamp(phi + sgn * step, -1.3, 1.3);

          const next = sph(th, phi, r);
          lb.seg(prev, next, ph, s / n, (s + 1) / n, base);
          prev = next;

          if (Math.random() < 0.6) {
            horiz = !horiz;
            sgn = Math.random() < 0.5 ? -1 : 1;
          }
          if (Math.random() < 0.15) {
            const pin = sph(
              th + (horiz ? 0 : rand(-0.015, 0.015)),
              phi + (horiz ? rand(-0.015, 0.015) : 0),
              r
            );
            lb.seg(prev, pin, ph, s / n, (s + 1) / n, base * 0.8);
          }
        }

        // glowing node at the end of some traces
        if (Math.random() < 0.3) {
          addPt(prev, rand(2.2, 3.6), Math.random() < 0.5 ? CYAN : BLUE);
        }
      }
      shell.add(lb.build(lineMat(0x1e6fd9, 0, 0.85)));
    }

    // fragmented great-circle hairlines
    {
      const lb = new LineBuilder();
      for (let c = 0; c < 7; c++) {
        const ax = randomUnit();
        const h = Math.abs(ax.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
        const u = new THREE.Vector3().crossVectors(ax, h).normalize();
        const v = new THREE.Vector3().crossVectors(ax, u);
        const rr = SHELL * rand(0.97, 1.03);
        const a = rand(0, TAU);
        const end = a + TAU;
        let on = Math.random() < 0.7;
        let run = rand(0.2, 0.8);
        const ph = Math.random();
        const base = rand(0.3, 0.55);
        const steps = 240;
        let prev: THREE.Vector3 | null = null;

        for (let j = 0; j <= steps; j++) {
          const ang = a + ((end - a) * j) / steps;
          if (on) {
            const p = new THREE.Vector3()
              .addScaledVector(u, Math.cos(ang) * rr)
              .addScaledVector(v, Math.sin(ang) * rr);
            if (prev) lb.seg(prev, p, ph, j / steps, (j + 1) / steps, base);
            prev = p;
          }
          if (Math.random() > run) {
            on = !on;
            prev = null;
            run = rand(0.2, 0.8);
          }
        }
      }
      shell.add(lb.build(lineMat(0x0b2a5b, 1, 0.6)));
    }

    // dust, interior particles and soft bokeh
    {
      for (let i = 0; i < 3000 * density; i++) {
        addPt(randomUnit().multiplyScalar(SHELL * rand(0.97, 1.04)), rand(0.9, 2.3), pickTone());
      }
      for (let i = 0; i < 600 * density; i++) {
        addPt(
          randomUnit().multiplyScalar(SHELL * Math.pow(Math.random(), 0.5) * 0.95),
          rand(0.9, 2.2),
          pickTone()
        );
      }
      for (let i = 0; i < 50; i++) {
        addPt(randomUnit().multiplyScalar(rand(0.3, 1.9)), rand(10, 34), pickTone(), 1);
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(P.pos, 3));
      g.setAttribute("aSize", new THREE.Float32BufferAttribute(P.sz, 1));
      g.setAttribute("aColor", new THREE.Float32BufferAttribute(P.col, 3));
      g.setAttribute("aPhase", new THREE.Float32BufferAttribute(P.ph, 1));
      g.setAttribute("aSoft", new THREE.Float32BufferAttribute(P.soft, 1));

      const m = new THREE.ShaderMaterial({
        uniforms: {
          uTime: U.uTime,
          uPR: U.uPR,
          uK: U.uK,
          uBoot: U.uBoot,
          uLevel: U.uLevel,
          uR: U.uR,
        },
        transparent: true,
        depthWrite: false,
        vertexShader: [
          "attribute float aSize; attribute vec3 aColor; attribute float aPhase; attribute float aSoft;",
          "uniform float uTime; uniform float uPR; uniform float uK; uniform float uBoot; uniform float uLevel; uniform float uR;",
          "varying vec3 vColor; varying float vA; varying float vSoft;",
          "void main(){",
          "  float boot = smoothstep(0.0, 1.0, uBoot);",
          "  vec3 p = position * mix(0.15, 1.0, boot);",
          "  float tw = 0.5 + 0.5 * sin(uTime * (1.0 + aPhase * 4.0) + aPhase * 50.0);",
          "  float ds = (position.y / uR - sin(uTime * 0.55) * 1.05) * 6.0;",
          "  float scan = exp(-ds * ds);",
          "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
          "  float k = aSize * uK * uPR * (6.4 / -mv.z);",
          "  gl_PointSize = k * (aSoft > 0.5 ? (0.85 + 0.15 * tw) : (0.6 + 0.7 * tw + scan * 0.8)) * (1.0 + uLevel * 0.25);",
          "  gl_Position = projectionMatrix * mv;",
          "  vColor = aColor;",
          "  vSoft = aSoft;",
          "  vA = boot * (aSoft > 0.5 ? (0.07 + 0.06 * tw) : (0.35 + 0.45 * tw + scan * 0.5));",
          "}",
        ].join("\n"),
        fragmentShader: [
          "varying vec3 vColor; varying float vA; varying float vSoft;",
          "void main(){",
          "  float d = length(gl_PointCoord - 0.5) * 2.0;",
          "  if (d > 1.0) discard;",
          "  float core = smoothstep(1.0, 0.35, d);",
          "  float disc = smoothstep(1.0, 0.82, d) * (0.45 + 0.55 * smoothstep(0.45, 0.95, d));",
          "  float a = mix(core, disc, vSoft) * clamp(vA, 0.0, 1.0);",
          "  gl_FragColor = vec4(vColor, a);",
          "  #include <colorspace_fragment>",
          "}",
        ].join("\n"),
      });

      const pts = new THREE.Points(g, m);
      pts.frustumCulled = false;
      shell.add(pts);
    }

    /* ===== 2. HAIRLINE SPOKES ===== */
    const spokes = new THREE.Group();
    root.add(spokes);
    {
      const lb = new LineBuilder();
      const K = 20;
      const SEG = 36;

      for (let k = 0; k < K; k++) {
        const dir = randomUnit();
        if (Math.random() < 0.7) dir.z *= 0.4;
        dir.normalize();

        const thru = Math.random() < 0.25;
        const end = rand(1.2, 2.0);
        const start = thru ? -rand(0.6, 1.4) : rand(0.3, 0.55);
        const ph = Math.random();
        const baseSpoke = rand(0.35, 0.75);
        const copies = Math.random() < 0.15 ? 2 : 1;
        const perp = new THREE.Vector3().crossVectors(dir, randomUnit()).normalize();

        for (let c = 0; c < copies; c++) {
          const off = perp.clone().multiplyScalar(c * 0.007);
          for (let s = 0; s < SEG; s++) {
            if (Math.random() < 0.1) continue;
            const t0 = s / SEG;
            const t1 = (s + 1) / SEG;
            const d0 = start + (end - start) * t0;
            const d1 = start + (end - start) * t1;
            let q = Math.min(1, Math.max(0, (Math.abs(d0) - 0.25) / 0.65));
            q = q * q * (3 - 2 * q);
            const fall = (0.15 + 0.85 * q) * (1 - 0.4 * Math.min(1, Math.abs(d0) / end));
            lb.seg(
              dir.clone().multiplyScalar(d0).add(off),
              dir.clone().multiplyScalar(d1).add(off),
              ph,
              t0,
              t1,
              baseSpoke * fall
            );
          }
        }
      }
      spokes.add(lb.build(lineMat(0x0ea5e9, 1, 0.7)));
    }
    spin(spokes, 0.015, 0.04, 0.02);

    /* ===== 3. THIN GLOWING ARCS ===== */
    const arcs: { s: THREE.Group; sp: number }[] = [];
    [
      { r: 1.38, tube: 0.006, arc: PI * 1.1, sp: -0.28 },
      { r: 1.12, tube: 0.006, arc: PI * 1.3, sp: 0.35 },
    ].forEach((d) => {
      const tilt = new THREE.Group();
      tilt.rotation.set(rand(-0.9, 0.9), rand(-0.9, 0.9), rand(0, TAU));
      const core = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, d.tube, 6, 160, d.arc),
        inkMat(0x0b2a5b, 0.75)
      );
      const glow = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, d.tube * 3.5, 6, 160, d.arc),
        inkMat(0x22d3ee, 0.14)
      );
      const spinner = new THREE.Group();
      spinner.add(core, glow);
      tilt.add(spinner);
      root.add(tilt);
      arcs.push({ s: spinner, sp: d.sp });
    });

    /* ===== 4. SPARKLE SWARM ===== */
    const orbitMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: U.uTime,
        uPR: U.uPR,
        uK: U.uK,
        uBoot: U.uBoot,
        uLevel: U.uLevel,
      },
      transparent: true,
      depthWrite: false,
      vertexShader: [
        "attribute vec3 aAxis; attribute float aR; attribute float aA0; attribute float aSpeed;",
        "attribute float aSize; attribute vec3 aColor; attribute float aPhase; attribute float aTrail; attribute vec3 aOff;",
        "uniform float uTime; uniform float uPR; uniform float uK; uniform float uBoot; uniform float uLevel;",
        "varying vec3 vColor; varying float vFade;",
        "void main(){",
        "  float boot = smoothstep(0.0, 1.0, uBoot);",
        "  vec3 n = normalize(aAxis);",
        "  vec3 h = abs(n.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);",
        "  vec3 u = normalize(cross(n, h)); vec3 v = cross(n, u);",
        "  float a = aA0 + uTime * aSpeed * (1.0 + uLevel * 0.8) - aTrail * 0.3 * sign(aSpeed);",
        "  vec3 p = ((u * cos(a) + v * sin(a)) * aR + aOff) * mix(0.2, 1.0, boot);",
        "  float tw = 0.55 + 0.45 * sin(uTime * (1.5 + aPhase * 3.0) + aPhase * 40.0);",
        "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
        "  float depth = clamp((-mv.z - 5.6) / 3.4, 0.0, 1.0);",
        "  gl_PointSize = aSize * uK * uPR * (6.4 / -mv.z) * (1.0 - aTrail * 0.6) * (0.6 + 0.7 * tw) * boot;",
        "  gl_Position = projectionMatrix * mv;",
        "  vColor = aColor;",
        "  vFade = (1.0 - aTrail * 0.8) * (0.45 + 0.55 * tw) * (1.0 - 0.6 * depth) * boot;",
        "}",
      ].join("\n"),
      fragmentShader: [
        "varying vec3 vColor; varying float vFade;",
        "void main(){",
        "  float d = length(gl_PointCoord - 0.5) * 2.0;",
        "  if (d > 1.0) discard;",
        "  float a = smoothstep(1.0, 0.3, d) * clamp(vFade, 0.0, 1.0) * 0.85;",
        "  gl_FragColor = vec4(vColor, a);",
        "  #include <colorspace_fragment>",
        "}",
      ].join("\n"),
    });

    const swarm = (() => {
      const pos: number[] = [], axis: number[] = [], R: number[] = [], A0: number[] = [];
      const SP: number[] = [], SZ: number[] = [], COL: number[] = [], PH: number[] = [];
      const TR: number[] = [], OFF: number[] = [];

      const band = (
        ax: THREE.Vector3,
        radius: number,
        count: number,
        speed: number,
        arc: [number, number],
        thick: number,
        szMin: number,
        szMax: number,
        trail: number
      ) => {
        for (let i = 0; i < count; i++) {
          const a0 = arc[0] + Math.random() * arc[1];
          const col = pickTone();
          const size = rand(szMin, szMax);
          const ph = Math.random();
          const off = randomUnit().multiplyScalar(Math.pow(Math.random(), 0.7) * thick);
          const sp = speed * rand(0.85, 1.15);
          const rr = radius + rand(-0.02, 0.02);
          for (let t = 0; t < trail; t++) {
            pos.push(0, 0, 0);
            axis.push(ax.x, ax.y, ax.z);
            R.push(rr);
            A0.push(a0);
            SP.push(sp);
            SZ.push(size);
            COL.push(col.r, col.g, col.b);
            PH.push(ph);
            TR.push(t / trail);
            OFF.push(off.x, off.y, off.z);
          }
        }
      };

      for (let i = 0; i < 5; i++) {
        band(
          randomUnit(),
          rand(1.35, 1.9),
          Math.round(600 * density),
          (Math.random() < 0.5 ? -1 : 1) * rand(0.12, 0.35),
          [rand(0, TAU), rand(2.2, 4.4)],
          rand(0.05, 0.11),
          1.6,
          3.6,
          4
        );
      }
      for (let i = 0; i < 3; i++) {
        band(
          randomUnit(),
          rand(0.55, 1.1),
          Math.round(220 * density),
          (Math.random() < 0.5 ? -1 : 1) * rand(0.25, 0.6),
          [rand(0, TAU), rand(2.4, 5.2)],
          rand(0.05, 0.1),
          1.4,
          2.8,
          3
        );
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("aAxis", new THREE.Float32BufferAttribute(axis, 3));
      g.setAttribute("aR", new THREE.Float32BufferAttribute(R, 1));
      g.setAttribute("aA0", new THREE.Float32BufferAttribute(A0, 1));
      g.setAttribute("aSpeed", new THREE.Float32BufferAttribute(SP, 1));
      g.setAttribute("aSize", new THREE.Float32BufferAttribute(SZ, 1));
      g.setAttribute("aColor", new THREE.Float32BufferAttribute(COL, 3));
      g.setAttribute("aPhase", new THREE.Float32BufferAttribute(PH, 1));
      g.setAttribute("aTrail", new THREE.Float32BufferAttribute(TR, 1));
      g.setAttribute("aOff", new THREE.Float32BufferAttribute(OFF, 3));
      const p = new THREE.Points(g, orbitMat);
      p.frustumCulled = false;
      return p;
    })();
    root.add(swarm);
    spin(swarm, 0.01, 0.025, 0);

    /* ===== 5. IRIS CORE + HUD RINGS ===== */
    const radialTexture = (stops: [number, string][]) => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d")!;
      const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
      stops.forEach(([o, col]) => gr.addColorStop(o, col));
      x.fillStyle = gr;
      x.fillRect(0, 0, 256, 256);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };

    // soft blue haze (no white centre, so it stays visible on white)
    const glowTex = radialTexture([
      [0, "rgba(30,111,217,.75)"],
      [0.2, "rgba(14,165,233,.4)"],
      [0.5, "rgba(34,211,238,.14)"],
      [1, "rgba(34,211,238,0)"],
    ]);
    const rimTex = radialTexture([
      [0, "rgba(30,111,217,.06)"],
      [0.5, "rgba(14,165,233,.14)"],
      [0.74, "rgba(30,111,217,.7)"],
      [0.84, "rgba(11,42,91,.45)"],
      [1, "rgba(11,42,91,0)"],
    ]);

    type HudOpts = { rings: number; rMin: number; tickR: number; ticks: number; frags: number; blocks: number };
    const hudTexture = (o: HudOpts) => {
      const S = 1024;
      const c = document.createElement("canvas");
      c.width = c.height = S;
      const g = c.getContext("2d")!;
      g.translate(S / 2, S / 2);
      g.shadowColor = "rgba(34,211,238,.45)";
      g.shadowBlur = 6;
      const half = S / 2 - 20;
      // navy -> blue strokes
      const col = (a: number) =>
        `rgba(${(10 + rand(0, 30)) | 0},${(60 + rand(0, 70)) | 0},${(150 + rand(0, 70)) | 0},${a})`;

      for (let i = 0; i < o.rings; i++) {
        const r = half * (o.rMin + (1 - o.rMin) * (i / Math.max(1, o.rings - 1)));
        g.beginPath();
        g.lineWidth = rand(1.2, 3.2);
        g.setLineDash(
          Math.random() < 0.5 ? [] : [rand(6, 40), rand(4, 30), rand(2, 10), rand(4, 20)]
        );
        g.strokeStyle = col(rand(0.45, 0.9));
        g.arc(0, 0, r, rand(0, TAU), rand(0, TAU) + rand(2.5, TAU));
        g.stroke();
      }
      g.setLineDash([]);

      const rt = half * o.tickR;
      g.lineWidth = 1.5;
      g.strokeStyle = col(0.8);
      for (let i = 0; i < o.ticks; i++) {
        const a = (i / o.ticks) * TAU;
        const len = i % 5 === 0 ? 18 : 8;
        g.beginPath();
        g.moveTo(Math.cos(a) * rt, Math.sin(a) * rt);
        g.lineTo(Math.cos(a) * (rt + len), Math.sin(a) * (rt + len));
        g.stroke();
      }
      for (let k = 0; k < o.frags; k++) {
        const fr = half * rand(o.rMin, 1);
        const fa = rand(0, TAU);
        g.beginPath();
        g.lineWidth = rand(1.5, 5);
        g.strokeStyle = col(rand(0.6, 1));
        g.arc(0, 0, fr, fa, fa + rand(0.04, 0.5));
        g.stroke();
      }
      g.shadowBlur = 3;
      for (let k = 0; k < o.blocks; k++) {
        g.save();
        g.rotate(rand(0, TAU));
        g.fillStyle = col(rand(0.55, 0.95));
        g.fillRect(half * rand(o.rMin, 1), -2, rand(8, 34), rand(2, 6));
        g.restore();
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    };

    const glowSprite = (opacity: number, scale: number, color?: number) => {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          opacity,
          ...(color ? { color } : {}),
        })
      );
      s.scale.set(scale, scale, 1);
      return s;
    };

    const coreGlow = glowSprite(0.45, 1.0);
    const coreWide = glowSprite(0.14, 3.0);
    coreGroup.add(coreWide, coreGlow);

    const iris = new THREE.Group();
    coreGroup.add(iris);
    iris.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(0.48, 0.48),
        new THREE.MeshBasicMaterial({
          map: rimTex,
          transparent: true,
          depthWrite: false,
          opacity: 0.95,
        })
      ),
      new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.014, 12, 120), inkMat(0x0b2a5b, 0.95)),
      new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.04, 12, 120), inkMat(0x22d3ee, 0.2)),
      new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.006, 8, 120), inkMat(0x1e6fd9, 0.85))
    );
    for (let tr = 1; tr <= 4; tr++) {
      const tm = new THREE.Mesh(
        new THREE.TorusGeometry(0.145 * (1 - 0.13 * tr), 0.004, 6, 96),
        inkMat(0x1e6fd9, 0.6 / tr)
      );
      tm.position.z = -0.07 * tr;
      iris.add(tm);
    }
    const hot = glowSprite(0.3, 0.2, 0x1e6fd9);
    hot.position.set(-0.12, -0.09, 0.03);
    iris.add(hot);

    const huds = (
      [
        { size: 1.25, z: 0.0, sp: 0.3, op: 0.9, o: { rings: 5, rMin: 0.55, tickR: 0.72, ticks: 90, frags: 22, blocks: 14 } },
        { size: 1.95, z: -0.04, sp: -0.16, op: 0.75, o: { rings: 7, rMin: 0.45, tickR: 0.85, ticks: 140, frags: 30, blocks: 22 } },
        { size: 2.9, z: 0.03, sp: 0.07, op: 0.5, o: { rings: 9, rMin: 0.5, tickR: 0.92, ticks: 180, frags: 40, blocks: 30 } },
      ] as { size: number; z: number; sp: number; op: number; o: HudOpts }[]
    ).map((d) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(d.size, d.size),
        new THREE.MeshBasicMaterial({
          map: hudTexture(d.o),
          transparent: true,
          depthWrite: false,
          opacity: d.op,
          side: THREE.DoubleSide,
        })
      );
      m.position.z = d.z;
      coreGroup.add(m);
      return { m, sp: d.sp, op: d.op };
    });

    /* ----- pointer + sizing ----- */
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = host.clientWidth || 500;
      const h = host.clientHeight || 500;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      U.uK.value = Math.max(0.6, w / 520);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* ----- animation loop ----- */
    const BOOT_SECONDS = 3.0;
    let level = 0;
    let aiVoice = 0;
    let raf = 0;
    let elapsed = 0;
    let lastNow = 0;

    const update = (t: number, dt: number) => {
      U.uTime.value = t;
      const b = Math.min(1, t / BOOT_SECONDS);
      const boot = 1 - Math.pow(1 - b, 3);
      U.uBoot.value = boot;

      const v = voice.current;
      aiVoice += (v.target - aiVoice) * 0.25;
      v.flash = Math.max(0, v.flash - dt * 1.4);
      const flashE = v.flash * v.flash;

      level += (Math.max(aiVoice, flashE) - level) * 0.12;
      U.uLevel.value = level;

      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;

      root.rotation.y = tx * 0.35 + Math.sin(t * 0.1) * 0.18;
      root.rotation.x = ty * 0.25 + Math.sin(t * 0.17) * 0.12;
      root.rotation.z = Math.sin(t * 0.13) * 0.06;
      coreGroup.rotation.y = -0.28 + tx * 0.22;
      coreGroup.rotation.x = 0.18 + ty * 0.18;

      for (const s of spinners) {
        s.o.rotation.x += s.x * dt;
        s.o.rotation.y += s.y * dt;
        s.o.rotation.z += s.z * dt;
      }
      for (const a of arcs) a.s.rotation.z += a.sp * dt;
      for (const h of huds) h.m.rotation.z += h.sp * dt * (1 + level);

      const pulse =
        1 + Math.sin(t * 2.2) * 0.03 + Math.sin(t * 5.3) * 0.012 + level * 0.12 + flashE * 0.18;
      const cs = (0.3 + 0.7 * boot) * pulse;
      iris.scale.set(cs, cs, 1);

      for (const h of huds) {
        (h.m.material as THREE.MeshBasicMaterial).opacity = Math.min(
          1,
          h.op * boot * (1 + flashE * 0.3)
        );
        h.m.scale.setScalar(0.6 + 0.4 * boot);
      }
      coreGlow.material.opacity = Math.min(
        1,
        (0.42 + Math.sin(t * 1.4) * 0.05 + level * 0.25 + flashE * 0.3) * boot
      );
      coreWide.material.opacity = Math.min(
        1,
        (0.14 + Math.sin(t * 1.1) * 0.02 + level * 0.1 + flashE * 0.15) * boot
      );
      hot.material.opacity = Math.min(1, 0.3 + 0.1 * Math.sin(t * 3.1) + level * 0.25 + flashE * 0.3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;
      elapsed += dt;
      update(elapsed, dt);
      renderer.render(scene, camera);
    };
    const start = () => {
      if (raf || reduceMotion) return;
      lastNow = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    let io: IntersectionObserver | null = null;
    const onVisibility = () => (document.hidden ? stop() : start());

    if (reduceMotion) {
      update(BOOT_SECONDS + 1, 0);
      renderer.render(scene, camera);
    } else {
      start();
      io = new IntersectionObserver((e) => (e[0].isIntersecting ? start() : stop()), {
        threshold: 0.01,
      });
      io.observe(host);
      document.addEventListener("visibilitychange", onVisibility);
    }

    /* ----- cleanup ----- */
    return () => {
      stop();
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);

      scene.traverse((obj) => {
        const o = obj as THREE.Mesh;
        o.geometry?.dispose();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => {
          (m as THREE.MeshBasicMaterial).map?.dispose();
          m.dispose();
        });
      });
      glowTex.dispose();
      rimTex.dispose();
      renderer.dispose();
      cv.remove();
    };
  }, []);

    return (
    <div className="flex h-full w-full min-w-0 flex-col">
      {/* Orb stage */}
       <div
          ref={hostRef}
          className="relative h-75 shrink-0 sm:h-95 lg:h-auto lg:min-h-0 lg:flex-1"
        />

      {/* Chat panel */}
      <div className="relative z-10 min-w-0 space-y-2.5 px-3 pb-2 sm:px-4">
        <p className="sr-only" aria-live="polite">
          {typed + rest}
        </p>

         <div
            className={`h-48 overflow-y-auto rounded-2xl border border-line bg-white/85 p-4 shadow-lg shadow-navy/10 backdrop-blur-md transition-opacity duration-500 sm:h-40 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
          <div
            className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-brand"
            aria-hidden="true"
          >
            <span className="h-1.75 w-1.75 animate-pulse rounded-full bg-cyan shadow-[0_0_8px_#22d3ee]" />
            A.I.
            {asked && (
              <span className="ml-auto max-w-[55%] truncate text-[11px] font-medium normal-case tracking-normal text-muted">
                You: {asked}
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-navy sm:text-[15px]" aria-hidden="true">
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] animate-pulse bg-brand" />
            <span className="invisible">{rest}</span>
          </p>
        </div>

        {/* Links + suggestion chips (single scrollable row) */}
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-0.5 [scrollbar-width:none]">
          {rest === "" &&
            links.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="shrink-0 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand"
                >
                  {l.label} →
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className="shrink-0 rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-brand"
                >
                  {l.label}
                </a>
              )
            )}
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => send(c)}
              className="shrink-0 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-navy transition hover:border-brand hover:text-brand"
            >
              {c}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-full border border-line bg-white p-1.5 pl-4 shadow-sm focus-within:border-brand"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={200}
            aria-label="Ask the Azoytrix assistant"
            placeholder="Ask about services, process, pricing…"
            className="min-w-0 flex-1 bg-transparent text-base text-navy outline-none placeholder:text-muted sm:text-sm"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white transition hover:bg-brand"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
