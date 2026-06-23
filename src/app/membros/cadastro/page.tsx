"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserPlus } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Não foi possível criar sua conta.");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    router.push("/membros/area");
    router.refresh();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 flex items-center justify-center bg-gradient-to-b from-[#07020f] to-[#0c0418]">
      <div className="w-full max-w-md glass-panel glow-border rounded-2xl p-8">
        <p className="uppercase tracking-[0.3em] text-xs text-neon-blue mb-2 text-center">
          Junte-se à pista
        </p>
        <h1 className="font-display text-2xl text-white text-center mb-6">
          Criar conta grátis
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            placeholder="seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
          />
          <input
            type="email"
            required
            placeholder="seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="crie uma senha (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-blue"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-neon mt-2">
            <UserPlus size={18} /> {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Já tem conta?{" "}
          <Link href="/membros/login" className="text-neon-pink hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
