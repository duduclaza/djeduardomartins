import Link from "next/link";
import { Disc3, MapPin, HeartHandshake } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Hero from "@/components/Hero";
import SectionReveal from "@/components/SectionReveal";
import TrackCard from "@/components/TrackCard";
import Marquee from "@/components/Marquee";
import PrideFloorScene from "@/components/PrideFloorScene";
import GuestbookWall from "@/components/GuestbookWall";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  let tracks: any[] = [];
  try {
    tracks = await prisma.track.findMany({
      where: { published: true },
      orderBy: { releasedAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Database connection error, using empty tracks for now.", error);
  }

  let signatures: any[] = [];
  try {
    signatures = await prisma.signature.findMany({
      orderBy: { createdAt: "desc" },
      take: 100, // Limit to 100 to avoid cluttering too much over time
    });
  } catch (error) {
    console.error("Failed to load signatures", error);
  }

  return (
    <div>
      <Hero />

      <Marquee text="Tribal House · Pop House · Pride Edition · @djeduardomartins" />

      <section id="sobre" className="relative py-32 px-5 min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-40 mix-blend-screen"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-in-a-nightclub-with-purple-lights-42588-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-nightclub-party-10118-large.mp4" type="video/mp4" />
          </video>
          {/* Gradients to blend smoothly with top and bottom sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07020f] via-transparent to-[#07020f]"></div>
          {/* Radial dark overlay to make text pop */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center">
          <SectionReveal>
            <p className="uppercase tracking-[0.3em] text-xs text-neon-pink mb-4 font-bold drop-shadow-md">
              Sobre Mim
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-10 drop-shadow-lg leading-tight">
              16 anos levando o <br className="hidden sm:block" />
              <span className="gradient-text">tribal house</span> pra pista
            </h2>
            
            <div className="glass-panel glow-border rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-[#07020f]/60 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <p className="relative z-10 text-white/90 text-lg sm:text-xl leading-relaxed font-light text-center">
                Eduardo Martins já passou pelas principais casas noturnas de Minas
                Gerais e São Paulo, construindo um som que mistura tribal house
                e pop house com uma energia voltada para celebrar a comunidade
                LGBTQIA+. Mais do que um set, uma experiência imersiva guiada
                por luz, groove e pertencimento.
              </p>
              
              <div className="relative z-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-white/80 border-t border-white/10 pt-8">
                <div className="flex flex-col items-center gap-3 transform transition hover:scale-105 hover:text-neon-blue">
                  <Disc3 size={28} className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" /> 
                  <span className="font-medium tracking-wide">16 anos de carreira</span>
                </div>
                <div className="flex flex-col items-center gap-3 transform transition hover:scale-105 hover:text-neon-blue">
                  <MapPin size={28} className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" /> 
                  <span className="font-medium tracking-wide">MG &amp; SP</span>
                </div>
                <div className="flex flex-col items-center gap-3 transform transition hover:scale-105 hover:text-neon-blue">
                  <HeartHandshake size={28} className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" /> 
                  <span className="font-medium tracking-wide">Pride friendly</span>
                </div>
                <a
                  href="https://instagram.com/djeduardomartins"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-3 hover:text-neon-pink transition-all group/link transform hover:scale-105"
                >
                  <InstagramIcon size={28} className="text-neon-blue group-hover/link:text-neon-pink transition-colors drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] group-hover/link:drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]" /> 
                  <span className="font-medium tracking-wide">@djeduardomartins</span>
                </a>
              </div>
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
            Quer me levar pro seu evento?
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

      <GuestbookWall signatures={signatures} isAdmin={!!session} />
    </div>
  );
}
