import { prisma } from "@/lib/prisma";
import UploadTrackForm from "@/components/admin/UploadTrackForm";
import TrackRow from "@/components/admin/TrackRow";

export default async function AdminPage() {
  const [tracks, memberCount] = await Promise.all([
    prisma.track.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.user.count({ where: { role: "MEMBER" } }),
  ]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 bg-gradient-to-b from-[#07020f] to-[#0c0418]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-neon-gold mb-2">
            Painel Webmaster
          </p>
          <h1 className="font-display text-3xl text-white">
            Gerenciar produções
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            {memberCount} membro{memberCount === 1 ? "" : "s"} cadastrado
            {memberCount === 1 ? "" : "s"} · {tracks.length} faixa
            {tracks.length === 1 ? "" : "s"} no catálogo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <UploadTrackForm />

          <div className="flex flex-col gap-3">
            {tracks.length === 0 && (
              <p className="text-white/50 text-sm">Nenhuma faixa enviada ainda.</p>
            )}
            {tracks.map((track) => (
              <TrackRow key={track.id} track={track} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
