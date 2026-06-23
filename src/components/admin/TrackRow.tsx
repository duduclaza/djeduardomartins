"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Eye, EyeOff, Tag } from "lucide-react";

export type AdminTrackData = {
  id: string;
  title: string;
  genre: string;
  coverUrl: string;
  isFree: boolean;
  priceCents: number;
  published: boolean;
};

export default function TrackRow({ track }: { track: AdminTrackData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function patch(data: Record<string, unknown>) {
    setLoading(true);
    await fetch(`/api/tracks/${track.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    router.refresh();
  }

  async function remove() {
    if (!confirm(`Excluir "${track.title}"? Essa ação não pode ser desfeita.`)) return;
    setLoading(true);
    await fetch(`/api/tracks/${track.id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 glass-panel rounded-xl p-4">
      <img
        src={track.coverUrl}
        alt={track.title}
        className="w-14 h-14 rounded-lg object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{track.title}</p>
        <p className="text-xs text-white/50 flex items-center gap-1">
          <Tag size={12} /> {track.genre} ·{" "}
          {track.isFree ? "Grátis" : `R$ ${(track.priceCents / 100).toFixed(2)}`}
        </p>
      </div>

      <button
        disabled={loading}
        onClick={() => patch({ published: !track.published })}
        title={track.published ? "Ocultar do site" : "Publicar no site"}
        className="text-white/60 hover:text-neon-blue transition-colors"
      >
        {track.published ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>

      <button
        disabled={loading}
        onClick={() => patch({ isFree: !track.isFree })}
        className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/70 hover:border-neon-pink hover:text-neon-pink transition-colors"
      >
        {track.isFree ? "Marcar como pago" : "Marcar como grátis"}
      </button>

      <button
        disabled={loading}
        onClick={remove}
        className="text-white/60 hover:text-red-400 transition-colors"
        aria-label="Excluir"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
