"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

export default function UploadTrackForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isFree, setIsFree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("isFree", String(isFree));

    const res = await fetch("/api/tracks", { method: "POST", body: formData });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Não foi possível enviar a faixa.");
      return;
    }

    formRef.current?.reset();
    setIsFree(true);
    router.refresh();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass-panel glow-border rounded-2xl p-6 flex flex-col gap-4"
    >
      <h2 className="font-display text-lg text-white flex items-center gap-2">
        <UploadCloud size={18} className="text-neon-blue" /> Subir nova faixa
      </h2>

      <input
        name="title"
        required
        placeholder="Título da faixa"
        className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
      />
      <input
        name="genre"
        required
        placeholder="Gênero (ex: Tribal House)"
        className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
      />
      <textarea
        name="description"
        placeholder="Descrição (opcional)"
        rows={2}
        className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
      />

      <div className="flex items-center gap-3 text-sm text-white/80">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
          />
          Disponível grátis para membros
        </label>
      </div>

      {!isFree && (
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço (R$) — compra em breve"
          className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
        />
      )}

      <div>
        <label className="text-xs text-white/50 block mb-1">
          Arquivo de áudio (obrigatório)
        </label>
        <input
          name="audio"
          type="file"
          accept="audio/*"
          required
          className="text-sm text-white/80 w-full"
        />
      </div>

      <div>
        <label className="text-xs text-white/50 block mb-1">
          Capa (opcional)
        </label>
        <input
          name="cover"
          type="file"
          accept="image/*"
          className="text-sm text-white/80 w-full"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn-neon mt-2">
        {loading ? "Enviando..." : "Publicar faixa"}
      </button>
    </form>
  );
}
