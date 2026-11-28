"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const GLYPH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "AZOYTRIX" +
  "abcdefghijklmnopqrstuvwxyz" +
  "azoytrix" +
  "0123456789" +
  "!@#$%^&*()_+-=[]{}|;:',.<>?/\\`~" +
  "constletvarfunctionreturn" +
  "classobjectarraystringboolean" +
  "HTMLCSSJSREACTNODE" +
  "JAVAPYTHONPHPSQL" +
  "importexportasyncawait" +
  "ifelseforwhileswitch" +
  "npmgitgithubterminal" +
  "AZOYTRIXCODEWEBANDROID" +
  "APIJSONHTTPHTTPS";

// Unique glyphs only: the atlas needs each character once
const GLYPH_LIST = Array.from(new Set(Array.from(GLYPH_CHARS)));

const CELL = 64;

// Atlas is a grid (not one long row) so it never exceeds GPU texture limits.
// 16 columns x 64px = 1024px wide, well under the 4096px mobile minimum.
const ATLAS_COLS = 16;
const ATLAS_ROWS = Math.ceil(GLYPH_LIST.length / ATLAS_COLS);

export default function MatrixRain() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReducedMotion(mq.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mq.addEventListener("change", handleChange);

    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  // Initialize Three.js
  useEffect(() => {
    const containerRef = ref.current;
    if (!containerRef) return;

    const container: HTMLDivElement = containerRef;
    const canvas = document.createElement("canvas");

    container.innerHTML = "";

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";

    container.appendChild(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const w = container.clientWidth;
    const h = container.clientHeight;

    // Three.js declarations
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Build glyph atlas (grid layout)
    const atlas = document.createElement("canvas");

    atlas.width = CELL * ATLAS_COLS;
    atlas.height = CELL * ATLAS_ROWS;

    const actx = atlas.getContext("2d");

    if (!actx) {
      renderer.dispose();
      return;
    }

    actx.fillStyle = "#fff";
    actx.font = `${CELL * 0.78}px monospace`;
    actx.textAlign = "center";
    actx.textBaseline = "middle";

    GLYPH_LIST.forEach((ch, i) => {
      const col = i % ATLAS_COLS;
      const row = Math.floor(i / ATLAS_COLS);

      actx.save();
      actx.translate(col * CELL + CELL / 2, row * CELL + CELL / 2);
      actx.fillText(ch, 0, 2);
      actx.restore();
    });

    const texture = new THREE.CanvasTexture(atlas);

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Matrix rain shader
    const fragmentShader = `
      precision highp float;

      uniform float uTime;
      uniform float uGlyphs;
      uniform float uCols;
      uniform float uRows;
      uniform float uScale;

      uniform vec2 uRes;
      uniform vec2 uMouse;

      uniform sampler2D uAtlas;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      vec3 rain(
        vec2 frag,
        float cellPx,
        float speed,
        float depth,
        float seed
      ) {

        vec2 g = frag / (cellPx * uScale);

        vec2 id = floor(g);
        vec2 f = fract(g);

        float col = id.x + seed;

        float rows = uRes.y / (cellPx * uScale);

        float present = step(
          0.18,
          hash(vec2(col, 4.0))
        );

        float spd = (
          0.55 + hash(vec2(col, 1.0)) * 1.1
        ) * speed;

        float len = 7.0 + hash(vec2(col, 2.0)) * 20.0;

        float off = hash(vec2(col, 3.0)) * 200.0;

        float cycle = rows + len + 6.0;

        float head = mod(
          uTime * spd * 9.0 + off,
          cycle
        ) - 3.0;

        float r = rows - id.y;

        float d = head - r;

        if (d < 0.0 || d > len) {
          return vec3(0.0);
        }

        float tick = floor(
          uTime * (1.5 + hash(id) * 5.0)
          + hash(id + 7.0) * 10.0
        );

        float idx = floor(
          hash(id + tick) * uGlyphs
        );

        vec2 gf = (f - 0.5) / 0.82 + 0.5;

        float inside =
          step(0.0, gf.x) *
          step(gf.x, 1.0) *
          step(0.0, gf.y) *
          step(gf.y, 1.0);

        // Glyph position inside the grid atlas.
        // Canvas row 0 is the TOP of the texture, so flip the row.
        float gcol = mod(idx, uCols);
        float grow = floor(idx / uCols);

        vec2 guv = vec2(
          (gcol + clamp(gf.x, 0.0, 1.0)) / uCols,
          (uRows - 1.0 - grow + clamp(gf.y, 0.0, 1.0)) / uRows
        );

        float a = texture2D(uAtlas, guv).r * inside;

        float trail = pow(1.0 - d / len, 1.7);

        float headGlow = 1.0 - smoothstep(0.0, 1.2, d);

        float sparkle =
          step(0.985, hash(id + tick * 1.7)) * 0.6;

        // Blue-white Matrix palette
        vec3 green = vec3(0.35, 0.75, 1.0);

        vec3 col3 = mix(
          green * (0.25 + 0.85 * trail),
          vec3(0.88, 0.96, 1.0),
          headGlow + sparkle * trail
        );

        return col3 * a * depth * present;
      }

      void main() {

        vec2 frag = gl_FragCoord.xy;

        vec2 m = (uMouse - 0.5) * uRes;

        vec3 c = vec3(0.0);

        c += rain(
          frag + m * 0.02,
          12.0, 0.65, 0.45, 11.0
        );

        c += rain(
          frag + m * 0.05,
          20.0, 0.95, 0.75, 37.0
        );

        c += rain(
          frag + m * 0.10,
          32.0, 1.35, 1.10, 71.0
        );

        float md = length(
          (frag / uRes - uMouse)
          * vec2(uRes.x / uRes.y, 1.0)
        );

        c *= 1.0 + 0.9 * smoothstep(0.35, 0.0, md);

        vec2 uv = frag / uRes;

        float vig = smoothstep(
          1.15,
          0.25,
          length((uv - 0.5) * vec2(1.1, 1.0))
        );

        c = c * vig + vec3(0.0, 0.006, 0.014);

        gl_FragColor = vec4(c, 1.0);
      }
    `;

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },

        uRes: {
          value: new THREE.Vector2(w * dpr, h * dpr),
        },

        uAtlas: { value: texture },

        uGlyphs: { value: GLYPH_LIST.length },
        uCols: { value: ATLAS_COLS },
        uRows: { value: ATLAS_ROWS },

        uMouse: {
          value: new THREE.Vector2(0.5, 0.5),
        },

        uScale: {
          value: dpr,
        },
      },

      vertexShader: `
        void main() {
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,

      fragmentShader,
    });

    // Reference uniforms directly from material
    const uniforms = material.uniforms;

    const geometry = new THREE.PlaneGeometry(2, 2);

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // Resize handler
    function resize() {
      const dpr2 = Math.min(window.devicePixelRatio || 1, 2);

      const w2 = container.clientWidth;
      const h2 = container.clientHeight;

      renderer.setPixelRatio(dpr2);
      renderer.setSize(w2, h2, false);

      uniforms.uRes.value.set(w2 * dpr2, h2 * dpr2);

      uniforms.uScale.value = dpr2;
    }

    // Mouse parallax
    const target = new THREE.Vector2(0.5, 0.5);

    function handlePointerMove(e: PointerEvent) {
      const rect = container.getBoundingClientRect();

      target.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    // Animation loop (own delta timer; THREE.Clock is deprecated)
    let last = performance.now();
    let raf = 0;
    let disposed = false;

    function frame() {
      if (disposed) return;

      raf = requestAnimationFrame(frame);

      const now = performance.now();
      uniforms.uTime.value += Math.min((now - last) / 1000, 0.05);
      last = now;

      uniforms.uMouse.value.lerp(target, 0.05);

      renderer.render(scene, camera);
    }

    // Visibility handler
    function handleVisibilityChange() {
      cancelAnimationFrame(raf);

      if (!document.hidden && !reducedMotion) {
        last = performance.now(); // skip the time spent hidden
        frame();
      }
    }

    // Initialize
    resize();

    window.addEventListener("resize", resize, {
      passive: true,
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (reducedMotion) {
      uniforms.uTime.value = 12;
      renderer.render(scene, camera);
    } else {
      frame();
    }

    // Cleanup
    return () => {
      disposed = true;

      cancelAnimationFrame(raf);

      window.removeEventListener("resize", resize);

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      window.removeEventListener("pointermove", handlePointerMove);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [reducedMotion]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
      {/* Matrix Rain Background */}
      <div ref={ref} aria-hidden="true" className="absolute inset-0 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            Welcome to the digital world
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-7xl md:text-8xl">
            ENTER
            <br />

            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-white bg-clip-text text-transparent">
              A.Z.O.Y.T.R.I.X
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A world of code, connections and endless possibilities.
            Step beyond the ordinary and explore what lies beneath
            the surface.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/about"
              className="rounded-full border border-cyan-300/50 bg-cyan-400/10 px-8 py-4 text-sm font-semibold text-cyan-200 backdrop-blur-md transition duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              Explore the system →
            </a>

            <a
              href="/contact"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/50 hover:bg-white/10"
            >
              Discover more
            </a>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="absolute bottom-8 left-0 z-10 w-full px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-cyan-400/20 pt-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            System online
          </div>

          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Reality loading // 001
          </div>
        </div>
      </div>
    </section>
  );
}