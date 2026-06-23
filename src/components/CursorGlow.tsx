"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 300, damping: 40 });
  const springY = useSpring(y, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="hidden [@media(pointer:fine)]:block motion-reduce:hidden pointer-events-none fixed z-[55] -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20 mix-blend-screen"
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(circle,_var(--neon-pink)_0%,_transparent_70%)]" />
    </motion.div>
  );
}
