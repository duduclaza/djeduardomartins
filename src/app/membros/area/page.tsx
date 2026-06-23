import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TrackCard from "@/components/TrackCard";
import SectionReveal from "@/components/SectionReveal";

export default async function MembrosAreaPage() {
  const session = await auth();
  const tracks = await prisma.track.findMany({
    where: { published: true },
    orderBy: { releasedAt: "desc" },
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 bg-gradient-to-b from-[#07020f] to-[#0c0418]">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-neon-pink mb-2">
            Área de Membros
          </p>
          <h1 className="font-display text-3xl text-white">
            Bem-vindo(a), {session?.user.name ?? "membro"}!
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Todas as faixas grátis liberadas para download estão aqui.
          </p>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <SectionReveal key={track.id} delay={(i % 3) * 0.1}>
              <TrackCard track={track} isLoggedIn />
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
