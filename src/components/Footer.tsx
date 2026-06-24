import Link from "next/link";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 mt-24">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-sm tracking-widest text-white/90">
            DJ <span className="gradient-text">EDUARDO MARTINS</span>
          </p>
          <p className="text-xs text-white/50 mt-1">
            Tribal House &amp; Pop House — Pride Edition
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/60">
          <a
            href="https://instagram.com/djeduardomartins"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-neon-pink transition-colors"
          >
            <InstagramIcon size={16} /> @djeduardomartins
          </a>
          <Link href="/musicas" className="hover:text-neon-blue transition-colors">
            Músicas
          </Link>
          <Link
            href="/admin/login"
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            Acesso Webmaster
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-white/30 pb-6">
        © {new Date().getFullYear()} DJ Eduardo Martins. Todos os direitos reservados.
      </p>
    </footer>
  );
}
