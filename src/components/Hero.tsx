"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PlayCircle, ChevronDown } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Particles from "@/components/Particles";
import EqualizerBars from "@/components/EqualizerBars";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 80,
    damping: 12,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 80,
    damping: 12,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07020f]"
    >
      {/* Feixes de luz girando, evocando o palco */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 animate-beam-sweep">
        <div
          className="w-[140vmax] h-[140vmax]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(255,43,214,0.25) 8deg, transparent 16deg, transparent 170deg, rgba(0,224,255,0.25) 178deg, transparent 186deg, transparent 360deg)",
          }}
        />
      </div>

      {/* Diamond neon lines, evocando o palco */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        {[420, 320, 220].map((size, i) => (
          <div
            key={size}
            className="absolute border rotate-45"
            style={{
              width: size,
              height: size,
              borderColor: i % 2 === 0 ? "rgba(255,43,214,0.45)" : "rgba(0,224,255,0.4)",
              boxShadow: `0 0 30px ${
                i % 2 === 0 ? "rgba(255,43,214,0.35)" : "rgba(0,224,255,0.3)"
              }`,
            }}
          />
        ))}
      </div>

      <Particles />

      {/* Foto do DJ */}
      {imgOk && (
        <img
          src="/images/hero-dj.png"
          alt="DJ Eduardo Claza"
          onError={() => setImgOk(false)}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
        />
      )}

      {/* Vinheta para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07020f] via-[#07020f]/60 to-[#07020f]/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07020f]/70 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ rotateX, rotateY }}
        className="relative z-10 text-center px-5 mt-20"
      >
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-neon-blue mb-4">
          Tribal House &middot; Pop House &middot; Pride Edition
        </p>
        <h1 className="font-display font-900 text-4xl sm:text-6xl md:text-7xl leading-tight text-white text-glow-pink">
          DJ <span className="gradient-text">EDUARDO CLAZA</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-white/70 text-sm sm:text-base">
          16 anos de carreira nas pistas de Minas Gerais e São Paulo. Som que
          celebra a comunidade LGBTQIA+ — tribal house e pop house pra fazer a
          pista vibrar.
        </p>

        <div className="flex justify-center mt-6">
          <EqualizerBars className="h-8" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/musicas" className="btn-neon">
            <PlayCircle size={18} /> Ouvir Produções
          </Link>
          <a
            href="https://instagram.com/djeduardomartins"
            target="_blank"
            rel="noreferrer"
            className="btn-outline-neon"
          >
            <InstagramIcon size={18} /> @djeduardomartins
          </a>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 z-10 text-white/50"
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
}
