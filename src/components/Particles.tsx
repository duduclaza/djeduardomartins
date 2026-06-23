function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function Particles({ count = 28 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: pseudoRandom(i + 1) * 100,
    size: 2 + pseudoRandom(i + 2) * 4,
    duration: 8 + pseudoRandom(i + 3) * 12,
    delay: pseudoRandom(i + 4) * 10,
    color: i % 2 === 0 ? "var(--neon-pink)" : "var(--neon-blue)",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full opacity-0 animate-particle-rise"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
