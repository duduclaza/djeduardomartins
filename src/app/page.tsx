import Link from "next/link";
import { Disc3, MapPin, HeartHandshake } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import TrackCard from "@/components/TrackCard";
import ImgWithFallback from "@/components/ImgWithFallback";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const tracks = await prisma.track.findMany({
    where: { published: true },
    orderBy: { releasedAt: "desc" },
    take: 3,
  });

  return (
    <div>
      <Hero />

      <section id="sobre" className="relative py-24 px-5 bg-[#07020f]">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 items-center">
          <SectionReveal>
            <p className="uppercase tracking-[0.3em] text-xs text-neon-pink mb-3">
              Sobre
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-5">
              16 anos levando o <span className="gradient-text">tribal house</span> pra pista
            </h2>
            <p className="text-white/70 leading-relaxed">
              Eduardo Claza já passou pelas principais casas noturnas de Minas
              Gerais e São Paulo, construindo um som que mistura tribal house
              e pop house com uma energia voltada para celebrar a comunidade
              LGBTQIA+. Mais do que um set, uma experiência imersiva guiada
              por luz, groove e pertencimento.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Disc3 size={18} className="text-neon-blue" /> 16 anos de carreira
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-neon-blue" /> MG &amp; SP
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake size={18} className="text-neon-blue" /> Pride friendly
              </div>
              <a
                href="https://instagram.com/djeduardomartins"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-neon-pink"
              >
                <InstagramIcon size={18} className="text-neon-blue" /> @djeduardomartins
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15} className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden glow-border">
              <ImgWithFallback
                src="/images/about-dj.jpg"
                alt="DJ Eduardo Claza no palco"
                className="w-full h-full object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24 px-5 bg-gradient-to-b from-[#07020f] to-[#0c0418]">
        <div className="mx-auto max-w-6xl">
          <SectionReveal className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-neon-blue mb-3">
              Produções
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              Últimos <span className="gradient-text">lançamentos</span>
            </h2>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <SectionReveal key={track.id} delay={i * 0.1}>
                <TrackCard track={track} isLoggedIn={!!session} />
              </SectionReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/musicas" className="btn-neon">
              Ver todas as músicas
            </Link>
          </div>
        </div>
      </section>

      <section id="agenda" className="py-24 px-5 bg-[#0c0418]">
        <SectionReveal className="mx-auto max-w-3xl text-center glass-panel glow-border rounded-3xl p-10">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-4">
            Quer me levar pra tocar na sua casa ou evento?
          </h2>
          <p className="text-white/70 mb-8">
            Bookings, parcerias e contratações — vamos levar o tribal house e
            a energia pride pro seu palco.
          </p>
          <a
            href="https://instagram.com/djeduardomartins"
            target="_blank"
            rel="noreferrer"
            className="btn-neon"
          >
            <InstagramIcon size={18} /> Falar no Instagram
          </a>
        </SectionReveal>
      </section>
    </div>
  );
}
