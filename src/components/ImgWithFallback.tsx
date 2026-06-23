"use client";

import { useState } from "react";

export default function ImgWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-neon-pink/30 via-neon-purple/30 to-neon-blue/30" />
    );
  }

  return (
    <img src={src} alt={alt} onError={() => setOk(false)} className={className} />
  );
}
