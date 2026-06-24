"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { addSignature } from "@/app/actions";
import { PenLine } from "lucide-react";

type Signature = {
  id: string;
  name: string;
  createdAt: Date;
};

// Use a simple seeded random generator to keep client/server renders consistent
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export default function GuestbookWall({ signatures }: { signatures: Signature[] }) {
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setIsPending(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);

    const result = await addSignature(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setName("");
    }
    
    setIsPending(false);
  }

  // Pre-calculate positions using a seeded random based on the signature ID
  const getStyleForSignature = (id: string, index: number) => {
    // Generate a simple numeric seed from the string ID
    let seed = 0;
    for (let i = 0; i < id.length; i++) {
      seed += id.charCodeAt(i);
    }
    const rand = mulberry32(seed + index);
    
    // Determine random styles
    const colors = ["text-neon-pink", "text-neon-blue", "text-purple-400", "text-white", "text-yellow-300"];
    const color = colors[Math.floor(rand() * colors.length)];
    
    const rotate = Math.floor(rand() * 40) - 20; // -20 to 20 degrees
    const top = Math.floor(rand() * 80) + 10; // 10% to 90%
    const left = Math.floor(rand() * 80) + 10; // 10% to 90%
    const scale = 0.8 + rand() * 0.6; // 0.8 to 1.4
    
    return {
      colorClass: color,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        fontFamily: "'Caveat', 'Comic Sans MS', cursive, sans-serif" // Attempt a handwriting font
      }
    };
  };

  return (
    <section className="relative py-24 px-5 min-h-[60vh] overflow-hidden bg-[#0c0418] border-t border-white/5" id="guestbook">
      {/* Wall Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/black-wall.png')",
        backgroundRepeat: "repeat"
      }}></div>

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-xs text-neon-pink mb-3">
            O Mural
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-white drop-shadow-md">
            Deixe sua marca na <span className="gradient-text">pista</span>
          </h2>
          <p className="text-white/60 mt-4 text-sm max-w-lg mx-auto">
            Assim como nas paredes dos melhores clubs, se você passou por aqui, assine o mural!
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-16 relative z-20">
          <input
            type="text"
            maxLength={30}
            placeholder="Seu nome ou seu @..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-pink transition-colors"
            required
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || !name.trim()}
            className="bg-neon-pink/20 text-neon-pink border border-neon-pink hover:bg-neon-pink hover:text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending ? "Assinando..." : <><PenLine size={18} /> Assinar</>}
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-center mb-8">{error}</p>
        )}
      </div>

      {/* The Wall (Canvas for signatures) */}
      <div ref={constraintsRef} className="relative w-full h-[400px] border border-white/10 rounded-xl bg-[#05010a] shadow-inner overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at center, #ff00ff 0%, transparent 70%)"
        }}></div>
        
        {mounted && signatures.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display text-xl">
            A parede está limpa... seja o primeiro!
          </div>
        ) : (
          mounted && signatures.map((sig, i) => {
            const { colorClass, style } = getStyleForSignature(sig.id, i);
            return (
              <motion.div 
                key={sig.id}
                drag
                dragConstraints={constraintsRef}
                whileDrag={{ scale: 1.2, zIndex: 50, cursor: "grabbing" }}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                className={`absolute font-bold text-xl drop-shadow-[0_0_8px_currentColor] cursor-grab select-none ${colorClass}`}
                style={style}
                title={`Assinado em ${new Date(sig.createdAt).toLocaleDateString('pt-BR')}`}
              >
                {sig.name}
              </motion.div>
            );
          })
        )}
      </div>
    </section>
  );
}
