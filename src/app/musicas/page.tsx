import SectionReveal from "@/components/SectionReveal";
import TrackCard from "@/components/TrackCard";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Músicas | DJ Eduardo Claza",
};

export default async function MusicasPage() {
  const session = await auth();
  const tracks = await prisma.track.findMany({
    where: { published: true },
    orderBy: { releasedAt: "desc" },
  });

  return (
    <div className="pt-32 pb-24 px-5 min-h-screen bg-gradient-to-b from-[#07020f] to-[#0c0418]">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-xs text-neon-blue mb-3">
            Catálogo
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-white">
            Minhas <span className="gradient-text">Produções</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-sm">
            Ouça a prévia direto no player. Faixas grátis ficam disponíveis
            para download na área de membros.
          </p>
        </SectionReveal>

        {tracks.length === 0 ? (
          <p className="text-center text-white/50">
            Em breve novas produções por aqui.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <SectionReveal key={track.id} delay={(i % 3) * 0.1}>
                <TrackCard track={track} isLoggedIn={!!session} />
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
