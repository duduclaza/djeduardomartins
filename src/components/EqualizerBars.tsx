export default function EqualizerBars({ className = "" }: { className?: string }) {
  const bars = [40, 70, 100, 65, 90, 50, 80, 35, 60, 95, 45, 75];

  return (
    <div className={`flex items-end gap-1 ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-neon-pink via-neon-purple to-neon-blue animate-eq-bar"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}
