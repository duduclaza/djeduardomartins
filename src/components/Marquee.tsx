function MarqueeGroup({ text }: { text: string }) {
  const items = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="flex shrink-0">
      {items.map((i) => (
        <span
          key={i}
          className="font-display text-sm sm:text-base uppercase tracking-[0.3em] text-white/70 px-6 whitespace-nowrap"
        >
          {text} <span className="text-neon-pink">•</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-3">
      <div className="flex w-max animate-marquee">
        <MarqueeGroup text={text} />
        <MarqueeGroup text={text} />
      </div>
    </div>
  );
}
