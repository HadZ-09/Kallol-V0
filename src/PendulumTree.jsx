import { useEffect, useRef } from "react";

const MAX_LEVELS = 12; // hard cap so extreme settings can't freeze the page

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/**
 * Fractal tree whose branch angle swings like a pendulum, so the tree
 * opens and closes on its own. Fills its parent: size it with Tailwind
 * classes on the wrapper. Colors must be 6-digit hex like "#64ffda".
 */
export default function PendulumTree({
  color = "#64ffda", // trunk color
  tipColor, // branch-tip color; blends from `color` (defaults to `color`)
  gravity = 0.1, // higher = faster swing
  pendulumLength = 100, // higher = slower swing
  startAngle = 90, // swing amplitude in degrees (max opening)
  ratio = 0.67, // child length / parent length (0.3 to 0.8)
  trunkSize = 0.25, // trunk length as a fraction of the canvas size
  detail = 0.04, // smallest branch as a fraction of the trunk (lower = finer)
  thickness = 0.03, // line width as a fraction of branch length
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const r = Math.min(0.8, Math.max(0.3, ratio));
    const d = Math.min(0.5, Math.max(0.01, detail));
    const maxLevel = Math.min(
      MAX_LEVELS,
      Math.max(1, Math.ceil(Math.log(d) / Math.log(r)))
    );

    // One color per level, blended from trunk to tips
    const from = hexToRgb(color);
    const to = hexToRgb(tipColor || color);
    const levelColors = Array.from({ length: maxLevel + 1 }, (_, i) => {
      const t = i / maxLevel;
      const c = from.map((v, k) => Math.round(v + (to[k] - v) * t));
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    });

    const STEP = 25; // ms per physics step
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let acc = 0;

    let angle = reduceMotion ? Math.PI / 6 : (startAngle * Math.PI) / 180;
    let angleV = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const branch = (len, level, minLen) => {
      ctx.strokeStyle = levelColors[Math.min(level, maxLevel)];
      ctx.lineWidth = Math.max(0.7, len * thickness);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -len);
      ctx.stroke();

      ctx.translate(0, -len);

      if (len > minLen && level < MAX_LEVELS) {
        ctx.save();
        ctx.rotate(angle);
        branch(len * r, level + 1, minLen);
        ctx.restore();

        ctx.save();
        ctx.rotate(-angle);
        branch(len * r, level + 1, minLen);
        ctx.restore();
      }
    };

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      const trunk = Math.min(w, h) * trunkSize;
      ctx.translate(w / 2, h); // root at bottom center
      branch(trunk, 0, trunk * d);
    };

    const frame = (now) => {
      acc += Math.min(now - last, 100);
      last = now;
      while (acc >= STEP) {
        const force = gravity * Math.sin(angle);
        angleV += -force / pendulumLength;
        angle += angleV;
        acc -= STEP;
      }
      render();
      raf = requestAnimationFrame(frame);
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) render();
    });
    observer.observe(canvas);

    if (reduceMotion) {
      render();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [
    color,
    tipColor,
    gravity,
    pendulumLength,
    startAngle,
    ratio,
    trunkSize,
    detail,
    thickness,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`bg-[#0A192F] pointer-events-none block h-full w-full ${className}`}
    />
  );
}
