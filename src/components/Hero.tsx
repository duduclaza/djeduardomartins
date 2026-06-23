"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, ChevronDown } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07020f]">
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

      {/* Foto do DJ */}
      {imgOk && (
        <img
          src="/images/hero-dj.jpg"
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
