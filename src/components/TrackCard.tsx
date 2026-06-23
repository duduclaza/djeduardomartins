import Link from "next/link";
import { Download, Lock, Tag } from "lucide-react";

export type TrackCardData = {
  id: string;
  title: string;
  slug: string;
  genre: string;
  description: string | null;
  coverUrl: string;
  audioUrl: string;
  isFree: boolean;
  priceCents: number;
};

export default function TrackCard({
  track,
  isLoggedIn,
}: {
  track: TrackCardData;
  isLoggedIn: boolean;
}) {
  return (
    <div className="glass-panel glow-border rounded-2xl overflow-hidden flex flex-col">
      <div className="relative aspect-square">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-neon-gold uppercase tracking-wide">
          <Tag size={12} />
          {track.isFree ? "Grátis" : `R$ ${(track.priceCents / 100).toFixed(2)}`}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display text-lg text-white">{track.title}</h3>
          <p className="text-xs uppercase tracking-wider text-neon-blue">
            {track.genre}
          </p>
        </div>

        {track.description && (
          <p className="text-sm text-white/60 line-clamp-2">
            {track.description}
          </p>
        )}

        <audio
          controls
          preload="none"
          className="w-full mt-1 accent-pink-500"
          src={track.audioUrl}
        />

        <div className="mt-auto pt-2">
          {track.isFree ? (
            isLoggedIn ? (
              <a
                href={`/api/tracks/${track.id}/download`}
                className="btn-outline-neon w-full text-xs"
              >
                <Download size={16} /> Baixar grátis
              </a>
            ) : (
              <Link
                href={`/membros/login?callbackUrl=/musicas`}
                className="btn-outline-neon w-full text-xs"
              >
                <Lock size={16} /> Entrar para baixar
              </Link>
            )
          ) : (
            <button
              disabled
              className="btn-outline-neon w-full text-xs opacity-50 cursor-not-allowed"
            >
              <Lock size={16} /> Compra em breve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
