"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, User, ShieldCheck } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/musicas", label: "Músicas" },
  { href: "/#agenda", label: "Agenda" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-panel">
      <nav className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg sm:text-xl tracking-widest text-white"
        >
          DJ <span className="gradient-text">EDUARDO MARTINS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wider text-white/80 hover:text-neon-pink transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/djeduardomartins"
            target="_blank"
            rel="noreferrer"
            className="text-white/80 hover:text-neon-pink transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>

          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/membros/area"}
                className="flex items-center gap-1.5 text-sm text-white/80 hover:text-neon-blue transition-colors"
              >
                {session.user.role === "ADMIN" ? (
                  <ShieldCheck size={16} />
                ) : (
                  <User size={16} />
                )}
                {session.user.name ?? "Minha área"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-white/60 hover:text-neon-pink transition-colors"
                aria-label="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link href="/membros/login" className="btn-outline-neon text-xs">
              Área de Membros
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4 border-t border-white/10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-wider text-white/80"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/djeduardomartins"
            target="_blank"
            rel="noreferrer"
            className="text-sm uppercase tracking-wider text-white/80 flex items-center gap-2"
          >
            <InstagramIcon size={16} /> @djeduardomartins
          </a>
          {session ? (
            <>
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/membros/area"}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-wider text-neon-blue"
              >
                {session.user.name ?? "Minha área"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-left text-sm uppercase tracking-wider text-white/60"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/membros/login"
              onClick={() => setOpen(false)}
              className="btn-outline-neon text-xs w-fit"
            >
              Área de Membros
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
