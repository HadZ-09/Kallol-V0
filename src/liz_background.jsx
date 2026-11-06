import { useEffect, useRef } from "react";
import { startLizard } from "./lizard";

export default function LizardBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // startLizard returns its own cleanup, so StrictMode double-mounts are safe
    return startLizard(canvasRef.current, { color: "rgba(100, 255, 218, 0.45)" });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
