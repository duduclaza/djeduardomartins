function PersonSilhouette({ x, raised }: { x: number; raised: boolean }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      <circle cx="0" cy="6" r="6" fill="#05010f" />
      <path
        d={
          raised
            ? "M -7 18 C -7 8 -3 4 0 4 C 3 4 7 8 7 18 L 7 40 L -7 40 Z M -7 14 L -16 -6 M 7 14 L 16 -6"
            : "M -7 18 C -7 8 -3 4 0 4 C 3 4 7 8 7 18 L 7 40 L -7 40 Z M -7 16 L -13 28 M 7 16 L 13 28"
        }
        fill="#05010f"
        stroke="#05010f"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </g>
  );
}

export default function PrideFloorScene() {
  const people = [
    { x: 20, raised: true },
    { x: 70, raised: false },
    { x: 120, raised: true },
    { x: 170, raised: true },
    { x: 220, raised: false },
    { x: 270, raised: true },
    { x: 320, raised: false },
    { x: 370, raised: true },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#05010f]">
      {/* Feixes de luz arco-iris girando */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50 animate-beam-sweep">
        <div
          className="w-[220%] h-[220%]"
          style={{
            background:
              "conic-gradient(from 0deg, #ff2bd6 0deg, #ff9d2b 45deg, #fff02b 90deg, #2bff7a 135deg, #2bd6ff 180deg, #8b2bff 225deg, #ff2bd6 270deg, transparent 300deg, transparent 360deg)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Disco glow pulsante */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-white/30 blur-2xl animate-pulse" />

      {/* Confete / partículas coloridas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const colors = ["#ff2bd6", "#2bd6ff", "#fff02b", "#2bff7a", "#8b2bff"];
          const left = ((i + 1) * 97) % 100;
          const duration = 6 + ((i * 37) % 10);
          const delay = (i * 53) % 8;
          return (
            <span
              key={i}
              className="absolute bottom-0 rounded-sm opacity-0 animate-particle-rise"
              style={{
                left: `${left}%`,
                width: 5,
                height: 5,
                background: colors[i % colors.length],
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Multidão com as maos pra cima */}
      <svg
        viewBox="0 0 420 60"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[35%] opacity-95"
      >
        {people.map((p) => (
          <PersonSilhouette key={p.x} x={p.x} raised={p.raised} />
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-[#05010f] via-transparent to-[#05010f]/40" />

      <div className="absolute bottom-6 left-0 right-0 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-white/70">
          Pride na Pista
        </p>
      </div>
    </div>
  );
}
