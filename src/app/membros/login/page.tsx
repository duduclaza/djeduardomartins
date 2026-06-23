"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/membros/area";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 flex items-center justify-center bg-gradient-to-b from-[#07020f] to-[#0c0418]">
      <div className="w-full max-w-md glass-panel glow-border rounded-2xl p-8">
        <p className="uppercase tracking-[0.3em] text-xs text-neon-pink mb-2 text-center">
          Área de Membros
        </p>
        <h1 className="font-display text-2xl text-white text-center mb-6">
          Entrar
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-pink"
          />
          <input
            type="password"
            required
            placeholder="sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-pink"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-neon mt-2">
            <LogIn size={18} /> {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-white/50 mt-6">
          Ainda não tem conta?{" "}
          <Link href="/membros/cadastro" className="text-neon-blue hover:underline">
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function MembrosLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
